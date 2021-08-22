import { Many } from 'lodash'

const Const = {
  SessionRetentionPeriod: 3650,
  defaultPageValue: {
    page: 1,
    totalCount: 0,
    perPage: 2,
  },
  sortDefaultValue: {
    key: '',
    order: '' as Many<''>,
  },
}

export default Const
