import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { User } from '../../interfaces'

type AuthorProps = {
  lastMessageAuthor?: User // Сделаем это свойство необязательным
  lastPostDate?: string // Это свойство тоже может быть необязательным
}

const Author: React.FC<AuthorProps> = ({ lastMessageAuthor, lastPostDate }) => {
  // Проверяем наличие lastMessageAuthor и lastPostDate
  if (!lastMessageAuthor) {
    return (
      <Typography variant="caption" color="textSecondary">
        Автор неизвестен
      </Typography>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        alignItems: 'center',
      }}>
      <Avatar
        alt={lastMessageAuthor.name || 'Неизвестный автор'}
        src={lastMessageAuthor.avatar || '/default-avatar.jpg'}
        sx={{ width: 36, height: 36 }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          alignItems: 'flex-start',
        }}>
        <Typography variant="caption">
          {lastMessageAuthor.name || 'Неизвестный автор'}
        </Typography>
        <Typography variant="caption">
          {lastPostDate || 'Дата неизвестна'}
        </Typography>
      </Box>
    </Box>
  )
}

export default Author
