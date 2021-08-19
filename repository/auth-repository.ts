import axios, { AxiosPromise } from 'axios'

export interface AuthRequest {
  id: string
  password: string
}

export interface CheckSessionRequest {
  jwt: string
}

export interface ChangePasswordRequest {
  password: string
}

export interface VerifyCodeRequest {
  code: string
}

export interface BaseResponse {
  status: string
}

export interface AuthResponse {
  status: string
  token: string
}

class AuthRepository {
  public static signIn(req: AuthRequest): AxiosPromise<AuthResponse> {
    return axios.put(`/api/auth`, req)
  }

  public static checkSession(
    req: CheckSessionRequest
  ): AxiosPromise<AuthResponse> {
    const config = {
      headers: { Authorization: `Bearer ${req.jwt}` },
    }
    return axios.post(`/api/auth/check`, {}, config)
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
