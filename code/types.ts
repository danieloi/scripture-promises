export type Level = {
  id: number
  name: string
  description: string
  parentId: number
  depth: number
  jsonKey: string
  slug: string
}

export type SuperCategory = {
  id: number
  name: string
}

export type Category = {
  id: number
  name: string
  superCategoryId: number
}

export type SubCategory = {
  id: number
  name: string
  categoryId: number
}

export type Promise = {
  id: number
  quote: string
  reference: string
  subCategoryId: number
}

type SubCategoryData = {
  id: number
  name: string
}

type CategoryData = {
  id: number
  name: string
  subCategories: SubCategoryData[]
}

export type IndexData = {
  id: number
  name: string
  categories: CategoryData[]
}

export type SearchResult = {
  val: any
  subCatVal: any
}

export type SubcategoryDetailData = {
  id: number
  name: string
  promises: Promise[]
}

export type SubcategoryNavigation = {
  prev?: { id: number; name: string }
  next?: { id: number; name: string }
}

export type SubcategoryBreadcrumbs = {
  supercategoryName: string
  categoryName: string
  subcategoryName: string
  path: SubcategoryBreadcrumbsPath[]
}

type SubcategoryBreadcrumbsPath = {
  name: string
  href?: string
}
