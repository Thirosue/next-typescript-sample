import { ReactNode, useState } from 'react'
import _, { Many } from 'lodash'

interface Map {
  key: string
  class: string[]
}

const ColorSetting: Map[] = [
  { key: 'primary', class: ['bg-indigo-600', 'hover:bg-indigo-500'] },
]

const SizeSetting: Map[] = [
  { key: 'small', class: ['py-2', 'px-4', 'text-sm'] },
]

export const Button = ({
  children,
  color = 'default',
  size = 'small',
  fullWidth = false,
  classes = [],
  onClick,
}: {
  children: ReactNode
  color?: Many<'default' | 'primary' | 'secondary'>
  size?: Many<'large' | 'medium' | 'small'>
  fullWidth?: boolean
  classes?: string[]
  onClick?: (event: any) => Promise<void>
}): JSX.Element => {
  const _color = _.head(
    ColorSetting.filter((map: Map) => map.key === color).map(
      (map: Map) => map.class
    )
  )
  const _size = _.head(
    SizeSetting.filter((map: Map) => map.key === size).map(
      (map: Map) => map.class
    )
  )
  const className = [
    'text-center',
    'rounded-md',
    'text-white',
    ..._color,
    ..._size,
    ...classes,
  ].join(' ')
  const [processing, setProcessing] = useState(false)

  const handleSubmit = (event: any) => {
    if (onClick && !processing) {
      setProcessing(true)
      onClick(event).finally(() => setProcessing(false))
    }
  }

  return (
    <button
      className={`${className} ${fullWidth ? 'w-full' : ''}`}
      onClick={handleSubmit}
    >
      {children}
    </button>
  )
}

export default Button
