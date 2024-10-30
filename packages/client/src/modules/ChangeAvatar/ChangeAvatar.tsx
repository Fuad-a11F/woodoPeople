import React, { useState, useRef } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import { saveAvatar } from '../../api/api'

interface ChangeAvatarProps {
  onAvatarSave: (avatar: string) => void
}

const ChangeAvatar: React.FC<ChangeAvatarProps> = ({ onAvatarSave }) => {
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false)
  const [avatar, setAvatar] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFileName(file.name)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAvatarSave = async () => {
    const formData = new FormData()
    if (avatar) {
      formData.append('avatar', avatar)
      try {
        const response = await saveAvatar(formData)
        if (response.reason) {
          setError(response.reason)
        }
        if (response.avatar) {
          onAvatarSave(response.avatar)
          handleDialogClose()
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(
            err.message || 'Ошибка загрузки. Пожалуйста, попробуйте снова.'
          )
        } else {
          setError('Неизвестная ошибка. Пожалуйста, попробуйте снова.')
        }
      }
    }
  }

  const handleClickUploadButton = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleDialogClose = () => {
    setIsAvatarDialogOpen(false)
    setSelectedFileName(null)
  }

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setIsAvatarDialogOpen(true)}
        sx={{ mt: 2 }}>
        Изменить аватар
      </Button>
      <Dialog
        open={isAvatarDialogOpen}
        onClose={() => setIsAvatarDialogOpen(false)}>
        <DialogTitle>Изменить аватар</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <input
            accept="image/*"
            type="file"
            onChange={handleAvatarUpload}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          <Button
            variant="contained"
            onClick={handleClickUploadButton}
            sx={{ mt: 2 }}>
            Выберите файл
          </Button>
          {selectedFileName && (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Выбран файл: {selectedFileName}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}
          <Button onClick={handleDialogClose} color="primary">
            Отмена
          </Button>
          <Button onClick={handleAvatarSave} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ChangeAvatar
