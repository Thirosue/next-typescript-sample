import { ReactElement } from 'react'
import { DashboardLayout } from '../components/template'
import IndexPage from '../components/page/index-page'

export default function Index(): JSX.Element {
  return <IndexPage />
}

Index.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout title={'トップページ'}>{page}</DashboardLayout>
}
