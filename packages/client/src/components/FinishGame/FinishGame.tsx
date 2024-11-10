import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material'

import { getRandomElements } from '../../modules/CanvasGameLogic/mockDate'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { annulPoint, toggleIsFinishGame } from '../../store/reducers/gameSlice'
import { selectIsFinishGame } from '../../store/selectors/gameSelectors'

import { FinishGameInterface } from '../../interfaces'

const FinishGame: React.FC<FinishGameInterface> = ({ setShapes }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isOpenFinish = useAppSelector(selectIsFinishGame)

  const handleClose = (_: unknown, reason: string) => {
    if (reason !== 'backdropClick') {
      dispatch(toggleIsFinishGame())
    }
  }

  const backToMenu = () => {
    dispatch(toggleIsFinishGame())
    navigate('/')
  }

  const resetGame = () => {
    dispatch(annulPoint())
    setShapes(getRandomElements())
    handleClose(null, 'Reset game')
  }

  return (
    <Dialog
      open={isOpenFinish}
      onClose={handleClose}
      hideBackdrop={false}
      disableEscapeKeyDown={true}>
      <Card sx={{ p: 6, background: '#572c0e', width: 320 }}>
        <DialogTitle sx={{ textAlign: 'center', color: 'white', fontSize: 26 }}>
          NO SPACE LEFT!
        </DialogTitle>

        <DialogContent>
          <Card
            sx={{ mt: 4, mb: 8, p: 4, background: '#924d1b', color: 'white' }}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent={'space-between'}
              padding={'0 20px'}>
              <Box>
                <Typography mb={1} fontSize={22} fontWeight={700}>
                  Best
                </Typography>

                <Typography fontSize={18}>144</Typography>
              </Box>

              <Box>
                <Typography mb={1} fontSize={22} fontWeight={700}>
                  Score
                </Typography>

                <Typography fontSize={18}>144</Typography>
              </Box>
            </Stack>
          </Card>
        </DialogContent>

        <DialogActions
          sx={{
            flexDirection: 'column',
          }}>
          <Box display={'flex'} flexDirection={'column'} gap={5}>
            <Button variant="contained" onClick={resetGame}>
              Reset game
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

export default FinishGame
