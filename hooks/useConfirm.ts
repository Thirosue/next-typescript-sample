import { useContext } from 'react'
import ConfirmContext from '../context/confirm-context'
import { DialogOptions } from '../data/dialog-options'

const useConfirm = (): ((options: DialogOptions) => Promise<void>) => {
  const { confirm } = useContext(ConfirmContext)
  return confirm
}

export default useConfirm
