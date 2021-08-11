import { TextFieldType } from '../../data'
import { useState } from 'react'

export const TextField = ({
  label,
  type,
  classes,
  value,
  error,
  helperText,
  onChange,
}: {
  label: string
  type?: TextFieldType
  classes?: string[]
  value: string
  error: boolean
  helperText?: string
  onChange: (...args: any[]) => any
}): JSX.Element => {
  const className = ['block', ...(classes ? classes : [])].join(' ')
  const [val, setValue] = useState(value)

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
        value={val}
        onChange={handleChange}
      />
      {error && <p className="mt-2 text-red-500 text-xs">{helperText}</p>}
    </label>
  )
}

export default TextField
