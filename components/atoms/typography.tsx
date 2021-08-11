import { ReactNode } from 'react'
import _, { Many } from 'lodash'

interface Map {
  key: string
  class: string[]
}

const VariantSetting: Map[] = [
  { key: 'h4', class: ['text-gray-700', 'text-2xl', 'font-semibold'] },
  { key: 'body2', class: ['text-gray-600', 'text-sm'] },
]

export const Typography = ({
  children,
  variant = 'body2',
  classes = [],
}: {
  children: ReactNode
  variant?: Many<
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline'
    | 'srOnly'
    | 'inherit'
  >
  classes?: string[]
}): JSX.Element => {
  const _classes = _.head(
    VariantSetting.filter((map: Map) => map.key === variant).map(
      (map: Map) => map.class
    )
  )
  const className = [..._classes, ...classes].join(' ')

  return <span className={className}>{children}</span>
}

export default Typography
