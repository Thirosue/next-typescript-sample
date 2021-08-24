import _ from 'lodash'
import { ReactElement } from 'react'
import { DashboardLayout } from '../../components/template'
import { GetServerSideProps } from 'next'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'
import { GlobalState } from '../../data/global-state'
import TokenHelper from '../../helpers/token'
import { Product } from '../../lib/data/product'
import data from '../../lib/shared/product-data'
import { ParsedUrlQuery } from 'querystring'

const captains = console

type SessionCookie = NextApiRequestCookies & {
  state?: string
}

type ProductDetailParam = ParsedUrlQuery & {
  id: string
}

export default function ProductDetail({
  product,
}: {
  product: Product
}): JSX.Element {
  return <>{product.name}</>
}

ProductDetail.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout title={'商品詳細'}>{page}</DashboardLayout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = context.req.cookies as SessionCookie
  const params = context.params as ProductDetailParam
  try {
    const { session } = JSON.parse(cookie.state) as GlobalState
    TokenHelper.verify(session.jwtToken)
    const product = _.head(
      data.getProducts().filter((row: Product) => row.id === Number(params.id))
    )
    if (product) {
      return {
        props: {
          product,
        },
      }
    } else {
      return {
        redirect: {
          permanent: false, // 永続的なリダイレクトかどうか
          destination: '/404', // リダイレクト先
        },
      }
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
