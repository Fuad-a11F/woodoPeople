import { Dispatch, SetStateAction } from 'react'

export interface FinishGameInterface {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
