import promisesData from '../../../promises-w-embeddings.json'
import subCategoriesData from '../../../sub-categories-w-embeddings.json'

import {
  PromiseData,
  SearchPromiseResult,
  SearchResultData,
  SearchSubCategoryResult,
  SubCategory,
} from '../../../../types'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResultData>
) {
  const { query, type } = req.body
  const result = await search(query, type)

  // console.dir(data, { depth: null })
  return res.status(200).json(result)
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
    return results
      .sort((a, b) => b.similarity - a.similarity)
      .map(({ embedding, ...rest }) => rest)
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

async function search(query, type) {
  let results
  if (type === 'verses') {
    const val: SearchPromiseResult[] = await myDB.query({
      query,
      store: promisesData,
    })
    results = { val: val.slice(0, 15) }
  } else if (type === 'subcategories') {
    const subCatVal: SearchSubCategoryResult[] = await myDB.query({
      query,
      store: subCategoriesData,
    })
    results = { subCatVal: subCatVal.slice(0, 10) }
  } else {
    // Handle unexpected type or default case
    results = {} // Or implement a default behavior
  }
  return results
}
