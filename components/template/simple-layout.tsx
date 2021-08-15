import { ToastContainer } from 'react-toastify'
import GlobalStateProvider from '../../context/global-state-provider'
import ConfirmProvider from '../../context/confirm-provider'
import Seo from './seo'

export const SimpleLayout = ({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}): JSX.Element => {
  return (
    <div>
      <Seo title={title} />
      <header></header>
      <main>
        <ConfirmProvider>
          <GlobalStateProvider>{children}</GlobalStateProvider>
        </ConfirmProvider>
        <ToastContainer
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </main>
    </div>
  )
}

export default SimpleLayout
