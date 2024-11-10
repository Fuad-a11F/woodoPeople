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
import { toggleIsStartGame } from '../../store/reducers/gameSlice'
import { selectIsStartGame } from '../../store/selectors/gameSelectors'

const StartGame: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isOpenStart = useAppSelector(selectIsStartGame)

  const handleClose = (_: unknown, reason: string) => {
    if (reason !== 'backdropClick') {
      dispatch(toggleIsStartGame())
    }
  }

  const backToMenu = () => {
    navigate('/')
  }

  return (
    <Dialog
      open={isOpenStart}
      onClose={handleClose}
      hideBackdrop={false}
      disableEscapeKeyDown={true}>
      <Card sx={{ p: 6, background: '#572c0e', width: 320 }}>
        <DialogContent
          sx={{
            color: 'white',
          }}>
          <Box>
            <Typography mb={1} fontSize={22} fontWeight={700}>
              Are you ready to start?
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            flexDirection: 'column',
          }}>
          <Box display={'flex'} gap={5}>
            <Button
              variant="contained"
              onClick={() => handleClose(null, 'Start game')}>
              Start
            </Button>

            <Button sx={{ ml: 0 }} variant="contained" onClick={backToMenu}>
              Back to menu
            </Button>
          </Box>
        </DialogActions>
      </Card>
    </Dialog>
  )
}

export default StartGame
