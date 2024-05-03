import { NextApiResponse } from 'next'
import { Product } from '../../../../lib/data/product'
import { IdRequest } from '../../../../lib/data/id-request'
import data from '../../../../lib/shared/product-data'

export default (req: IdRequest, res: NextApiResponse): void => {
  // CORSヘッダーの設定
  res.setHeader('Access-Control-Allow-Origin', '*') // すべてのオリジンからのアクセスを許可
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS') // 許可するHTTPメソッド
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization') // 許可するヘッダー

  // OPTIONSメソッドのハンドリング（CORSプリフライトリクエスト）
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

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
