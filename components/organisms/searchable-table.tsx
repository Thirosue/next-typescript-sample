import React, { Dispatch, SetStateAction } from 'react'
import TableHeader from '../molecules/table-header'
import Pager from '../molecules/pager'
import { TableHeaderItem } from '../../data/table-header-item'
import { SortItem } from '../../data/sort-item'
import { PageItem } from '../../data/page-item'
import { UseQueryResult } from 'react-query'
import { AxiosResponse } from 'axios'

export const SearchableTable = ({
  children,
  headerItems,
  pageItem,
  sortItem,
  setSortItem,
  search,
  queryResult,
}: {
  children: React.ReactNode
  headerItems: TableHeaderItem[]
  pageItem: PageItem
  sortItem: SortItem
  setSortItem: Dispatch<SetStateAction<SortItem>>
  search: (page: number, sortItem?: SortItem) => Promise<void>
  queryResult: UseQueryResult<AxiosResponse, unknown>
}): JSX.Element => {
  return (
    <div className="flex flex-col mt-8">
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
          <table className="min-w-full">
            <thead>
              <TableHeader
                headerItems={headerItems}
                sortItem={sortItem}
                setSortItem={setSortItem}
                search={search}
              />
            </thead>

            {children}
          </table>
          {queryResult.isFetched && (
            <Pager search={search} pageItem={pageItem} />
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchableTable
