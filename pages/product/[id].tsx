import _ from 'lodash'
import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { AxiosPromise } from 'axios'
import { ProductRepository } from '../../repository/product-repository'
import { DashboardLayout } from '../../components/template'
import { Product } from '../../lib/data/product'
import data from '../../lib/shared/product-data'
import {
  FormLabel,
  FormErrorMessage,
  Button,
  Typography,
  InputLabel,
} from '../../components/atoms'
import Progress from '../../components/progress'
import { TextFieldType } from '../../data'
import {
  ProductUpdateRequest,
  BaseResponse,
} from '../../repository/product-repository'
import { checkSession } from '../../filters/checkSession'

const captains = console

export default function ProductDetail({
  product,
}: {
  product: Product
}): JSX.Element {
  const router = useRouter()
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
  const mutation = useMutation(
    (req: ProductUpdateRequest): AxiosPromise<BaseResponse> =>
      ProductRepository.update(req)
  )

  const doSubmit = (data: Product): void => {
    captains.log(data)
    const request: ProductUpdateRequest = { ...data }
    mutation.mutate(request, {
      onSuccess: async () => {
        await router.push(`/complete?to=/`)
        setTimeout(() => toast.success('商品を更新しました'), 100) // display toast after screen transition
      },
    })
  }

  const back = (event: any): void => {
    router.back()
    event.preventDefault()
  }

  return (
    <>
      <Progress processing={mutation.isLoading} />
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
            <Button onClick={back} color={'default'} classes={['mx-4']}>
              戻る
            </Button>
            <Button disabled={mutation.isLoading} color={'primary'}>
              更新
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

ProductDetail.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout title={'商品詳細'}>{page}</DashboardLayout>
}

export const getServerSideProps: GetServerSideProps = checkSession(
  async ({ params }) => {
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
  }
)
