import fetchWithConfig from './apiConfig'
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  UserResponse,
} from './types'

const API_URL = 'https://ya-praktikum.tech/api/v2'

export const signIn = (data: SignInRequest): Promise<SignInResponse> => {
  return fetchWithConfig<SignInResponse>(`${API_URL}/auth/signin`, {
    method: 'POST',
    data,
  })
}

export const signUp = (data: SignUpRequest): Promise<SignUpResponse> => {
  return fetchWithConfig<SignUpResponse>(`${API_URL}/auth/signup`, {
    method: 'POST',
    data,
  })
}

export const getUserData = (): Promise<UserResponse> => {
  return fetchWithConfig<UserResponse>(`${API_URL}/auth/user`, {
    method: 'GET',
  })
}

export const saveAvatar = (data: FormData): Promise<UserResponse> => {
  return fetchWithConfig<UserResponse>(`${API_URL}/user/profile/avatar`, {
    method: 'PUT',
    data,
    isFileUpload: true,
  })
}
