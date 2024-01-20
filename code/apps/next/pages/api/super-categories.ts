import data from '../../../data.json'
import { SuperCategory } from '../../../../types'
import { NextApiRequest, NextApiResponse } from 'next'

const superCategories = [...data.superCategories] as SuperCategory[]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ superCategories })
}
