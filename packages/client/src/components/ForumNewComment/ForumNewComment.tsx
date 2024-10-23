import React, { useState } from 'react'
import { Button, Grid2, TextField, Typography } from '@mui/material'
import { getDate } from '../../utils'

import { Comment } from '../../interfaces'

interface ForumNewCommentProps {
  onSubmit: (newComment: Comment) => void
}

const ForumNewComment: React.FC<ForumNewCommentProps> = ({ onSubmit }) => {
  const [newComment, setNewComment] = useState<string>('')

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const newCommentObject: Comment = {
        id: Date.now(),
        author: {
          name: 'Текущий пользователь', // заменить на актуальное имя пользователя, когда оно появится
          avatar: '/avatar.jpg',
        },
        content: newComment,
        date: getDate(),
      }

      onSubmit(newCommentObject)
      setNewComment('') // Очищаем поле после добавления комментария
    }
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Добавить комментарий
      </Typography>
      <Grid2 container spacing={2} alignItems="center">
        <Grid2 size={{ xs: 12 }}>
          <TextField
            autoComplete="off"
            fullWidth
            label="Ваш комментарий"
            variant="outlined"
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCommentSubmit}
            disabled={!newComment.trim()}>
            Отправить
          </Button>
        </Grid2>
      </Grid2>
    </>
  )
}

export default ForumNewComment
