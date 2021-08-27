import { useContext, useEffect } from 'react'
import Head from 'next/head'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { AxiosPromise, AxiosResponse, AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import isAfter from 'date-fns/isAfter'
import jwt from 'jsonwebtoken'
import useConfirm from '../../hooks/useConfirm'
import GlobalContext from '../../context/global-context'
import Logo from '../../components/logo'
import {
  FormLabel,
  FormErrorMessage,
  Button,
  Link,
  Typography,
} from '../../components/atoms'
import { Progress } from '../../components/progress'
import { TextFieldType } from '../../data'
import {
  AuthRequest,
  AuthResponse,
  AuthRepository,
} from '../../repository/auth-repository'

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
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'アルファベット（大文字小文字混在）と数字と特殊記号を組み合わせて8文字以上で入力してください'
    ),
})

export const LoginPage = ({
  passwordModalOpen,
}: {
  passwordModalOpen: () => void
}): JSX.Element => {
  const router = useRouter()
  const mutation = useMutation(
    (req: AuthRequest): AxiosPromise<AuthResponse> => AuthRepository.signIn(req)
  )
  const context = useContext(GlobalContext)
  const confirm = useConfirm()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      // email: 'test@test.com',
      // password: 'Password1?',
      rememberMe: Boolean(parseCookies(null).rememberMe),
    },
  })

  useEffect(() => {
    const rememberMe = Boolean(parseCookies(null).rememberMe)
    const { jwtToken } = context.state.session
    const decodedToken = jwt.decode(jwtToken, {
      complete: true,
    })
    const exp = new Date((decodedToken?.payload.exp * 1000) as number)
    if (rememberMe && isAfter(exp, new Date())) {
      router
        .push('/')
        .then(() => setTimeout(() => toast('自動ログインしました'), 100))
    } else {
      context.clearState()
    }
  }, [parseCookies(null).rememberMe])

  const rememberMe = async (event: any): Promise<void> => {
    if (event.target.checked) {
      const cancel = await confirm({
        title: '自動ログイン設定',
        icon: 'info',
        description: '自動ログインを有効にしますか？',
      })
        .then(() => {
          setCookie(null, 'rememberMe', 'true')
        })
        .catch(() => {
          return true
        })
      if (cancel) {
        event.target.checked = false
        event.preventDefault()
      }
    } else {
      const cancel = await confirm({
        title: '自動ログイン設定',
        icon: 'info',
        description: '自動ログインを無効にしますか？',
      })
        .then(() => {
          destroyCookie(null, 'rememberMe')
        })
        .catch(() => {
          return true
        })
      if (cancel) {
        event.target.checked = true
        event.preventDefault()
      }
    }
  }

  const doSubmit = (data: FormValues): void => {
    captains.log(data)
    const authRequest: AuthRequest = {
      id: data.email,
      password: data.password,
    }
    mutation.mutate(authRequest, {
      onSuccess: async (res: AxiosResponse<AuthResponse>) => {
        context.updateState({
          session: {
            username: data.email,
            jwtToken: res.data.token,
            sub: 'sub',
          },
        })
        await router.push('/')
        setTimeout(() => toast('ログインしました'), 100) // display toast after screen transition
      },
      onError: async (error: AxiosError) => {
        if (error.response.status === 401) {
          confirm({
            title: '認証エラー',
            alert: true,
            icon: 'warn',
            description: 'Emailもしくはパスワードが誤っています',
          })
        } else {
          confirm({
            title: 'システムエラー',
            alert: true,
            icon: 'alert',
            description:
              'エラーが発生しました。しばらくしてからもう一度お試しください。',
          })
        }
      },
    })
  }

  return (
    <>
      <Progress processing={mutation.isLoading} />
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
                className={`mt-1 w-full border-gray-300 block rounded-md focus:border-indigo-600 ${
                  errors.email ? 'border-red-400' : ''
                }`}
                {...register('email')}
              />
              <FormErrorMessage classes={['mt-1', 'email-error-message-area']}>
                {errors.email?.message}
              </FormErrorMessage>
            </label>

            <label className="block mt-3">
              <FormLabel>Password</FormLabel>
              <input
                id="password"
                type={TextFieldType.Password}
                className={`mt-1 w-full border-gray-300 block rounded-md focus:border-indigo-600 ${
                  errors.password ? 'border-red-400' : ''
                }`}
                {...register('password')}
              />
              <FormErrorMessage
                classes={['mt-1', 'password-error-message-area']}
              >
                {errors.password?.message}
              </FormErrorMessage>
            </label>

            <div className="flex justify-between items-center mt-4">
              <div>
                <label className="inline-flex items-center">
                  <input
                    onClick={rememberMe}
                    id="rememberMe"
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
                <Link onClick={passwordModalOpen}>Forgot your password?</Link>
              </div>
            </div>

            <div className="mt-6">
              <Button
                color={'primary'}
                fullWidth={true}
                disabled={mutation.isLoading}
              >
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginPage
