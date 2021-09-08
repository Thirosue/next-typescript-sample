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
import ProductRow from '../molecules/product-row'
import { PageItem } from '../../data/page-item'
import { TableHeaderItem } from '../../data/table-header-item'
import { SortItem } from '../../data/sort-item'
import Dashboard from '../organisms/dashboard'
import SearchableTable from '../organisms/searchable-table'
import Const from '../../const'

type IndexQuery = ParsedUrlQuery & {
  keyword: string
  page: string
  order: string
  orderBy: string
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
          <Dashboard />
        </div>

        <div className="mt-8" />

        <SearchableTable
          search={pushState}
          headerItems={headerItems}
          pageItem={pageItem}
          sortItem={sortItem}
          setSortItem={setSortItem}
          queryResult={products}
        >
          <tbody className="bg-white">
            {products.isFetched &&
              products.data.data.data.map((product: Product, index: number) => (
                <ProductRow key={index} product={product} />
              ))}
          </tbody>
        </SearchableTable>
      </div>
    </>
  )
}

export default IndexPage
