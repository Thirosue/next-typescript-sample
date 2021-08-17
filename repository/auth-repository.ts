import axios, { AxiosPromise } from 'axios'

export interface AuthRequest {
  id: string
  password: string
}

export interface AuthResponse {
  status: string
  token: string
}

class AuthRepository {
  public static signIn(req: AuthRequest): AxiosPromise<AuthResponse> {
    return axios.put(`/api/auth`, req)
  }
}

export { AuthRepository }
