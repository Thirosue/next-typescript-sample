import { GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'node:querystring'
import { checkAutoLogin } from './checkAutoLogin'
import { checkSession } from './checkSession'

export const addFilters = (
  f: (ctx: GetServerSidePropsContext<ParsedUrlQuery>) => any
): any => checkAutoLogin(checkSession(f))
