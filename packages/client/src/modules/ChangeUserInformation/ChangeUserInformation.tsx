import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'

import { ChangeUserInformationRequest } from '../../api/types'
import {
  validateEmail,
  validateFirstName,
  validatePhone,
  validateSecondName,
} from '../../utils/validators'
import { ChangeInformationProps, IChangeInformationError } from './types'
import { saveUserData } from '../../api/api'
import Typography from '@mui/material/Typography'

const ChangeUserInformation: React.FC<ChangeInformationProps> = ({
  first_name,
  second_name,
  email,
  phone,
  onUserInformationSave,
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const [formData, setFormData] = useState<ChangeUserInformationRequest>({
    first_name: first_name,
    second_name: second_name,
    email: email,
    phone: phone,
  })

  const [error, setError] = useState<string | null>(null)

  const [fieldErrors, setFieldErrors] = useState<IChangeInformationError>({
    first_name: '',
    second_name: '',
    email: '',
    phone: '',
  })

  const handleBlur = (field: string, value: string) => {
    let error: string | null = null
    switch (field) {
      case 'first_name':
        error = validateFirstName(value)
        break
      case 'second_name':
        error = validateSecondName(value)
        break
      case 'email':
        error = validateEmail(value)
        break
      case 'phone':
        error = validatePhone(value)
        break
    }
    setFieldErrors(prevErrors => ({ ...prevErrors, [field]: error }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const validationErrors: any = {}
    validationErrors.first_name = validateFirstName(formData.first_name)
    validationErrors.second_name = validateSecondName(formData.second_name)
    validationErrors.email = validateEmail(formData.email)
    validationErrors.phone = validatePhone(formData.phone)
    setFieldErrors(validationErrors)

    const hasErrors = Object.values(validationErrors).some(
      error => error !== null
    )
    if (hasErrors) {
      setError('Пожалуйста, исправьте ошибки и повторите попытку')
      return
    }

    try {
      const response = await saveUserData(formData)

      if (response && response.reason) {
        setError(response.reason)
      } else {
        setIsEditDialogOpen(false)
        onUserInformationSave(response)
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
            value={formData.first_name}
            onChange={e =>
              setFormData({ ...formData, first_name: e.target.value })
            }
            onBlur={e => handleBlur('newPassword', e.target.value)}
            helperText={fieldErrors.first_name}
            error={Boolean(fieldErrors.first_name)}
          />
          <TextField
            label="Фамилия"
            variant="outlined"
            fullWidth
            margin="dense"
            value={formData.second_name}
            onChange={e =>
              setFormData({ ...formData, second_name: e.target.value })
            }
            onBlur={e => handleBlur('newPassword', e.target.value)}
            helperText={fieldErrors.second_name}
            error={Boolean(fieldErrors.second_name)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="dense"
            type="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            onBlur={e => handleBlur('email', e.target.value)}
            helperText={fieldErrors.email}
            error={Boolean(fieldErrors.email)}
          />
          <TextField
            label="Телефон"
            variant="outlined"
            fullWidth
            margin="dense"
            type="tel"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            onBlur={e => handleBlur('phone', e.target.value)}
            helperText={fieldErrors.phone}
            error={Boolean(fieldErrors.phone)}
          />
        </DialogContent>
        <DialogActions>
          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}
          <Button onClick={() => setIsEditDialogOpen(false)} color="primary">
            Отмена
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ChangeUserInformation
