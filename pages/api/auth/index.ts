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
