import data from '../../../data.json'
import {
  Category,
  Promise,
  SubCategory,
  SuperCategory,
} from '../../../../types'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextPageContext } from 'next'

function getApiUrl(path: string, ctx: NextPageContext) {
  const { req } = ctx
  if (!req && typeof window !== 'undefined') return `/api${path}`

  const host = req
    ? req.headers['x-forwarded-host'] || req.headers.host
    : window.location.host
  const proto = req
    ? req.headers['x-forwarded-proto'] || 'http'
    : window.location.protocol.slice(0, -1)
  return `${proto}://${host}/api${path}`
}

const promises = [...data.promises] as Promise[]
const subCategories = [...data.subCategories] as SubCategory[]
const categories = [...data.categories] as Category[]
const superCategories = [...data.superCategories] as SuperCategory[]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ promises, subCategories, categories, superCategories })
}
