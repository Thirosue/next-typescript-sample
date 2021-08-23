import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useQuery } from 'react-query'
import { AxiosPromise } from 'axios'
import {
  Product,
  ProductResponse,
  ProductRepository,
} from '../../repository/product-repository'
import { Progress } from '../../components/progress'
import DashboardCard from '../molecules/dashboard-card'
import ProductRow from '../molecules/product-row'
import { PageItem } from '../../data/page-item'
import { TableHeaderItem } from '../../data/table-header-item'
import { SortItem } from '../../data/sort-item'
import TableHeader from '../molecules/table-header'
import Pager from '../molecules/pager'
import Const from '../../const'

interface IndexQuery extends ParsedUrlQuery {
  keyword: string
  page: string
}

const headerItems: TableHeaderItem[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'description', label: 'Description', sortable: true },
  { label: 'Quantity' },
  { label: 'Status' },
  { label: '' },
]

export const IndexPage = (): JSX.Element => {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')
  const [pageItem, setPageItem] = useState<PageItem>({
    ...Const.defaultPageValue,
  })
  const [sortItem, setSortItem] = useState<SortItem>({
    ...Const.sortDefaultValue,
  })

  const products = useQuery(
    ['products', [keyword, pageItem, sortItem]],
    (): AxiosPromise<ProductResponse> =>
      ProductRepository.findAll({
        name: keyword,
        page: pageItem.page - 1,
        order: sortItem.order,
        orderBy: sortItem.key,
        rows: Const.defaultPageValue.perPage,
      })
  )

  useEffect(() => {
    const { keyword, page } = router.query as IndexQuery
    setKeyword(keyword)
    setPageItem({
      ...pageItem,
      page: page ? Number(page) : 1,
    })
  }, [router.query])

  useEffect(() => {
    if (products.isFetched) {
      setPageItem({
        ...pageItem,
        totalCount: products.data.data.count,
        totalPage: Math.ceil(products.data.data.count / pageItem.perPage),
      })
    }
  }, [products.isFetched])

  const pushState = async (page: number, sort?: SortItem): Promise<void> => {
    await router.push({
      query: {
        keyword,
        page,
        orderBy: sort?.key ?? sortItem.key,
        order: sort?.order ?? sortItem.order,
      },
    })
  }

  return (
    <>
      {/*  コンテンツ */}
      <Progress processing={products.isLoading} />
      <div className="container mx-auto px-6 py-8">
        <h3 className="text-gray-700 text-3xl font-medium">Dashboard</h3>

        <div className="mt-4">
          <div className="flex flex-wrap -mx-6">
            <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
              <DashboardCard count={8282} label="New Customer">
                <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </DashboardCard>
            </div>

            <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
              <DashboardCard count={200521} label="Total Orders">
                <div className="p-3 rounded-full bg-purple-600 bg-opacity-75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </DashboardCard>
            </div>

            <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
              <DashboardCard count={215542} label="Available Products">
                <div className="p-3 rounded-full bg-pink-600 bg-opacity-75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
              </DashboardCard>
            </div>
          </div>
        </div>

        <div className="mt-8" />

        <div className="flex flex-col mt-8">
          <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
              <table className="min-w-full">
                <thead>
                  <TableHeader
                    headerItems={headerItems}
                    sortItem={sortItem}
                    setSortItem={setSortItem}
                    search={pushState}
                  />
                </thead>

                <tbody className="bg-white">
                  {products.isFetched &&
                    products.data.data.data.map(
                      (product: Product, index: number) => (
                        <ProductRow key={index} product={product} />
                      )
                    )}
                </tbody>
              </table>
              {products.isFetched && (
                <Pager search={pushState} pageItem={pageItem} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default IndexPage
