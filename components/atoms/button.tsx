import _ from 'lodash'

type Map = {
  key: string
  class: string[]
}

const ColorSetting: Map[] = [
  {
    key: 'primary',
    class: [
      'text-white',
      'bg-indigo-600',
      'hover:bg-indigo-700',
      'focus:ring-indigo-500',
      'border-transparent',
      'primary-button',
    ],
  },
  {
    key: 'default',
    class: [
      'text-gray-700',
      'bg-white',
      'hover:bg-gray-100',
      'focus:ring-indigo-500',
      'border-gray-300',
      'default-button',
    ],
  },
  {
    key: 'danger',
    class: [
      'text-white',
      'bg-red-600',
      'hover:bg-red-700',
      'focus:ring-red-500',
      'border-transparent',
      'danger-button',
    ],
  },
]

const SizeSetting: Map[] = [
  { key: 'small', class: ['py-2', 'px-4', 'text-sm'] },
]

export const Button = ({
  children,
  color = 'default',
  size = 'small',
  fullWidth = false,
  disabled = false,
  classes = [],
  onClick,
}: {
  children: React.ReactNode
  color?: 'default' | 'primary' | 'secondary' | 'danger'
  size?: 'large' | 'medium' | 'small'
  fullWidth?: boolean
  disabled?: boolean
  classes?: string[]
  onClick?: (event: any) => void
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
    'inline-flex',
    'justify-center',
    'rounded-md',
    'border',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    ..._color,
    ..._size,
    ...classes,
  ].join(' ')

  const handleSubmit = (event: any) => {
    if (onClick && !disabled) {
      onClick(event)
    }
  }

  return (
    <button
      className={`${className} ${fullWidth ? 'w-full' : ''} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={handleSubmit}
    >
      {children}
    </button>
  )
}

export default Button
