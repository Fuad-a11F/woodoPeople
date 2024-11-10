import { ChangeUserInformationRequest, UserResponse } from '../../api/types'

export interface ChangeInformationProps extends UserResponse {
  onUserInformationSave: (newData: UserResponse) => void
}
