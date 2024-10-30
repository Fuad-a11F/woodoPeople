import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'

import { UserResponse } from '../../api/types'

const ChangeUserInformation: React.FC<UserResponse> = ({
  first_name,
  second_name,
  email,
  phone,
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const [editFirstName, setEditFirstName] = useState(first_name)
  const [editLastName, setEditLastName] = useState(second_name)
  const [editEmail, setEditEmail] = useState(email)
  const [editPhone, setEditPhone] = useState(phone)

  const handleEditSave = () => {
    setIsEditDialogOpen(false)
  }

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setIsEditDialogOpen(true)}
        sx={{ mt: 2 }}>
        Изменить информацию
      </Button>
      <Dialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}>
        <DialogTitle>Редактировать информацию о пользователе</DialogTitle>
        <DialogContent>
          <TextField
            label="Имя"
            variant="outlined"
            fullWidth
            margin="dense"
            value={editFirstName}
            onChange={e => setEditFirstName(e.target.value)}
          />
          <TextField
            label="Фамилия"
            variant="outlined"
            fullWidth
            margin="dense"
            value={editLastName}
            onChange={e => setEditLastName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="dense"
            type="email"
            value={editEmail}
            onChange={e => setEditEmail(e.target.value)}
          />
          <TextField
            label="Телефон"
            variant="outlined"
            fullWidth
            margin="dense"
            type="tel"
            value={editPhone}
            onChange={e => setEditPhone(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)} color="primary">
            Отмена
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ChangeUserInformation
