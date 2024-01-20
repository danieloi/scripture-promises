import data from '../../../data.json'
import { Promise } from '../../../../types'
import { NextApiRequest, NextApiResponse } from 'next'

const promises = [...data.promises] as Promise[]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ promises })
}
