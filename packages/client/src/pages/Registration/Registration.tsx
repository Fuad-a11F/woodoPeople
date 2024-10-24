import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import { Box, Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../../api/api'
import { SignUpRequest } from '../../api/types'

const Registration: React.FC = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleRepeatPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatPassword(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (formData.password !== repeatPassword) {
      setError('Пароли не совпадают')
      return
    }

    try {
      const response = await signUp(formData)
      if (response.reason) {
        setError(response.reason)
      } else {
        navigate('/')
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(
          err.message || 'Ошибка при регистрации. Пожалуйста, попробуйте снова.'
        )
      } else {
        setError('Неизвестная ошибка. Пожалуйста, попробуйте снова.')
      }
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
            margin="normal"
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Фамилия"
            margin="normal"
            type="text"
            name="second_name"
            value={formData.second_name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Логин"
            margin="normal"
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Пароль"
            margin="normal"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Повторите пароль"
            margin="normal"
            type="password"
            value={repeatPassword}
            onChange={handleRepeatPasswordChange}
            required
          />
          <TextField
            fullWidth
            label="Телефон"
            margin="normal"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
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
