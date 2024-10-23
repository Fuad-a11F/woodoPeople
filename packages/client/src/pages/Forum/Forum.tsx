import React from 'react'
import { Grid2, Box } from '@mui/material'
import { ForumItem } from '../../components'
import Typography from '@mui/material/Typography'

type ForumTopic = {
  id: number
  title: string
  author: string
  replies: number
  lastPostDate: string
  lastMessageAuthor: {
    name: string
    avatar: string
  }
}

const topics: ForumTopic[] = [
  {
    id: 1,
    title: 'How to learn React?',
    author: 'John Doe',
    replies: 10,
    lastPostDate: '2024-10-01',
    lastMessageAuthor: { name: 'John Doe', avatar: '' },
  },
  {
    id: 2,
    title: 'What is TypeScript?',
    author: 'Jane Smith',
    replies: 5,
    lastPostDate: '2024-09-28',
    lastMessageAuthor: { name: 'Alice Johnson', avatar: '' },
  },
  {
    id: 3,
    title: 'Best practices for Material-UI',
    author: 'Alice Johnson',
    replies: 12,
    lastPostDate: '2024-09-30',
    lastMessageAuthor: { name: 'Jane Smith', avatar: '' },
  },
]

const Forum: React.FC = () => {
  return (
    <Box sx={{ mt: 2, p: 3 }}>
      <Typography variant="h3" gutterBottom>
        Forum
      </Typography>
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
