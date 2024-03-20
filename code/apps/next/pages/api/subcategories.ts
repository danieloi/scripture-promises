import data from '../../../data.json'
import { SubcategoryDetailData, Promise, SubCategory } from '../../../../types'
import { NextApiRequest, NextApiResponse } from 'next'

const promises = [...data.promises] as Promise[]
const subCategories = [...data.subCategories] as SubCategory[]
// const categories = [...data.categories] as Category[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubcategoryDetailData>
) {
  const data = getCategoryDetailData(req.query.id as string)
  return res.status(200).json(data)
}

function getCategoryDetailData(id: string) {
  const filteredPromises = promises.filter(
    (p) => p.subCategoryId == parseInt(id)
  )
  const subCategory = subCategories.find((sc) => sc.id == parseInt(id)) || {
    name: '',
    id: '',
    categoryId: '',
  }
  // const category = categories.find((c) => c.id == subCategory.categoryId) || {
  //   name: '',
  //   id: '',
  // }

  return {
    id: parseInt(id),
    name: subCategory.name,
    promises: filteredPromises,
  }
}
