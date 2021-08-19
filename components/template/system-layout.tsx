import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import GlobalStateProvider from '../../context/global-state-provider'
import ConfirmProvider from '../../context/confirm-provider'

const queryClient = new QueryClient()

export const SystemLayout = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ConfirmProvider>
          <GlobalStateProvider>{children}</GlobalStateProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </ConfirmProvider>
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

export default SystemLayout
