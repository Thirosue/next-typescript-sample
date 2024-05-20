import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../../../helpers/token'

const roles = {
  admin: [
    { namespace: 'product', operation: 'create' },
    { namespace: 'product', operation: 'edit' },
    { namespace: 'product', operation: 'delete' },
    { namespace: 'product', operation: 'view' },
    { namespace: 'order', operation: 'create' },
    { namespace: 'order', operation: 'edit' },
    { namespace: 'order', operation: 'delete' },
    { namespace: 'order', operation: 'view' },
  ],
  user: [
    { namespace: 'order', operation: 'create' },
    { namespace: 'order', operation: 'view' },
  ],
  operator: [
    { namespace: 'product', operation: 'view' },
    { namespace: 'product', operation: 'edit' },
    { namespace: 'order', operation: 'view' },
    { namespace: 'order', operation: 'edit' },
  ],
}

export default (req: NextApiRequest, res: NextApiResponse): void => {
  // CORSヘッダーの設定
  res.setHeader('Access-Control-Allow-Origin', '*') // すべてのオリジンからのアクセスを許可
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS') // 許可するHTTPメソッド
  res.setHeader('Access-Control-Allow-Headers', '*') // 許可するヘッダー

  // OPTIONSメソッドのハンドリング（CORSプリフライトリクエスト）
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  let token = null
  // Authorization header override
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
      if (err) {
        res.status(401).json({ message: 'Unauthorized' })
      } else {
        res
          .status(200)
          .json({ status: 'ok', permissions: roles[decoded.payload.role] })
      }
    })
  } catch (error) {
    return res.status(401).json({ message: 'Invalid refresh token' })
  }
}
