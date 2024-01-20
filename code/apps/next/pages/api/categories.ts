import data from '../../../data.json'
import { Category } from '../../../../types'
import { NextApiRequest, NextApiResponse } from 'next'

const categories = [...data.categories] as Category[]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ categories })
}
