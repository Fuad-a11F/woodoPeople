import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

function ForumNewTopic() {
  const [open, setOpen] = useState(false)
  const [topicTitle, setTopicTitle] = useState('')
  const [topicDescription, setTopicDescription] = useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCreateTopic = () => {
    // Логика создания нового топика

    handleClose()
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Создать новый топик
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Создать новый топик</DialogTitle>
        <DialogContent>
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
            onChange={e => setTopicTitle(e.target.value)}
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
            onChange={e => setTopicDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleCreateTopic}>Создать</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ForumNewTopic
