import { useState, useContext, ReactElement } from 'react'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import GlobalContext from '../context/global-context'
import Logo from '../components/logo'
import {
  FormLabel,
  FormErrorMessage,
  Button,
  Link,
  Typography,
} from '../components/atoms'
import { SimpleLayout, Confirm } from '../components/template'
import { TextFieldType } from '../data'

const captains = console

type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required('入力してください')
    .email('メールアドレスを入力してください'),
  password: yup
    .string()
    .required('入力してください')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'アルファベット（大文字小文字混在）と数字と特殊記号を組み合わせて8文字以上で入力してください'
    ),
})

export default function Login(): JSX.Element {
  const context = useContext(GlobalContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const doSubmit = async (data: any): Promise<void> => {
    captains.log(data)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    context.updateState({
      session: {
        username: 'hoge',
        sub: 'sub',
      },
    })
  }

  // For Modal
  const [open, setOpen] = useState(false)

  const handleConfirm = (_: any): void => {
    captains.log('Submit')
  }

  const handleClose = (_: any): void => {
    setOpen(false)
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="referrer" content="always" />
      </Head>
      <div className="flex justify-center items-center h-screen bg-gray-200 px-6">
        <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
          <div className="flex justify-center items-center">
            <Logo />
            <Typography variant="h4">Dashboard</Typography>
          </div>

          <form className="mt-4" onSubmit={handleSubmit(doSubmit)}>
            <label className="block">
              <FormLabel>Email</FormLabel>
              <input
                id="email"
                type={TextFieldType.Email}
                className={`mt-1 w-full border-gray-300 block rounded-md focus:border-indigo-600' ${
                  errors.email ? 'border-red-400' : ''
                }`}
                {...register('email')}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </label>

            <label className="block mt-3">
              <FormLabel>Password</FormLabel>
              <input
                id="password"
                type={TextFieldType.Password}
                className={`mt-1 w-full border-gray-300 block rounded-md focus:border-indigo-600' ${
                  errors.password ? 'border-red-400' : ''
                }`}
                {...register('password')}
              />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </label>

            <div className="flex justify-between items-center mt-4">
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-indigo-600"
                    {...register('rememberMe')}
                  />
                  <Typography variant={'body2'} classes={['mx-2']}>
                    Remember me
                  </Typography>
                </label>
              </div>

              <div>
                <Link onClick={() => setOpen(true)}>Forgot your password?</Link>
              </div>
            </div>

            <div className="mt-6">
              <Button color={'primary'} fullWidth={true}>
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
      {open && (
        <>
          <Confirm
            title={'Deactivate account'}
            onSubmit={handleConfirm}
            onClose={handleClose}
            onCancel={handleClose}
            icon={'alert'}
            alert={true}
          >
            <p className="text-sm text-gray-500">
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed. This action cannot be undone.
            </p>
          </Confirm>
        </>
      )}
    </>
  )
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <SimpleLayout title={'ログイン'}>{page}</SimpleLayout>
}
