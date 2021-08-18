import axios, { AxiosPromise } from 'axios'

export interface BaseResponse {
  status: string
}

export interface AuthRequest {
  id: string
  password: string
}

export interface AuthResponse {
  status: string
  token: string
}

export interface ChangePasswordRequest {
  password: string
}

export interface VerifyCodeRequest {
  code: string
}

class AuthRepository {
  public static signIn(req: AuthRequest): AxiosPromise<AuthResponse> {
    return axios.put(`/api/auth`, req)
  }

  public static changePassword(
    req: ChangePasswordRequest
  ): AxiosPromise<BaseResponse> {
    return axios.put(`/api/password/change`, req)
  }

  public static verifyCode(req: VerifyCodeRequest): AxiosPromise<BaseResponse> {
    return axios.put(`/api/code/verify`, req)
  }
}

export { AuthRepository }
