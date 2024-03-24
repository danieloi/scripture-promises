import promisesData from '../apps/promises-w-embeddings.json' assert { type: 'json' }
import subCategoriesData from '../apps/sub-categories-w-embeddings.json' assert { type: 'json' }

const dot = (a, b) => a.reduce((acc, v, i) => acc + v * b[i], 0)
const norm = (a) => Math.sqrt(a.reduce((acc, v) => acc + v * v, 0))

class SmolVector {
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
  const val = await myDB.query({ query, store: promisesData })
  const subCatVal = await myDB.query({ query, store: subCategoriesData })
  return { val, subCatVal }
}

// const { val, subCatVal } = await search('healing');
const { val, subCatVal } = await search(
  'You open your hand and satisfy the desires of every living thing.'
)

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
