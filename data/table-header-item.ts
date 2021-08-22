export interface TableHeaderItem {
  key?: string
  label: string
  sortable?: boolean
  onClick?: () => Promise<void>
}
