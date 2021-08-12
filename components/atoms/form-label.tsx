import { Typography } from './typography'

export const FormLabel = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => <Typography variant={'body2'}>{children}</Typography>

export default FormLabel
