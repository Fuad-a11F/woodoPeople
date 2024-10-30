import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

const NotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h2" gutterBottom>
        Страница не найдена
      </Typography>
      <Typography variant="body1" gutterBottom>
        К сожалению, запрашиваемая вами страница не существует.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Вернуться на главную
      </Button>
    </Box>
  )
}

export default NotFound
