import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import {
  validatePassword,
  validateRepeatPassword,
} from '../../utils/validators'
import { changePasswordRequest } from '../../api/types'
import { IChangePasswordError } from './types'
import { saveUserPassword } from '../../api/api'
import Typography from '@mui/material/Typography'

const ChangePassword: React.FC = () => {
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<IChangePasswordError>({
    newPassword: '',
    repeatPassword: '',
  })

  const [formData, setFormData] = useState<changePasswordRequest>({
    oldPassword: '',
    newPassword: '',
    repeatPassword: '',
  })

  const [error, setError] = useState<string | null>(null)

  const handleBlur = (field: string, value: string) => {
    let error: string | null = null
    switch (field) {
      case 'newPassword':
        error = validatePassword(value)
        break
      case 'repeatPassword':
        error = validateRepeatPassword(formData.newPassword, value)
        break
    }
    setFieldErrors(prevErrors => ({ ...prevErrors, [field]: error }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const validationErrors: any = {}
    validationErrors.newPassword = validatePassword(formData.newPassword)
    validationErrors.repeatPassword = validateRepeatPassword(
      formData.newPassword,
      formData.repeatPassword
    )
    setFieldErrors(validationErrors)

    const hasErrors = Object.values(validationErrors).some(
      error => error !== null
    )
    if (hasErrors) {
      setError('Пожалуйста, исправьте ошибки и повторите попытку')
      return
    }

    try {
      const response = await saveUserPassword(formData)

      if (response && response.reason) {
        setError(response.reason)
      } else {
        setIsPasswordDialogOpen(false)
      }
    } catch (err) {
      setError('Ошибка при регистрации. Пожалуйста, попробуйте снова.')
    }
  }

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setIsPasswordDialogOpen(true)}
        sx={{ mt: 2, ml: 2 }}>
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
            value={formData.oldPassword}
            onChange={e =>
              setFormData({ ...formData, oldPassword: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Новый пароль"
            type="password"
            fullWidth
            variant="outlined"
            value={formData.newPassword}
            onChange={e =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
            onBlur={e => handleBlur('newPassword', e.target.value)}
            helperText={fieldErrors.newPassword}
            error={Boolean(fieldErrors.newPassword)}
          />
          <TextField
            margin="dense"
            label="Подтвердите новый пароль"
            type="password"
            fullWidth
            variant="outlined"
            value={formData.repeatPassword}
            onChange={e =>
              setFormData({ ...formData, repeatPassword: e.target.value })
            }
            onBlur={e => handleBlur('repeatPassword', e.target.value)}
            helperText={fieldErrors.repeatPassword}
            error={Boolean(fieldErrors.repeatPassword)}
          />
        </DialogContent>
        <DialogActions>
          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}
          <Button
            onClick={() => setIsPasswordDialogOpen(false)}
            color="primary">
            Отмена
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ChangePassword
