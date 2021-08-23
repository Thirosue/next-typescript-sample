import { ReactElement } from 'react'
import { DashboardLayout } from '../components/template'
import IndexPage from '../components/page/index-page'
import { GetServerSideProps } from 'next'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'
import { GlobalState } from '../data/global-state'
import TokenHelper from '../helpers/token'

const captains = console

type SessionCookie = NextApiRequestCookies & {
  state?: string
}

export default function Index(): JSX.Element {
  return <IndexPage />
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout title={'トップページ'}>{page}</DashboardLayout>
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const cookie = req.cookies as SessionCookie
    const { session } = JSON.parse(cookie.state) as GlobalState
    TokenHelper.verify(session.jwtToken)
    return {
      props: {},
    }
  } catch (e) {
    captains.warn('cookie is invalid... redirect to login page')
    return {
      redirect: {
        permanent: false, // 永続的なリダイレクトかどうか
        destination: '/login', // リダイレクト先
      },
    }
  }
}
