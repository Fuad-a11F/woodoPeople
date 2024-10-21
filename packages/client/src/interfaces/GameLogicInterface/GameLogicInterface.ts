import { Dispatch, SetStateAction } from 'react'

export interface GameConfirmModalInterface {
  openExit: boolean
  setOpenExit: Dispatch<SetStateAction<boolean>>
  onConfirm: () => void
}

export interface GameSettingGameModalInterface {
  openSetting: boolean
  setOpenSetting: Dispatch<SetStateAction<boolean>>
}

export interface StartGameModalInterface {
  startGame: boolean
  onConfirm: () => void
  onReject: () => void
}
