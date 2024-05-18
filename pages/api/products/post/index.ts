import { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '../../../../lib/data/product'
import data from '../../../../lib/shared/product-data'

export default (req: NextApiRequest, res: NextApiResponse): void => {
  // CORSヘッダーの設定
  res.setHeader('Access-Control-Allow-Origin', '*') // すべてのオリジンからのアクセスを許可
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS') // 許可するHTTPメソッド
  res.setHeader('Access-Control-Allow-Headers', '*') // 許可するヘッダー

  // OPTIONSメソッドのハンドリング（CORSプリフライトリクエスト）
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

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
