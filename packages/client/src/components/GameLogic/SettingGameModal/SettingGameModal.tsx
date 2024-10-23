import React from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'

import { GameSettingGameModalInterface } from '../../../interfaces'

const SettingGameModal: React.FC<GameSettingGameModalInterface> = ({
  openSetting,
  setOpenSetting,
}) => {
  return (
    <Dialog open={openSetting}>
      <DialogTitle sx={{ textAlign: 'center', fontSize: 26 }}>
        Setting
      </DialogTitle>

      <DialogContent>Setting</DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={() => setOpenSetting(false)}>
          Close
        </Button>
        <Button variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default SettingGameModal
