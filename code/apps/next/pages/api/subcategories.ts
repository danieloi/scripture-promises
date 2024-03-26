import data from '../../../data.json'
import {
  SubcategoryDetailData,
  Promise,
  SubCategory,
  SubcategoryNavigation,
} from '../../../../types'
import { NextApiRequest, NextApiResponse } from 'next'

const promises = [...data.promises] as Promise[]
const subCategories = [...data.subCategories] as SubCategory[]
// const categories = [...data.categories] as Category[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    data: SubcategoryDetailData
    navigation: SubcategoryNavigation
  }>
) {
  const data = getCategoryDetailData(req.query.id as string)
  const navigation = getSubcategoryNavigation(req.query.id as string)
  return res.status(200).json({ data, navigation })
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
function getSubcategoryNavigation(id: string): SubcategoryNavigation {
  const index = subCategories.findIndex((sc) => sc.id == parseInt(id))
  const prevSubcategory = index > 0 ? subCategories[index - 1] : null
  const nextSubcategory =
    index < subCategories.length - 1 ? subCategories[index + 1] : null

  return {
    prev: prevSubcategory
      ? { id: prevSubcategory.id, name: prevSubcategory.name }
      : null,
    next: nextSubcategory
      ? { id: nextSubcategory.id, name: nextSubcategory.name }
      : null,
  }
}
