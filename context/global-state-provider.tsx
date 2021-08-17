import { useState, useEffect } from 'react'
import _ from 'lodash'
import { parseCookies, setCookie } from 'nookies'
import GlobalContext from './global-context'
import { GlobalState } from '../data/global-state'
import Const from '../const'

const captains = console

const INIT_STATE = {
  session: {
    username: undefined,
    sub: undefined,
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
  const [state, setState] = useState(initState)

  const updateState = (value: GlobalState): void => {
    setState({ ...state, ...value })
  }

  const isSignin = () => !!state.session.sub

  const global = {
    state,
    updateState,
    isSignin,
  }

  useEffect(() => {
    async function checkLogin() {
      // nop
    }

    checkLogin()
  }, []) // eslint-disable-line

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
