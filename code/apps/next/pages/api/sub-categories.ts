import data from '../../../data.json'
import { SubCategory } from '../../../../types'
import { NextApiRequest, NextApiResponse } from 'next'

const subCategories = [...data.subCategories] as SubCategory[]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ subCategories })
}
