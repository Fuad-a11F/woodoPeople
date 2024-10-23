import React, { useState } from 'react'
import { Container, Typography, Divider } from '@mui/material'
import { ForumPost, ForumComment, ForumNewComment } from '../../components'
import { Comment, Topic } from '../../interfaces'

const topic: Topic = {
  id: 1,
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
  lastPostDate: '2024-10-01',
  lastMessageAuthor: { name: 'John Doe', avatar: '' },
}

const ForumTopic: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>(topic.comments)

  const onCommentSubmit = (newComment: Comment) => {
    setComments([...comments, newComment])
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: 4, marginBottom: 4 }}>
      <ForumPost {...topic} />

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
