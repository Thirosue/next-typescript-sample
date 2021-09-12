import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import GlobalStateProvider from '../../context/global-state-provider'
import ConfirmProvider from '../../context/confirm-provider'
import Seo from './seo'
import Header from './header'
import SideBar from './sidebar'

const queryClient = new QueryClient()

export const DashboardLayout = ({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ConfirmProvider>
          <GlobalStateProvider>
            <Seo title={title} />
            <div className="flex h-screen bg-gray-200 font-roboto">
              <SideBar
                sidebarOpen={sidebarOpen}
                toggle={() => setSidebarOpen(false)}
              />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header toggle={() => setSidebarOpen(true)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                  {children}
                </main>
              </div>
            </div>
          </GlobalStateProvider>
          {process.env.NODE_ENV === 'development' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
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

export default DashboardLayout
