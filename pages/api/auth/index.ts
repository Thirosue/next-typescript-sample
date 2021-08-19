import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

const SECRET_KEY = 'secret'

interface AuthRequest extends NextApiRequest {
  body: {
    id: string
    password: string
  }
}

export default async (
  req: AuthRequest,
  res: NextApiResponse
): Promise<void> => {
  if (
    req.body.id &&
    req.body.password &&
    0 < req.body.id.lastIndexOf('test.com')
  ) {
    const payload = {
      user: req.body.id,
    }
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        payload,
      },
      SECRET_KEY
    )
    await new Promise((resolve) => setTimeout(resolve, 1000))
    res.status(200).json({ status: 'ok', token })
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
