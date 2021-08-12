import { createContext } from 'react'
import { DialogOptions } from '../data/dialog-options'

export default createContext(
  {} as {
    confirm: (options: DialogOptions) => Promise<void>
  }
)
