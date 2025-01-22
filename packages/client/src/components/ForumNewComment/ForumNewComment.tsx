import React, { useState } from 'react'
import { Button, Grid2, TextField, Typography } from '@mui/material'
import { escapeHTML, validateComment } from '../../utils/validators'

interface ForumNewCommentProps {
  onSubmit: (newComment: string) => void
}

const ForumNewComment: React.FC<ForumNewCommentProps> = ({ onSubmit }) => {
  const [newComment, setNewComment] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const handleCommentSubmit = () => {
    const trimmedComment = newComment.trim()
    const { isValid, error: validationError } = validateComment(trimmedComment)

    if (isValid) {
      const safeComment = escapeHTML(trimmedComment)
      onSubmit(safeComment) // Передаем экранированный комментарий
      setNewComment('')
    } else {
      setError(validationError)
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
            onChange={e => {
              setNewComment(e.target.value)
              setError(null) // Убираем ошибку при изменении текста
            }}
            error={Boolean(error)}
            helperText={error}
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
