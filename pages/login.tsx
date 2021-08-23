import { useState, ReactElement } from 'react'
import { SimpleLayout } from '../components/template'
import LoginPage from '../components/page/login-page'
import PasswordDialog from '../components/page/password-dialog'
import ConfirmCodeModal from '../components/page/confirm-code-dialog'

export default function Login(): JSX.Element {
  // For Password Modal
  const [state, setState] = useState<'Init' | 'WaitingForCode' | 'Done'>('Init')

  // For Password Modal
  const [passwordModal, setPasswordModalOpen] = useState(false)
  const handlePasswordModalClose = (_: any): void => setPasswordModalOpen(false)

  return (
    <>
      <LoginPage passwordModalOpen={() => setPasswordModalOpen(true)} />
      {passwordModal && (
        <PasswordDialog
          onSubmit={() => setState('WaitingForCode')}
          onClose={handlePasswordModalClose}
          onCancel={handlePasswordModalClose}
        />
      )}
      {state === 'WaitingForCode' && (
        <ConfirmCodeModal
          onSubmit={() => setState('Done')}
          onClose={() => setState('Init')}
          onCancel={() => setState('Init')}
        />
      )}
    </>
  )
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <SimpleLayout title={'ログイン'}>{page}</SimpleLayout>
}
