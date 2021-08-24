export const InputLabel = ({
  value,
  fullWidth = false,
  classes = [],
}: {
  value: string | number
  fullWidth?: boolean
  classes?: string[]
}): JSX.Element => {
  return (
    <input
      disabled
      type="text"
      className={`border-gray-300 block rounded-md text-gray-500 bg-gray-100 bg-opacity-25 ${classes.join(
        ' '
      )} ${fullWidth && 'w-full'}`}
      value={value}
    />
  )
}

export default InputLabel
