import { useContext } from 'react'
import ConfirmContext from '../context/confirmContext'
import { DialogOptions } from '../data/dialog-options'

const useConfirm = (): ((options: DialogOptions) => Promise<void>) => {
  const { confirm } = useContext(ConfirmContext)
  return confirm
}

export default useConfirm
