import { useState, useEffect } from 'react'
import _ from 'lodash'
import { parseCookies, setCookie } from 'nookies'
import GlobalContext from './global-context'
import Progress from '../components/progress'
import { GlobalState } from '../data/global-state'
import Const from '../const'

const captains = console

const INIT_STATE = {
  signedIn: false,
  processing: false,
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
    processing: false,
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

  const startProcess = (): void => {
    setState({ ...state, processing: true })
  }

  const endProcess = (): void => {
    setState({ ...state, processing: false })
  }

  const global = {
    state,
    updateState,
    startProcess,
    endProcess,
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
    <GlobalContext.Provider value={global}>
      {/*  processing start */}
      <Progress processing={state.processing} />
      {/*  processing end */}
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalStateProvider
