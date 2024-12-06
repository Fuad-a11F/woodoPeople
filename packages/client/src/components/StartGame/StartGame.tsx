import React from 'react'
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectIsStartGame } from '../../store/selectors/gameSelectors'
import { isStartGameFalse } from '../../store/reducers/gameSlice'

const StartGame: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isOpenStart = useAppSelector(selectIsStartGame)

  const handleClose = (_: unknown, reason: string) => {
    if (reason !== 'backdropClick') {
      dispatch(isStartGameFalse())
    }
  }

  const backToMenu = () => {
    navigate('/main')
  }

  return (
    <Dialog
      open={isOpenStart}
      onClose={handleClose}
      hideBackdrop={false}
      disableEscapeKeyDown={true}>
      <Card sx={{ p: 6, width: 480 }}>
        <DialogContent>
          <Box>
            <Typography mb={1} variant="body1">
              Размещайте фигуры на игровом поле. Когда вся строка или столбец
              заполняются фигурами, они исчезают, освобождая место для новых
              фигур. Игра продолжается, пока на поле не останется места для
              размещения новых фигур.
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            flexDirection: 'column',
          }}>
          <Box display={'flex'} gap={10}>
            <Button
              size="large"
              variant="contained"
              onClick={() => handleClose(null, 'Start game')}>
              Start
            </Button>

            <Button
              size="large"
              sx={{ ml: 0 }}
              variant="outlined"
              onClick={backToMenu}>
              Back to menu
            </Button>
          </Box>
        </DialogActions>
      </Card>
    </Dialog>
  )
}

export default StartGame
