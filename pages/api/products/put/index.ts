import { NextApiResponse } from 'next'
import _ from 'lodash'
import { Product } from '../data/product'
import { IdRequest } from '../data/id-request'
import data from '../shared/product-data'

export default (req: IdRequest, res: NextApiResponse) => {
  const id = parseInt(req.query.id, 10)

  const product: Product = {
    id,
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity,
  }

  try {
    const updatedProduct = data.updateProduct(product)
    res.status(200).json(updatedProduct)
  } catch (error) {
    res.status(500).send(error)
  }
}
