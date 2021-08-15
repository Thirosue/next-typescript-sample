import { Session } from './session'

export interface GlobalState {
  signedIn: false
  processing: false
  session: Session
}
