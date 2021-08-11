import { ReactNode } from 'react'

export const FormErrorMessage = ({
  children,
  classes = ['mt-1'],
}: {
  children: ReactNode
  classes?: string[]
}): JSX.Element => {
  const className = [
    'text-red-500',
    'text-xs',
    ...classes,
  ].join(' ')

  return <p className={className}>{children}</p>
}

export default FormErrorMessage
