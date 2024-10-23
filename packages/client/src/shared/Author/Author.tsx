import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

type AuthorType = {
  name: string
  avatar: string
}

interface AuthorProps {
  author: AuthorType
  date: string
}
const Author: React.FC<AuthorProps> = ({ author, date }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        alignItems: 'center',
      }}>
      <Avatar
        alt={author.name}
        src={author.avatar}
        sx={{ width: 36, height: 36 }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          alignItems: 'left',
        }}>
        <Typography variant="caption">{author.name}</Typography>
        <Typography variant="caption">{date}</Typography>
      </Box>
    </Box>
  )
}

export default Author
