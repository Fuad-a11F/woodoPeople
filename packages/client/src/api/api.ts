import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from './types'

const API_URL = 'https://ya-praktikum.tech/api/v2'

export const signIn = async (data: SignInRequest): Promise<SignInResponse> => {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`Ошибка: ${response.status}`)
  }
  const contentType = response.headers.get('content-type')

  if (contentType && contentType.includes('application/json')) {
    const result = await response.json()
    return result
  } else {
    const resultText = await response.text()
    return { message: resultText }
  }
}

export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.reason || `Ошибка: ${response.status}`)
  }
  const result = await response.json()
  return result
}
