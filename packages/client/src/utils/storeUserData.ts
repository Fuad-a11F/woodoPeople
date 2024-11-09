import { UserResponse } from '../api/types'

export const storeUserData = (userData: UserResponse) => {
  sessionStorage.setItem('user', JSON.stringify(userData))
}
