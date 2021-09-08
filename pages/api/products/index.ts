import { NextApiRequest, NextApiResponse } from 'next'
import _, { Many } from 'lodash'
import data from '../../../lib/shared/product-data'
import { Product } from '../../../lib/data/product'

type ProductGetRequest = NextApiRequest & {
  query: {
    name: string | undefined
    description: string | undefined
    page: string | undefined
    rows: string | undefined
    order: string | undefined
    orderBy: string | undefined
  }
}

const captains = console

export default async (
  req: ProductGetRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const { name, description, page, rows, order, orderBy } = req.query
    const _rows = parseInt(rows)
    const _page = parseInt(page)

    let products = _.orderBy(data.getProducts(), 'id', 'asc')
    if (order) {
      if (['name', 'description'].includes(orderBy)) {
        products = _.orderBy(products, orderBy, order as Many<'asc' | 'desc'>)
      }
    }
    if (name) {
      products = products.filter(
        (item: Product) => -1 !== item.name.indexOf(name)
      )
    }
    if (description) {
      products = products.filter(
        (item: Product) => -1 !== item.description.indexOf(description)
      )
    }
    const start = _rows * _page
    captains.log(name, description, start, page, rows, order, orderBy)
    const results = {
      count: products.length,
      data: products.slice(start, start + _rows),
    }
    res.status(200).json(results)
  } catch (error) {
    res.status(500).send(error)
  }
}
