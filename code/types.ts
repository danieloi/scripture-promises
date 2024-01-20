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
