import { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '../../../../lib/data/product'
import data from '../../../../lib/shared/product-data'

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const product: Product = {
    id: undefined,
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity,
  }

  try {
    const newProduct = data.addProduct(product)
    res.status(201).json(newProduct)
  } catch (error) {
    res.status(500).send(error)
  }
}
