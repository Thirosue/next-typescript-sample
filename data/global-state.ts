import { Session } from './session'

export interface GlobalState {
  signedIn: boolean
  processing?: boolean
  session: Session
}
