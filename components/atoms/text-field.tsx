import { TextFieldType } from '../../data'

export const TextField = ({
  label,
  type,
  classes,
  defaultValue,
}: {
  label: string
  type?: TextFieldType
  classes?: string[]
  defaultValue?: string
}): JSX.Element => {
  const className = ['block', ...(classes ? classes : [])].join(' ')

  return (
    <label className={className}>
      <span className="text-gray-700 text-sm">{label}</span>
      <input
        type={type ? type : TextFieldType.Text}
        className="mt-1 border-gray-300 block w-full rounded-md focus:border-indigo-600"
        value={defaultValue}
      />
    </label>
  )
}

export default TextField
