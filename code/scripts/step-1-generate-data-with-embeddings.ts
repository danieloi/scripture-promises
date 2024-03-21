import { FeatureExtractionPipeline, pipeline } from "@xenova/transformers";

let pl: FeatureExtractionPipeline | null = null; // must memoize pipeline fn, bc every time you call `await pipeline` it allocates new memory - Xenova

// @ts-ignore
const embeddingFn = async (str: string) => {
  pl = pl ?? (await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2"));
  return pl(str, { pooling: "mean", normalize: true });
};

import fs from 'fs';
// const data = JSON.parse(fs.readFileSync('apps/data.json', 'utf-8'));
import data from '../apps/data.json' assert { type: 'json' };

const superCategories = data.superCategories.map(async (superCategory) => {
  const embedding = await embeddingFn(superCategory.name);
  return { ...superCategory, embedding: embedding.data };
});

data.superCategories = await Promise.all(superCategories);

console.log('superCategories done ✅')

const subCategories = data.subCategories.map(async (subCategory) => {
  const embedding = await embeddingFn(subCategory.name);
  return { ...subCategory, embedding: embedding.data };
});

data.subCategories = await Promise.all(subCategories);

console.log('subCategories done ✅')

const categories = data.categories.map(async (category) => {
  const embedding = await embeddingFn(category.name);
  return { ...category, embedding: embedding.data };
});

data.categories = await Promise.all(categories);

console.log('categories done ✅')

const promises = data.promises.map(async (promise) => {
  const embedding = await embeddingFn(`${promise.quote} \n ${promise.reference}`);
  return { ...promise, embedding: embedding.data };
});

data.promises = await Promise.all(promises);

console.log('promises done ✅')

const newData = JSON.stringify(data, null, 2);
fs.writeFileSync('apps/data-new-new.json', newData, 'utf-8');


console.log({data});

