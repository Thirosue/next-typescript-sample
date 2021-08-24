import { useState, useEffect } from 'react'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { AxiosPromise, AxiosResponse } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import GlobalContext from './global-context'
import { GlobalState } from '../data/global-state'
import Const from '../const'
import {
  CheckSessionRequest,
  AuthResponse,
  AuthRepository,
} from '../repository/auth-repository'

const captains = console

const INIT_STATE = {
  session: {
    username: undefined,
    sub: undefined,
    jwtToken: undefined,
    email_verified: false,
  },
}

const initState = (): GlobalState => {
  const cookie = parseCookies(null)
  let state = cookie.state
    ? (_.attempt(JSON.parse.bind(null, cookie.state)) as GlobalState)
    : { ...INIT_STATE }

  captains.log(state)
  if (_.isError(state) || !state) {
    state = { ...INIT_STATE }
  }
  return {
    ...state,
  }
}

const GlobalStateProvider = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const router = useRouter()
  const [state, setState] = useState<GlobalState>(initState)

  const mutation = useMutation(
    (req: CheckSessionRequest): AxiosPromise<AuthResponse> =>
      AuthRepository.checkSession(req)
  )

  const clearState = (): void => {
    setState({ ...INIT_STATE })
  }

  const updateState = (value: GlobalState): void => {
    setState({ ...state, ...value })
  }

  const renewToken = (token: string): void => {
    setState({
      ...state,
      ...{ session: { jwtToken: token, sub: state.session.sub } },
    })
  }

  const isSignin = () => !!state.session.sub

  const global = {
    state,
    updateState,
    renewToken,
    clearState,
    isSignin,
  }

  useEffect(() => {
    async function checkLogin() {
      if (state.session.jwtToken) {
        const req: CheckSessionRequest = {
          jwt: state.session.jwtToken,
        }

        mutation.mutate(req, {
          onSuccess: (res: AxiosResponse<AuthResponse>) => {
            setState((_: any) => ({
              session: {
                jwtToken: res.data.token,
                sub: 'sub',
              },
            }))
          },
          onError: () => {
            setState((_: any) => ({
              ...INIT_STATE,
            }))
            router.push('/login')
          },
        })
      } else {
        setState((_: any) => ({
          ...INIT_STATE,
        }))
        router.push('/login')
      }
    }

    checkLogin()
  }, [])

  useEffect(() => {
    setCookie(null, 'state', JSON.stringify(state), {
      // 60秒 * 60 * 24 * 3650 日間保存
      maxAge: 24 * 60 * 60 * Const.SessionRetentionPeriod,
      secure: true,
    })
  }, [state])

  return (
    <GlobalContext.Provider value={global}>{children}</GlobalContext.Provider>
  )
}

export default GlobalStateProvider
