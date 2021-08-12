import { useContext } from 'react'
import ConfirmContext from '../context/confirmContext'

const useConfirm = () => {
  const { confirm } = useContext(ConfirmContext)
  return confirm
}

export default useConfirm
