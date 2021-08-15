import { useState, useEffect } from 'react'
// import _ from 'lodash'
import GlobalContext from './global-context'
import Progress from '../components/progress'
import { GlobalState } from '../data/global-state'

const captains = console

// Todo リロードで値を復元する
// const initState = (): GlobalState => {
//     let state = _.attempt(JSON.parse.bind(null, localStorage.getItem('state'))) as GlobalState;
//     captains.log(state)
//     if (_.isError(state) || !state) {
//         state = {
//             ...{
//                 signedIn: false,
//                 processing: false,
//                 session: {
//                     username: undefined,
//                     sub: undefined,
//                     email_verified: false
//                 }
//             }
//         };
//     }
//     return {
//         ...state,
//         processing: false,
//     }
// }

const GlobalStateProvider = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const [state, setState] = useState({
    ...{
      signedIn: false,
      processing: false,
      session: {
        username: undefined,
        sub: undefined,
      },
    },
  })

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
    captains.log(state)

    async function checkLogin() {
      // nop
    }

    checkLogin()
  }, []) // eslint-disable-line

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state))
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
