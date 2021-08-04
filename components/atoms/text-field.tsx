import { TextFieldType } from '../../data'
import { useState } from "react"

export const TextField = ({
  label,
  type,
  classes,
  defaultValue,
  onChange
}: {
  label: string
  type?: TextFieldType
  classes?: string[]
  defaultValue?: string
  onChange: Function
}): JSX.Element => {
  const className = ['block', ...(classes ? classes : [])].join(' ')
  const [value, setValue] = useState(defaultValue ? defaultValue : '')

  const handleChange = (event: any): void => {
    setValue(event.target.value)
    onChange(event)
  }

  return (
    <label className={className}>
      <span className="text-gray-700 text-sm">{label}</span>
      <input
        type={type ? type : TextFieldType.Text}
        className="mt-1 border-gray-300 block w-full rounded-md focus:border-indigo-600"
        value={value}
        onChange={handleChange}
      />
    </label>
  )
}

export default TextField
