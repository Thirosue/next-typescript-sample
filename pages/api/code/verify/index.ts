import { NextApiRequest, NextApiResponse } from 'next'

type CodeVerifyRequest = NextApiRequest & {
  body: {
    code: string
  }
}

export default async (
  req: CodeVerifyRequest,
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

  if (req.body.code) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    res.status(200).json({ status: 'ok' })
  } else {
    res.status(400).json({ message: 'Bad Request' })
  }
}
