import jwt from 'jsonwebtoken'

export const SECRET_KEY = 'secret'

class TokenHelper {
  public static sign(payload: any): any {
    return jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        payload,
      },
      SECRET_KEY
    )
  }

  public static verify(token: string): any {
    return jwt.verify(token, SECRET_KEY)
  }
}

export default TokenHelper
