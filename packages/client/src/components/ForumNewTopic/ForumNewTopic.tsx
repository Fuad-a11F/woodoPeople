import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { createTopic } from '../../api/forumApi'
import { escapeHTML, validateComment } from '../../utils/validators'

interface ForumNewTopicProps {
  onTopicCreated: (newTopic: any) => void
}

const ForumNewTopic: React.FC<ForumNewTopicProps> = ({ onTopicCreated }) => {
  const [open, setOpen] = useState(false)
  const [topicTitle, setTopicTitle] = useState('')
  const [topicDescription, setTopicDescription] = useState('')
  const [error, setError] = useState<string | null>(null)
  const token = 'test-token' // Используем реальный токен

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setTopicTitle('')
    setTopicDescription('')
    setError(null)
  }

  const handleCreateTopic = async () => {
    const trimmedTitle = topicTitle.trim()
    const trimmedDescription = topicDescription.trim()

    // Валидация заголовка и описания
    const titleValidation = validateComment(trimmedTitle)
    const descriptionValidation = validateComment(trimmedDescription)

    if (!titleValidation.isValid) {
      setError(titleValidation.error)
      return
    }

    if (!descriptionValidation.isValid) {
      setError(descriptionValidation.error)
      return
    }

    try {
      const newTopic = await createTopic(token, {
        title: escapeHTML(trimmedTitle),
        content: escapeHTML(trimmedDescription),
      })

      onTopicCreated(newTopic)
      handleClose()
    } catch (error) {
      console.error('Ошибка при создании нового топика:', error)
      setError('Не удалось создать топик. Попробуйте еще раз.')
    }
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Создать новый топик
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Создать новый топик</DialogTitle>
        <DialogContent>
          {error && (
            <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>
          )}
          <TextField
            autoFocus
            autoComplete="off"
            margin="dense"
            id="title"
            label="Название топика"
            type="text"
            fullWidth
            variant="outlined"
            value={topicTitle}
            onChange={e => {
              setTopicTitle(e.target.value)
              setError(null) // Убираем ошибку при вводе
            }}
          />
          <TextField
            autoComplete="off"
            margin="dense"
            id="description"
            label="Описание"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={topicDescription}
            onChange={e => {
              setTopicDescription(e.target.value)
              setError(null) // Убираем ошибку при вводе
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button
            onClick={handleCreateTopic}
            color="primary"
            variant="contained"
            disabled={!topicTitle.trim() || !topicDescription.trim()}>
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ForumNewTopic
