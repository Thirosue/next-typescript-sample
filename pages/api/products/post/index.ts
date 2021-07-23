import { NextApiRequest, NextApiResponse } from 'next'
import _ from 'lodash'
import { Product } from '../data/product'
import data from '../shared/product-data'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const product: Product = {
    id: undefined,
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity,
  };

  try {
    const newProduct = data.addProduct(product);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).send(error);
  }
}