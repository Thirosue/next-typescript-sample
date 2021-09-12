import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import GlobalStateProvider from '../../context/global-state-provider'
import ConfirmProvider from '../../context/confirm-provider'
import Seo from './seo'

const queryClient = new QueryClient()

export const SimpleLayout = ({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}): JSX.Element => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ConfirmProvider>
          <GlobalStateProvider>
            <Seo title={title} />
            {children}
          </GlobalStateProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </ConfirmProvider>
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        position={'bottom-right'}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default SimpleLayout
