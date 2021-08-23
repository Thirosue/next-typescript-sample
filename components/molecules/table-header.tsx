import { Dispatch, SetStateAction } from 'react'
import { TableHeaderItem } from '../../data/table-header-item'
import { SortItem } from '../../data/sort-item'

const Upicon = (): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="ml-2 h-3 w-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 15l7-7 7 7"
    />
  </svg>
)

const Downicon = (): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="ml-2 h-3 w-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
)

export const TableHeader = ({
  headerItems,
  sortItem,
  setSortItem,
  search,
}: {
  headerItems: TableHeaderItem[]
  sortItem: SortItem
  setSortItem: Dispatch<SetStateAction<SortItem>>
  search: (page: number, sortItem: SortItem) => Promise<void>
}): JSX.Element => {
  const sort = async (item: SortItem): Promise<void> => {
    setSortItem(item)
    await search(1, {
      key: item.key,
      order: sortItem.order === 'asc' ? 'desc' : 'asc',
    })
  }

  return (
    <tr>
      {headerItems.map((item, index) => (
        <th
          key={index}
          className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
        >
          {item.sortable ? (
            <a
              href="#"
              onClick={() =>
                sort({
                  key: item.key,
                  order: sortItem.order === 'asc' ? 'desc' : 'asc',
                })
              }
              className="flex justify-start"
            >
              <div>{item.label}</div>
              <div>
                {sortItem.key === item.key && sortItem.order === 'asc' ? (
                  <Upicon />
                ) : (
                  <Downicon />
                )}
              </div>
            </a>
          ) : (
            <>{item.label}</>
          )}
        </th>
      ))}
    </tr>
  )
}

export default TableHeader
