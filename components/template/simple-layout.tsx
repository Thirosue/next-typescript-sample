import { ToastContainer } from 'react-toastify'
import ConfirmProvider from '../../context/confirmProvider'
import Seo from './seo'

export const siteTitle = 'Next.js Sample Website'

export const SimpleLayout = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  return (
    <div>
      <Seo title={siteTitle} />
      <header></header>
      <main>
        <ConfirmProvider>{children}</ConfirmProvider>
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
