import { NextApiResponse } from 'next'
import data from '../shared/product-data'
import { IdRequest } from '../data/id-request'

export default (req: IdRequest, res: NextApiResponse) => {
  const id = parseInt(req.query.id, 10)

  try {
    data.deleteProduct(id)
    res.status(200).json({})
  } catch (error) {
    res.status(500).send(error)
  }
}
