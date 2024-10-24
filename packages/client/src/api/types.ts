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
