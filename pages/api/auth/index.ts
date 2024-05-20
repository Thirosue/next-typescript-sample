import { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'
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
      // admin, user, operator をランダムで返す
      role: ['admin', 'user', 'operator'][Math.floor(Math.random() * 3)],
    }
    const token = TokenHelper.sign(payload)
    const refreshToken = TokenHelper.sign(payload, 7 * 24 * (60 * 60)) // 7 days in seconds
    const refreshCookie = serialize('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 604800, // 7 days in seconds
      path: '/',
    })

    await new Promise((resolve) => setTimeout(resolve, 1000))

    res.setHeader('Set-Cookie', refreshCookie)
    res.status(200).json({ status: 'ok', token, refreshToken })
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
