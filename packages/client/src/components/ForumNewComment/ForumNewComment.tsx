import React, { useState } from 'react'
import { Button, Grid2, TextField, Typography } from '@mui/material'

interface ForumNewCommentProps {
  onSubmit: (newComment: string) => void // Изменено: передаём только строку
}

const ForumNewComment: React.FC<ForumNewCommentProps> = ({ onSubmit }) => {
  const [newComment, setNewComment] = useState<string>('')

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      onSubmit(newComment.trim()) // Передаём только строку
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
