import { createContext } from 'react'
import { GlobalState } from '../data/global-state'

export default createContext(
  {} as {
    state: GlobalState
    updateState: (value: GlobalState) => void
    clearState: () => void
    isSignin: () => boolean
  }
)
