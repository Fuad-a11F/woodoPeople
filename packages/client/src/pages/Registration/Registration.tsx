import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import { Box, Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../../api/api'
import { SignUpRequest } from '../../api/types'
import {
  validateEmail,
  validateFirstName,
  validateLogin,
  validatePassword,
  validatePhone,
  validateRepeatPassword,
  validateSecondName,
} from '../../utils/validators'
import { IRegisterError, RegistrationProps } from './types'

const Registration: React.FC<RegistrationProps> = ({ onRegister }) => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<SignUpRequest>({
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    password: '',
    phone: '',
  })

  const [repeatPassword, setRepeatPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<IRegisterError>({
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    password: '',
    repeatPassword: '',
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
      case 'login':
        error = validateLogin(value)
        break
      case 'email':
        error = validateEmail(value)
        break
      case 'password':
        error = validatePassword(value)
        break
      case 'phone':
        error = validatePhone(value)
        break
      case 'repeatPassword':
        error = validateRepeatPassword(formData.password, value)
        break
    }
    setFieldErrors(prevErrors => ({ ...prevErrors, [field]: error }))
  }

  const handleRepeatPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
    setRepeatPassword(value)
    setFieldErrors(prevErrors => ({
      ...prevErrors,
      repeatPassword: validateRepeatPassword(formData.password, value),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const validationErrors: any = {}
    validationErrors.first_name = validateFirstName(formData.first_name)
    validationErrors.second_name = validateSecondName(formData.second_name)
    validationErrors.login = validateLogin(formData.login)
    validationErrors.email = validateEmail(formData.email)
    validationErrors.password = validatePassword(formData.password)
    validationErrors.phone = validatePhone(formData.phone)
    validationErrors.repeatPassword = validateRepeatPassword(
      formData.password,
      repeatPassword
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
      const response = await signUp(formData)

      if (response && response.reason) {
        setError(response.reason)
      } else {
        onRegister()
        navigate('/')
      }
    } catch (err) {
      setError('Ошибка при регистрации. Пожалуйста, попробуйте снова.')
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh">
      <Box width="80%" maxWidth="400px">
        <Typography variant="h4" component="h1" gutterBottom>
          Регистрация
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Имя"
            name="first_name"
            value={formData.first_name}
            onChange={e =>
              setFormData({ ...formData, first_name: e.target.value })
            }
            onBlur={e => handleBlur('first_name', e.target.value)}
            helperText={fieldErrors.first_name}
            error={Boolean(fieldErrors.first_name)}
            required
          />
          <TextField
            fullWidth
            label="Фамилия"
            name="second_name"
            value={formData.second_name}
            onChange={e =>
              setFormData({ ...formData, second_name: e.target.value })
            }
            onBlur={e => handleBlur('second_name', e.target.value)}
            helperText={fieldErrors.second_name}
            error={Boolean(fieldErrors.second_name)}
            required
          />
          <TextField
            fullWidth
            label="Логин"
            name="login"
            value={formData.login}
            onChange={e => setFormData({ ...formData, login: e.target.value })}
            onBlur={e => handleBlur('login', e.target.value)}
            helperText={fieldErrors.login}
            error={Boolean(fieldErrors.login)}
            required
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            type="email"
            name="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            onBlur={e => handleBlur('email', e.target.value)}
            helperText={fieldErrors.email}
            error={Boolean(fieldErrors.email)}
            required
          />
          <TextField
            fullWidth
            label="Пароль"
            margin="normal"
            type="password"
            name="password"
            value={formData.password}
            onChange={e =>
              setFormData({ ...formData, password: e.target.value })
            }
            onBlur={e => handleBlur('password', e.target.value)}
            helperText={fieldErrors.password}
            error={Boolean(fieldErrors.password)}
            required
          />
          <TextField
            fullWidth
            label="Повторите пароль"
            value={repeatPassword}
            onChange={handleRepeatPasswordChange}
            onBlur={e => handleBlur('repeatPassword', e.target.value)}
            helperText={fieldErrors.repeatPassword}
            error={Boolean(fieldErrors.repeatPassword)}
            required
          />
          <TextField
            fullWidth
            label="Телефон"
            margin="normal"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            onBlur={e => handleBlur('phone', e.target.value)}
            helperText={fieldErrors.phone}
            error={Boolean(fieldErrors.phone)}
            required
          />
          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}
          <Box mt={2}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Зарегистрироваться
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Registration
