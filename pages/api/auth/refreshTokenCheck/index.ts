import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import TokenHelper, { SECRET_KEY } from '../../../../helpers/token'

export default (req: NextApiRequest, res: NextApiResponse): void => {
  // CORSヘッダーの設定
  res.setHeader('Access-Control-Allow-Origin', '*') // すべてのオリジンからのアクセスを許可
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS') // 許可するHTTPメソッド
  res.setHeader('Access-Control-Allow-Headers', '*') // 許可するヘッダー

  // OPTIONSメソッドのハンドリング（CORSプリフライトリクエスト）
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  let refreshToken = req.cookies.refreshToken
  // X-REFRESH-TOKEN header override
  if (req.headers['x-refresh-token']) {
    refreshToken = req.headers['x-refresh-token'] as string
  }
  // Authorization header override
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    refreshToken = req.headers.authorization.split(' ')[1]
  }

  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' })
  }

  try {
    jwt.verify(refreshToken, SECRET_KEY, (err: any, decoded: any) => {
      if (err) {
        res.status(401).json({ message: 'Unauthorized' })
      } else {
        const token = TokenHelper.sign(decoded.user)
        res.status(200).json({ status: 'ok', token })
      }
    })
  } catch (error) {
    return res.status(401).json({ message: 'Invalid refresh token' })
  }
}
