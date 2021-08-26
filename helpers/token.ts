import jwt from 'jsonwebtoken'

export const SECRET_KEY = 'secret'

class TokenHelper {
  // eslint-disable-next-line
  public static sign(payload: any): any {
    return jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        payload,
      },
      SECRET_KEY
    )
  }

  public static verify(token: string): string | void {
    const newToken = jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
      if (err) {
        throw err
      } else {
        const token = this.sign(decoded.user)
        return token
      }
    })
    return newToken
  }
}

export default TokenHelper
