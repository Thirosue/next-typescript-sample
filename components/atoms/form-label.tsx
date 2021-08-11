import { ReactNode } from 'react'

export const FormLabel = ({
  children,
}: {
  children: ReactNode
}): JSX.Element => <span className="text-gray-700 text-sm">{children}</span>

export default FormLabel
