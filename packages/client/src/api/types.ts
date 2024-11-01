export interface SignInRequest {
  login: string
  password: string
}

export interface SignInResponse {
  reason?: string
  message?: string
}

export interface SignUpRequest {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export type ChangeUserInformationRequest = Omit<
  SignUpRequest,
  'login' | 'password'
>

export interface SignUpResponse {
  id?: number
  reason?: string
}

export interface changePasswordRequest {
  oldPassword: string
  newPassword: string
  repeatPassword: string
}

export interface UserRequest {
  login: string
  first_name: string
  second_name: string
  display_name: string
  phone: string
  email: string
}

export interface UserResponse extends UserRequest {
  id: number
  avatar: string
  reason?: string
}
