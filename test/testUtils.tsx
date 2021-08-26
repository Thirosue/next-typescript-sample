import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import GlobalStateProvider from '../context/global-state-provider'

const queryClient = new QueryClient()

const AllTheProviders: FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStateProvider>{children}</GlobalStateProvider>
    </QueryClientProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
