import axios, { AxiosPromise } from 'axios'

export interface ProductListRequest {
  name?: string
  description?: string
  page: number
  rows: number
  order?: '' | 'asc' | 'desc'
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

export interface BaseResponse {
  status: string
}

export type ProductUpdateRequest = Product

class ProductRepository {
  public static findAll(
    req: ProductListRequest
  ): AxiosPromise<ProductResponse> {
    return axios.get(`/api/products`, { params: req })
  }

  public static update(req: ProductUpdateRequest): AxiosPromise<BaseResponse> {
    return axios.put(`/api/products/put?id=${req.id}`, req)
  }
}

export { ProductRepository }
