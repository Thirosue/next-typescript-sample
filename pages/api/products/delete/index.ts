import { NextApiResponse } from 'next'
import data from '../../../../lib/shared/product-data'
import { IdRequest } from '../../../../lib/data/id-request'

export default (req: IdRequest, res: NextApiResponse): void => {
  // CORSヘッダーの設定
  res.setHeader('Access-Control-Allow-Origin', '*') // すべてのオリジンからのアクセスを許可
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS') // 許可するHTTPメソッド
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization') // 許可するヘッダー

  // OPTIONSメソッドのハンドリング（CORSプリフライトリクエスト）
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  const id = parseInt(req.query.id, 10)

  try {
    data.deleteProduct(id)
    res.status(200).json({})
  } catch (error) {
    res.status(500).send(error)
  }
}
