export interface Session {
  username?: string
  sub: string
  jwtToken: string
  email_verified?: boolean
}
