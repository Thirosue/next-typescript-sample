import { useEffect } from 'react'
import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { DashboardLayout } from '../components/template'
import { GetServerSideProps } from 'next'
import { checkSession } from '../filters/checkSession'
import Progress from '../components/progress'
import { ParsedUrlQuery } from 'querystring'

type CompleteQuery = ParsedUrlQuery & {
  to: string
}

export default function Complete(): JSX.Element {
  const router = useRouter()
  useEffect(() => {
    const { to } = router.query as CompleteQuery
    router.push(to)
  }, [router.query])

  return (
    <>
      <Progress processing={true} />
      redirect
    </>
  )
}

Complete.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout title={'処理完了'}>{page}</DashboardLayout>
}

export const getServerSideProps: GetServerSideProps = checkSession(async () => {
  return {
    props: {},
  }
})
