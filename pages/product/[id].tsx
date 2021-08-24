import _ from 'lodash'
import { ReactElement } from 'react'
import { DashboardLayout } from '../../components/template'
import { GetServerSideProps } from 'next'
import { useForm } from 'react-hook-form'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'
import { GlobalState } from '../../data/global-state'
// import TokenHelper from '../../helpers/token'
import { Product } from '../../lib/data/product'
import data from '../../lib/shared/product-data'
import { ParsedUrlQuery } from 'querystring'
import {
  FormLabel,
  FormErrorMessage,
  Button,
  Typography,
  InputLabel,
} from '../../components/atoms'
import { TextFieldType } from '../../data'

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: {
      id: product.id,
      name: product.name,
      description: product.description,
      quantity: product.quantity,
    },
  })

  const doSubmit = (data: Product): void => {
    captains.log(data)
  }

  return (
    <>
      <div className="container mx-auto px-6 py-8">
        <Typography variant="h4">商品詳細</Typography>

        <form className="mt-4" onSubmit={handleSubmit(doSubmit)}>
          <label className="block">
            <FormLabel>ID</FormLabel>
            <InputLabel fullWidth={true} value={product.id} />
          </label>

          <label className="block mt-3">
            <FormLabel>Name</FormLabel>
            <input
              id="name"
              type={TextFieldType.Text}
              className={`mt-1 w-full border-gray-300 block rounded-md focus:border-indigo-600 ${
                errors.name ? 'border-red-400' : ''
              }`}
              {...register('name')}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </label>

          <label className="block mt-3">
            <FormLabel>Description</FormLabel>
            <input
              id="description"
              type={TextFieldType.Text}
              className={`mt-1 w-full border-gray-300 block rounded-md focus:border-indigo-600 ${
                errors.description ? 'border-red-400' : ''
              }`}
              {...register('description')}
            />
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          </label>

          <label className="block mt-3">
            <FormLabel>Quantity</FormLabel>
            <input
              id="quantity"
              type={TextFieldType.Number}
              className={`mt-1 w-full border-gray-300 block rounded-md focus:border-indigo-600 ${
                errors.quantity ? 'border-red-400' : ''
              }`}
              {...register('quantity')}
            />
            <FormErrorMessage>{errors.quantity?.message}</FormErrorMessage>
          </label>

          <div className="mt-6 flex justify-center">
            <Button color={'default'} classes={['mx-4']}>
              戻る
            </Button>
            <Button color={'primary'}>更新</Button>
          </div>
        </form>
      </div>
    </>
  )
}

ProductDetail.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout title={'商品詳細'}>{page}</DashboardLayout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = context.req.cookies as SessionCookie
  const params = context.params as ProductDetailParam
  try {
    const { session } = JSON.parse(cookie.state) as GlobalState
    captains.log(session)
    // TokenHelper.verify(session.jwtToken)
    const product = _.head(
      data.getProducts().filter((row: Product) => row.id === Number(params.id))
    )
    captains.log(`target product id = ${product.id}`)
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
    captains.warn(e)
    captains.warn('cookie is invalid... redirect to login page')
    return {
      redirect: {
        permanent: false, // 永続的なリダイレクトかどうか
        destination: '/login', // リダイレクト先
      },
    }
  }
}
