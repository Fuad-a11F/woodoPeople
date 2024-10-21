import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import { Box, Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Registration: React.FC = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    password: '',
    phone: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Логика регистрации, пока без обращения к серверу
    console.log('Регистрация данных:', formData)
    navigate('/')
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
            label="Телефон"
            margin="normal"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
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
