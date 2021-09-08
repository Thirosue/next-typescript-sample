export type TableHeaderItem = {
  key?: string
  label: string
  sortable?: boolean
  onClick?: () => Promise<void>
}
