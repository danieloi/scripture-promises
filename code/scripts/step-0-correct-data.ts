// fixes issue with subcategory 42

import fs from 'fs'
// const data = JSON.parse(fs.readFileSync('apps/data.json', 'utf-8'));
import data from '../apps/data.json' assert { type: 'json' }

const subCategories = data.subCategories.map((subCategory, index) => {
  return { ...subCategory, id: index }
})

data.subCategories = subCategories

const newData = JSON.stringify(data, null, 3)
fs.writeFileSync('apps/data.json', newData, 'utf-8')

console.log('done ✅')
