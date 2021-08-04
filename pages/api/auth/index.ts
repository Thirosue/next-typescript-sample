import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

const SECRET_KEY = 'secret'

interface AuthRequest extends NextApiRequest {
  body: {
    id: string
    password: string
  }
}

export default (req: AuthRequest, res: NextApiResponse): void => {
  if (req.body.id && req.body.password) {
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

    res.status(200).json({ status: 'ok', token })
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
