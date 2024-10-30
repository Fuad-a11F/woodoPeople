import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'

const ChangePassword: React.FC = () => {
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setIsPasswordDialogOpen(true)}
        sx={{ mt: 2 }}>
        Изменить пароль
      </Button>
      <Dialog
        open={isPasswordDialogOpen}
        onClose={() => setIsPasswordDialogOpen(false)}>
        <DialogTitle>Изменить пароль</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Старый пароль"
            type="password"
            fullWidth
            variant="outlined"
            value=""
          />
          <TextField
            margin="dense"
            label="Новый пароль"
            type="password"
            fullWidth
            variant="outlined"
            value=""
          />
          <TextField
            margin="dense"
            label="Подтвердите новый пароль"
            type="password"
            fullWidth
            variant="outlined"
            value=""
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsPasswordDialogOpen(false)}
            color="primary">
            Отмена
          </Button>
          <Button color="primary">Сохранить</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ChangePassword
