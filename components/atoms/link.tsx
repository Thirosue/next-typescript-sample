export const Link = ({
  children,
  href = '#',
  onClick,
}: {
  children: React.ReactNode
  href?: string
  onClick?: (event: any) => void
}): JSX.Element => {
  const handleClick = (event: any): void => {
    if (onClick) {
      onClick(event)
    }
  }

  return (
    <a
      className="block text-sm fontme text-indigo-700 hover:underline"
      href={href}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}

export default Link
