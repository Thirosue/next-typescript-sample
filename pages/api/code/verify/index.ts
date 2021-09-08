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
  if (req.body.code) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    res.status(200).json({ status: 'ok' })
  } else {
    res.status(400).json({ message: 'Bad Request' })
  }
}
