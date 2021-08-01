import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

const SECRET_KEY = "secret"


export default (req: NextApiRequest, res: NextApiResponse) => {
  let token = '';
  if (req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
      if (err) {
        res.status(401).json({ message: 'Unauthorized' })
      } else {
        const token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          payload: decoded.user
        }, SECRET_KEY)

        res.status(200).json({ status: 'ok', token })
      }
    })
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}