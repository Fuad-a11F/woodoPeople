import { ChangeUserInformationRequest, UserResponse } from '../../api/types'

export interface ChangeInformationProps extends UserResponse {
  onUserInformationSave: (newData: ChangeUserInformationRequest) => void
}

export interface IChangeInformationError {
  first_name: string | null
  second_name: string | null
  email: string | null
  phone: string | null
}
