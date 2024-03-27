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
        isLeaf: c.placeholder,
        subCategories: subCategories
          .filter((sc) => sc.categoryId == c.id)
          .map((sc) => ({
            id: sc.id,
            name: sc.name,
          })),
      })),
  }))
}
