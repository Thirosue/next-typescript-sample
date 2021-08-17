import Seo from './seo'

export const SimpleLayout = ({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}): JSX.Element => {
  return (
    <>
      <Seo title={title} />
      {children}
    </>
  )
}

export default SimpleLayout
