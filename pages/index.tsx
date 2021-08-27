import { ReactElement } from 'react'
import { DashboardLayout } from '../components/template'
import IndexPage from '../components/page/index-page'
import { GetServerSideProps } from 'next'
import { checkSession } from '../filters/checkSession'

export default function Index(): JSX.Element {
  return <IndexPage />
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout title={'トップページ'}>{page}</DashboardLayout>
}

export const getServerSideProps: GetServerSideProps = checkSession(async () => {
  return {
    props: {},
  }
})
