import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import TokenHelper, { SECRET_KEY } from '../../../../helpers/token'

export default (req: NextApiRequest, res: NextApiResponse): void => {
  // CORSヘッダーの設定
  res.setHeader('Access-Control-Allow-Origin', '*') // すべてのオリジンからのアクセスを許可
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS') // 許可するHTTPメソッド
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization') // 許可するヘッダー

  // OPTIONSメソッドのハンドリング（CORSプリフライトリクエスト）
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  let token = ''
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    token = req.headers.authorization.split(' ')[1]

    jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
      if (err) {
        res.status(401).json({ message: 'Unauthorized' })
      } else {
        const token = TokenHelper.sign(decoded.user)
        res.status(200).json({ status: 'ok', token })
      }
    })
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
