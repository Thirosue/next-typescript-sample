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
      </main>
    </div>
  )
}

export default SimpleLayout
