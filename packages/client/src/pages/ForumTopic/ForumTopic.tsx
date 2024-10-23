import React, { useState } from 'react'
import {
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid2,
  Divider,
  Box,
} from '@mui/material'
import { ForumComment, ForumNewComment } from '../../components'

interface User {
  name: string
  avatar: string
}

interface Comment {
  id: number
  author: User
  content: string
  date: string
}

interface Topic {
  title: string
  content: string
  author: User
  comments: Comment[]
}

const topic: Topic = {
  title: 'А как играть в эту вашу игру вообще?',
  content: 'Ничего непонятно',
  author: {
    name: 'John Doe',
    avatar: '/avatar.jpg',
  },
  comments: [
    {
      id: 1,
      author: { name: 'Jane Smith', avatar: '/avatar2.jpg' },
      content: 'Ну вот так фигурки берешь, вжух-вжух, разложил и красота',
      date: '1 час назад',
    },
    {
      id: 2,
      author: { name: 'Bob Johnson', avatar: '/avatar3.jpg' },
      content: 'Попробуй выложить из них слово «Вечность»',
      date: '2 часа назад',
    },
  ],
}

const ForumTopic: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>(topic.comments)

  const onCommentSubmit = (newComment: Comment) => {
    console.log('newComment >>>> ', newComment)
    setComments([...comments, newComment])
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: 4, marginBottom: 4 }}>
      <Card variant="outlined" sx={{ marginBottom: 4 }}>
        <CardContent>
          <Grid2 container spacing={2}>
            <Grid2>
              <Avatar src={topic.author.avatar} alt={topic.author.name} />
            </Grid2>
            <Grid2>
              <Typography variant="h5" component="h1">
                {topic.title}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {topic.author.name}
              </Typography>
            </Grid2>
          </Grid2>
          <Box mt={2}>
            <Typography variant="body1">{topic.content}</Typography>
          </Box>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>
        Комментарии
      </Typography>

      {comments.map(comment => (
        <ForumComment {...comment} />
      ))}

      <Divider sx={{ marginTop: 4, marginBottom: 2 }} />

      <ForumNewComment onSubmit={onCommentSubmit} />
    </Container>
  )
}

export default ForumTopic
