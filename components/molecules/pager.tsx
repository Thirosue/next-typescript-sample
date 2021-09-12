import React, { useEffect, useState } from 'react'
import { PageItem } from '../../data/page-item'
import Const from '../../const'

const OmitLink = (): JSX.Element => (
  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
    ...
  </span>
)

const PageLink = ({
  page,
  active,
  handleClick,
}: {
  page: number
  active?: boolean
  handleClick: (page: number) => Promise<void>
}): JSX.Element => {
  return (
    <a
      href="#"
      onClick={() => active && handleClick(page)}
      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium page-link-${page} ${
        active
          ? 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
          : 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 cursor-not-allowed'
      }`}
    >
      {page}
    </a>
  )
}

const NaviLink = ({
  children,
  active,
  handleClick,
}: {
  children: React.ReactNode
  active?: boolean
  handleClick: () => Promise<void>
}): JSX.Element => {
  return (
    <a
      href="#"
      onClick={handleClick}
      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white ${
        active ? 'hover:bg-gray-50' : 'cursor-not-allowed'
      }`}
    >
      {children}
    </a>
  )
}

const PAGER_BUFFER = 3

export const Pager = ({
  pageItem,
  search,
}: {
  pageItem: PageItem
  search: (page: number) => Promise<void>
}): JSX.Element => {
  const isFirstActive = pageItem.page !== 1
  const isLastActive = pageItem.page !== pageItem.totalPage

  const [pages, setPages] = useState<number[]>([])
  useEffect(() => {
    setPages([])
    const { page, totalPage } = pageItem
    const from = 1 <= page - PAGER_BUFFER ? page - PAGER_BUFFER : 1
    const to =
      page + PAGER_BUFFER <= totalPage ? page + PAGER_BUFFER : totalPage
    for (let i = from; i <= to; i++) {
      setPages((prev) =>
        [...prev, i].filter((page) => page !== 1 && page !== pageItem.totalPage)
      ) //1ページ目と最終ページは除く
    }
  }, [pageItem.page, pageItem.totalPage])

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <NaviLink
          active={isFirstActive}
          handleClick={() => isFirstActive && search(pageItem.page - 1)}
        >
          Previous
        </NaviLink>
        <NaviLink
          active={isLastActive}
          handleClick={() => isLastActive && search(pageItem.page + 1)}
        >
          Next
        </NaviLink>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            <span>Showing</span>
            <span className="font-medium mx-1">
              {Const.defaultPageValue.perPage * (pageItem.page - 1) + 1}
            </span>
            <span>to</span>
            <span className="font-medium mx-1">
              {Const.defaultPageValue.perPage}
            </span>
            <span>of</span>
            <span className="font-medium mx-1">{pageItem.totalCount}</span>
            <span>results</span>
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <NaviLink
              active={isFirstActive}
              handleClick={() => isFirstActive && search(pageItem.page - 1)}
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </NaviLink>
            {1 <= pageItem.totalPage && (
              <PageLink page={1} handleClick={search} active={isFirstActive} />
            )}
            {0 < pages.length &&
              pages.map((page, index: number) => (
                <React.Fragment key={index}>
                  {index === 0 && 2 < page && <OmitLink />}
                  <PageLink
                    page={page}
                    handleClick={search}
                    active={pageItem.page !== page}
                  />
                  {index === pages.length - 1 &&
                    page < pageItem.totalPage - 1 && <OmitLink />}
                </React.Fragment>
              ))}
            {2 <= pageItem.totalPage && (
              <PageLink
                page={pageItem.totalPage}
                handleClick={search}
                active={isLastActive}
              />
            )}
            <NaviLink
              active={isLastActive}
              handleClick={() => isLastActive && search(pageItem.page + 1)}
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </NaviLink>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pager
