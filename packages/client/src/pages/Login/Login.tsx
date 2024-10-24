import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Box, Typography } from '@mui/material'
import { LoginProps } from './types'
import { SignInRequest } from '../../api/types'
import { signIn } from '../../api/api'

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate()
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)

    try {
      const data: SignInRequest = { login, password }
      const response = await signIn(data)

      if (typeof response === 'object' && response.reason) {
        setError(response.reason)
      } else {
        onLogin()
        navigate('/')
      }
    } catch (err) {
      console.log('🚀 ~ handleSubmit ~ err:', err)
      setError('Ошибка авторизации. Проверьте логин и пароль.')
    }
  }

  const handleRegistrationClick = () => {
    navigate('/registration')
  }

  return (
    <Box display="flex" height="100vh">
      <Box
        flex={1}
        bgcolor="#f5f5f5"
        display="flex"
        justifyContent="center"
        alignItems="center">
        <img
          src="/woodoku.jpg"
          alt="Login Illustration"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </Box>
      <Box flex={1} display="flex" justifyContent="center" alignItems="center">
        <Box width="80%" maxWidth="400px">
          <Typography variant="h4" component="h1" gutterBottom>
            Авторизация
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Логин"
              margin="normal"
              type="text"
              value={login}
              onChange={e => setLogin(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Пароль"
              margin="normal"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {error && (
              <Typography color="error" variant="body2" gutterBottom>
                {error}
              </Typography>
            )}
            <Box mt={2}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit">
                Войти
              </Button>
            </Box>
          </form>
          <Box mt={2} textAlign="center">
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleRegistrationClick}>
              Регистрация
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
