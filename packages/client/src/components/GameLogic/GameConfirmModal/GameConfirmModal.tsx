import React from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'

import { GameConfirmModalInterface } from '../../../interfaces'

const GameConfirmModal: React.FC<GameConfirmModalInterface> = ({
  openExit,
  setOpenExit,
  onConfirm,
}) => {
  return (
    <Dialog open={openExit}>
      <DialogTitle sx={{ textAlign: 'center', fontSize: 26 }}>
        Warning!
      </DialogTitle>

      <DialogContent>Are you sure you want to surrender?</DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={() => setOpenExit(false)}>
          No
        </Button>
        <Button variant="contained" onClick={onConfirm}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default GameConfirmModal
