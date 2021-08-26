import { GetServerSidePropsContext } from 'next'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'
import { ParsedUrlQuery } from 'node:querystring'

type SessionCookie = NextApiRequestCookies & {
  state?: string
  rememberMe?: string
}

export const checkAutoLogin =
  (f: (ctx: GetServerSidePropsContext<ParsedUrlQuery>) => any): any =>
  async (ctx: GetServerSidePropsContext<ParsedUrlQuery>) => {
    const cookie = ctx.req.cookies as SessionCookie
    const rememberMe = Boolean(cookie.rememberMe)
    if (rememberMe) {
      // nop
      return f(ctx)
    } else {
      // nop
      return f(ctx)
    }
  }
