import { SimpleLayout } from '.'
import Header from './header'
import SideBar from './sidebar'

export const DashboardLayout = ({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}): JSX.Element => {
  return (
    <SimpleLayout title={title}>
      <div className="flex h-screen bg-gray-200 font-roboto">
        <SideBar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            {children}
          </main>
        </div>
      </div>
    </SimpleLayout>
  )
}

export default DashboardLayout
