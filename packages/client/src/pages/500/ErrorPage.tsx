import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

const ErrorPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h2" gutterBottom>
        500 - Ошибка сервера
      </Typography>
      <Typography variant="body1" gutterBottom>
        Произошла ошибка на сервере. Пожалуйста, попробуйте позже.
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate('/')}>
        Вернуться на главную
      </Button>
    </Box>
  )
}

export default ErrorPage
