import { JsonObject } from '../interfaces/json.interface'

export interface SignInRequest extends JsonObject {
  login: string
  password: string
}

export interface SignInResponse {
  reason?: string
  message?: string
}

export interface SignUpRequest extends JsonObject {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export interface ChangeUserInformationRequest extends JsonObject {
  first_name: string
  second_name: string
  email: string
  phone: string
}

export interface SignUpResponse {
  id?: number
  reason?: string
}

export interface changePasswordRequest extends JsonObject {
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
