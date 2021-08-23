import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import TokenHelper, { SECRET_KEY } from '../../../../helpers/token'

export default (req: NextApiRequest, res: NextApiResponse): void => {
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
