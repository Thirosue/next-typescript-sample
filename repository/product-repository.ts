import axios, { AxiosPromise } from 'axios'

export interface ProductListRequest {
  name?: string
  description?: string
  page: number
  rows: number
  order?: string
  orderBy?: string
}

export interface Product {
  name: string
  description: string
  id: number
  quantity: number
}

export interface ProductResponse {
  count: number
  data: Product[]
}

class ProductRepository {
  public static findAll(
    req: ProductListRequest
  ): AxiosPromise<ProductResponse> {
    return axios.get(`/api/products`, { params: req })
  }
}

export { ProductRepository }
