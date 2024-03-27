import data from '../../../data.json'
import {
  SubcategoryDetailData,
  Promise,
  SubCategory,
  SubcategoryNavigation,
  SubcategoryBreadcrumbs,
  Category,
  SuperCategory,
} from '../../../../types'
import { NextApiRequest, NextApiResponse } from 'next'

const promises = [...data.promises] as Promise[]
const subCategories = [...data.subCategories] as SubCategory[]
const categories = [...data.categories] as Category[]
const superCategories = [...data.superCategories] as SuperCategory[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    data: SubcategoryDetailData
    navigation: SubcategoryNavigation
    breadcrumbs: SubcategoryBreadcrumbs
  }>
) {
  const data = getCategoryDetailData(req.query.id as string)
  const navigation = getSubcategoryNavigation(req.query.id as string)
  const breadcrumbs = getSubcategoryBreadcrumbs(req.query.id as string)
  return res.status(200).json({ data, navigation, breadcrumbs })
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

function getSubcategoryBreadcrumbs(id: string): SubcategoryBreadcrumbs {
  const subCategory = subCategories.find((sc) => sc.id == parseInt(id)) || {
    name: '',
    id: '',
    categoryId: '',
  }

  const category = categories.find((c) => c.id == subCategory.categoryId) || {
    name: '',
    id: '',
    superCategoryId: '',
    placeholder: false,
  }

  const supercategory = superCategories.find(
    (s) => s.id == category.superCategoryId
  ) || {
    name: '',
    id: '',
  }

  // Find siblings
  const categorySiblings = categories
    .filter((c) => c.superCategoryId === category.superCategoryId)
    .map((c) => ({
      name: c.name,
      id: c.id,
      firstSubcategoryId: getFirstSubcategoryIdForCategory(c.id),
    }))

  const subCategorySiblings = subCategories
    .filter((sc) => sc.categoryId === category.id)
    .map((sc) => ({
      name: sc.name,
      id: sc.id,
    }))

  return {
    supercategoryName: supercategory.name,
    categoryName: category.name,
    subcategoryName: subCategory.name,
    path: [
      {
        name: supercategory.name,
        siblings: superCategories.map((s) => ({
          name: s.name,
          id: s.id,
          firstSubcategoryId: getFirstSubcategoryIdForSupercategory(s.id),
        })),
      },
      {
        name: category.name,
        isLeaf: category.placeholder,
        siblings: categorySiblings,
      },
      { name: subCategory.name, siblings: subCategorySiblings },
    ],
  }
}

function getFirstSubcategoryIdForSupercategory(
  supercategoryId: number
): number {
  // Find the first category that belongs to the supercategory
  const category = categories.find((c) => c.superCategoryId === supercategoryId)

  // Find the first subcategory that belongs to the found category
  const subCategory = subCategories.find((sc) => sc.categoryId === category.id)
  return subCategory.id
}

function getFirstSubcategoryIdForCategory(categoryId: number): number {
  const subCategory = subCategories.find((sc) => sc.categoryId === categoryId)
  return subCategory.id
}
