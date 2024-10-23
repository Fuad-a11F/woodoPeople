import React from 'react'
import { Grid2, Box, Typography } from '@mui/material'
import { ForumItem, ForumNewTopic } from '../../components'
import { ForumTopic } from '../../interfaces'

const topics: ForumTopic[] = [
  {
    id: 1,
    title: 'How to learn React?',
    author: { name: 'John Doe', avatar: '' },
    replies: 10,
    lastPostDate: '2024-10-01',
    lastMessageAuthor: { name: 'John Doe', avatar: '' },
  },
  {
    id: 2,
    title: 'What is TypeScript?',
    author: { name: 'Jane Smith', avatar: '' },
    replies: 5,
    lastPostDate: '2024-09-28',
    lastMessageAuthor: { name: 'Alice Johnson', avatar: '' },
  },
  {
    id: 3,
    title: 'Best practices for Material-UI',
    author: { name: 'Alice Johnson', avatar: '' },
    replies: 12,
    lastPostDate: '2024-09-30',
    lastMessageAuthor: { name: 'Jane Smith', avatar: '' },
  },
]

const Forum: React.FC = () => {
  return (
    <Box sx={{ mt: 2, p: 3 }}>
      <Grid2 container justifyContent="space-between" alignItems="center">
        <Typography variant="h3" gutterBottom>
          Forum
        </Typography>
        <ForumNewTopic />
      </Grid2>
      <Grid2 container spacing={1}>
        {topics.map(topic => (
          <Grid2 size={{ xs: 12 }} key={topic.id}>
            <ForumItem {...topic} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  )
}

export default Forum
