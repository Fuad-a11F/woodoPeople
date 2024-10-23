import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ForumTopic } from '../../interfaces'

type AuthorProps = Omit<ForumTopic, 'id' | 'author' | 'title' | 'replies'>

const Author: React.FC<AuthorProps> = ({ lastMessageAuthor, lastPostDate }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        alignItems: 'center',
      }}>
      <Avatar
        alt={lastMessageAuthor.name}
        src={lastMessageAuthor.avatar}
        sx={{ width: 36, height: 36 }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          alignItems: 'left',
        }}>
        <Typography variant="caption">{lastMessageAuthor.name}</Typography>
        <Typography variant="caption">{lastPostDate}</Typography>
      </Box>
    </Box>
  )
}

export default Author
