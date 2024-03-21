import promisesData from '../../../promises-w-embeddings.json';
import subCategoriesData from '../../../sub-categories-w-embeddings.json';

import data from '../../../data.json'
import {
  Category,
  IndexData,
  SubCategory,
  SuperCategory,
} from '../../../../types'
import { NextApiRequest, NextApiResponse } from 'next'

const subCategories = [...data.subCategories] as SubCategory[]
const categories = [...data.categories] as Category[]
const superCategories = [...data.superCategories] as SuperCategory[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IndexData[]>
) {
  const data = getIndexData()

  // console.dir(data, { depth: null })
  return res.status(200).json(data)
}

function getIndexData() {
  return superCategories.map((sc) => ({
    id: sc.id,
    name: sc.name,
    // TODO; denormalize this so we don't have to do this O(n) operation
    // constant time is possible with hashmaps with keys like sc.id.categoryId
    // worth building once, pre-deploy and pre-local-runtime
    categories: categories
      .filter((c) => c.superCategoryId == sc.id)
      .map((c) => ({
        id: c.id,
        name: c.name,
        subCategories: subCategories
          .filter((sc) => sc.categoryId == c.id)
          .map((sc) => ({
            id: sc.id,
            name: sc.name,
          })),
      })),
  }))
}


const dot = (a, b) => a.reduce((acc, v, i) => acc + v * b[i], 0)
const norm = (a) => Math.sqrt(a.reduce((acc, v) => acc + v * v, 0))

export class SmolVector {
  similarityFn = (a, b) => dot(a, b) / (norm(a) * norm(b))
  embeddingFn: (chunk: string) => Promise<{ data: number[] }>
  constructor(embeddingFn) {
    this.embeddingFn = embeddingFn
  }

  async query(opts) {
    // loop through store and calculate similarity
    let queryVector = opts.query
    let store = opts.store
    if (typeof opts.query === 'string')
      queryVector = (await this.embeddingFn(opts.query)).data
    let results = store.map((item) => {
      return {
        ...item,
        similarity: this.similarityFn(queryVector, item.embedding),
      }
    })
    return results.sort((a, b) => b.similarity - a.similarity)
  }
}

// usage
import { FeatureExtractionPipeline, pipeline } from '@xenova/transformers'

let pl: FeatureExtractionPipeline | null = null // must memoize pipeline fn, bc every time you call `await pipeline` it allocates new memory - Xenova

const embeddingFn = async (str: string) => {
  pl = pl ?? (await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2'))
  return pl(str, { pooling: 'mean', normalize: true })
}

const myDB = new SmolVector(embeddingFn)

async function search(query) {
    const val = await myDB.query({ query, store: promisesData });
    const subCatVal = await myDB.query({ query, store: subCategoriesData });
    return { val, subCatVal }
}

const { val, subCatVal } = await search('healing');


console.log(
  val.slice(0, 50).map(
    // exclude embedding
    ({ embedding, ...item }) => item
  ),
  subCatVal.slice(0, 15).map(
    // exclude embedding
    ({ embedding, ...item }) => item
  )
)



console.log('done ✅')
