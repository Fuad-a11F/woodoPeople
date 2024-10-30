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

export interface SignUpResponse {
  id?: number
  reason?: string
}

export interface UserResponse {
  id: number
  login: string
  first_name: string
  second_name: string
  display_name: string
  avatar: string
  phone: string
  email: string
  reason?: string
}
