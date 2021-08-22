import { Many } from 'lodash'

export interface SortItem {
  key: string
  order: Many<'' | 'asc' | 'desc'>
}
