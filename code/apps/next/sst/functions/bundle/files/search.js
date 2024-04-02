import promisesData from './promises-w-embeddings.json' assert { type: 'json' };
import subCategoriesData from './sub-categories-w-embeddings.json' assert { type: 'json' };
export async function handler(event, context) {
    console.log({ event });
    const { query, type } = JSON.parse(event.body);
    console.log({ query, type });
    try {
        const result = await search(query, type);
        console.log({ result });
        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    }
    catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
}
const dot = (a, b) => a.reduce((acc, v, i) => acc + v * b[i], 0);
const norm = (a) => Math.sqrt(a.reduce((acc, v) => acc + v * v, 0));
class SmolVector {
    similarityFn = (a, b) => dot(a, b) / (norm(a) * norm(b));
    embeddingFn;
    constructor(embeddingFn) {
        this.embeddingFn = embeddingFn;
    }
    async query(opts) {
        // loop through store and calculate similarity
        let queryVector = opts.query;
        let store = opts.store;
        if (typeof opts.query === 'string')
            queryVector = (await this.embeddingFn(opts.query)).data;
        let results = store.map((item) => {
            return {
                ...item,
                similarity: this.similarityFn(queryVector, item.embedding),
            };
        });
        return results
            .sort((a, b) => b.similarity - a.similarity)
            .map(({ embedding, ...rest }) => rest);
    }
}
// @ts-ignore because we compile this before we make the docker image
import { pipeline } from '@xenova/transformers';
let pl = null; // must memoize pipeline fn, bc every time you call `await pipeline` it allocates new memory - Xenova
const embeddingFn = async (str) => {
    pl =
        pl ??
            (await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
                local_files_only: true,
            }));
    return pl(str, { pooling: 'mean', normalize: true });
};
const myDB = new SmolVector(embeddingFn);
async function search(query, type) {
    let results;
    if (type === 'verses') {
        const val = await myDB.query({
            query,
            store: promisesData,
        });
        results = { val: val.slice(0, 15) };
    }
    else if (type === 'subcategories') {
        const subCatVal = await myDB.query({
            query,
            store: subCategoriesData,
        });
        results = { subCatVal: subCatVal.slice(0, 10) };
    }
    else {
        // Handle unexpected type or default case
        results = {}; // Or implement a default behavior
    }
    return results;
}
