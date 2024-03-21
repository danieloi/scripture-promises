
import fs from 'fs'
// const data = JSON.parse(fs.readFileSync('apps/data.json', 'utf-8'));
import data from '../apps/data-w-embeddings.json' assert { type: 'json' }


function convertEmbeddingToObject(embedding) {
  return Object.keys(embedding).map(key => embedding[key]);
}
function constructDataForDb(data) {
  const { subCategories, promises } = data

  const subCategoriesWithEmbedding = subCategories.map(subCategory => ({
    ...subCategory,
    id: `subCategories-${subCategory.id}`,
    embedding: convertEmbeddingToObject(subCategory.embedding),
  }))

  const promisesWithEmbedding = promises.map(promise => ({
    ...promise,
    id: `promises-${promise.id}`,
    embedding: convertEmbeddingToObject(promise.embedding),
  }))

  return {
    subCategories: subCategoriesWithEmbedding,
    promises: promisesWithEmbedding,
  }
}


const { subCategories, promises } = constructDataForDb(data);

const subCategoriesData = JSON.stringify(subCategories, null, 2);
const promisesData = JSON.stringify(promises, null, 2);


fs.writeFileSync('apps/sub-categories-w-embeddings.json', subCategoriesData, 'utf-8')
fs.writeFileSync('apps/promises-w-embeddings.json', promisesData, 'utf-8')

