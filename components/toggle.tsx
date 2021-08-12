import useConfirm from '../hooks/useConfirm'
import { Link } from '../components/atoms'

const captains = console

export const ToggleButton: React.FC = () => {
  const confirm = useConfirm()

  const handleClick = () => {
    confirm({
      title: 'Dialog Demo',
      icon: 'alert',
      alert: true,
      description:
        'セッションがタイムアウトしました。再度ログインしてください。',
    })
      .then(() => {
        captains.log('then')
      })
      .catch(() => {
        captains.log('error')
      })
  }

  return (
    <div className="mt-2">
      <Link onClick={handleClick}>open dialog?</Link>
    </div>
  )
}

export default ToggleButton
