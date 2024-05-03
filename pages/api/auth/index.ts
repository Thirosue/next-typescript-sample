import { NextApiRequest, NextApiResponse } from 'next'
import TokenHelper from '../../../helpers/token'

type AuthRequest = NextApiRequest & {
  body: {
    id: string
    password: string
  }
}

export default async (
  req: AuthRequest,
  res: NextApiResponse
): Promise<void> => {
  // CORSヘッダーの設定
  res.setHeader('Access-Control-Allow-Origin', '*') // すべてのオリジンからのアクセスを許可
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS') // 許可するHTTPメソッド
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization') // 許可するヘッダー

  // OPTIONSメソッドのハンドリング（CORSプリフライトリクエスト）
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.body.id && req.body.password && 0 < req.body.id.lastIndexOf('.com')) {
    const payload = {
      user: req.body.id,
    }
    const token = TokenHelper.sign(payload)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    res.status(200).json({ status: 'ok', token })
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
