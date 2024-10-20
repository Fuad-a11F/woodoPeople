import React from 'react'
import { TextField, Button, Box, Typography, Grid2 } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import woodoku from './../../utils/data/woodoku.jpg'

interface LoginProps {
  onLogin: () => void
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onLogin()
    navigate('/')
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
          src={woodoku}
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
              required
            />
            <TextField
              fullWidth
              label="Пароль"
              margin="normal"
              type="password"
              required
            />
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
        </Box>
      </Box>
    </Box>
  )
}

export default Login
