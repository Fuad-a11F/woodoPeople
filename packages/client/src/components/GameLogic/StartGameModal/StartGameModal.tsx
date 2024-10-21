import React from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'

import { StartGameModalInterface } from '../../../interfaces'

// Я сделал отдельную модалку, а не стал использовать GameConfirmModal потому что планирую расширять логику внутри данного компонента. Использовать больше текста, настройки, обучалку возможно и т.д.
const StartGameModal: React.FC<StartGameModalInterface> = ({
  startGame,
  onConfirm,
  onReject,
}) => {
  return (
    <Dialog open={startGame}>
      <DialogTitle sx={{ textAlign: 'center', fontSize: 26 }}>
        Warning!
      </DialogTitle>

      <DialogContent>Are you sure you want to start play?</DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={onReject}>
          No
        </Button>
        <Button variant="contained" onClick={onConfirm}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default StartGameModal
