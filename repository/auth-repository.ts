import axios, { AxiosPromise } from 'axios'

export type AuthRequest = {
  id: string
  password: string
}

export type CheckSessionRequest = {
  jwt: string
}

export type ChangePasswordRequest = {
  password: string
}

export type VerifyCodeRequest = {
  code: string
}

export type BaseResponse = {
  status: string
}

export type AuthResponse = {
  status: string
  token: string
}

class AuthRepository {
  public static signIn(req: AuthRequest): AxiosPromise<AuthResponse> {
    return axios.put(`/api/auth`, req)
  }

  public static signOut(): AxiosPromise<BaseResponse> {
    return axios.put(`/api/auth/signout`, {})
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
