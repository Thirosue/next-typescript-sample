import { NextApiRequest, NextApiResponse } from 'next'

type ChangePasswordRequest = NextApiRequest & {
  body: {
    password: string
  }
}

export default async (
  req: ChangePasswordRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.body.password) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    res.status(200).json({ status: 'ok' })
  } else {
    res.status(400).json({ message: 'Bad Request' })
  }
}
