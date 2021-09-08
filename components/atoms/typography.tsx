import _ from 'lodash'

type Map = {
  key: string
  class: string[]
}

const VariantSetting: Map[] = [
  { key: 'h2', class: ['text-gray-900', 'text-5xl', 'font-semibold'] },
  { key: 'h3', class: ['text-gray-900', 'text-4xl', 'font-semibold'] },
  { key: 'h4', class: ['text-gray-900', 'text-2xl', 'font-semibold'] },
  { key: 'h5', class: ['text-gray-900', 'text-xl', 'font-semibold'] },
  { key: 'h6', class: ['text-gray-900', 'text-lg', 'font-semibold'] },
  { key: 'subtitle1', class: ['prose', 'font-semibold'] },
  { key: 'subtitle2', class: ['prose', 'prose-sm', 'font-semibold'] },
  { key: 'body1', class: ['prose'] },
  { key: 'body2', class: ['prose', 'prose-sm'] },
]

export const Typography = ({
  children,
  variant = 'body1',
  classes = [],
}: {
  children: React.ReactNode
  variant?:
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
  classes?: string[]
}): JSX.Element => {
  const _classes = _.head(
    VariantSetting.filter((map: Map) => map.key === variant).map(
      (map: Map) => map.class
    )
  )
  const className = [..._classes, ...classes].join(' ')

  return (
    <div>
      <span className={className}>{children}</span>
    </div>
  )
}

export default Typography
