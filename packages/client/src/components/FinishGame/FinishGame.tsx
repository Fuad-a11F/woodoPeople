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

import { getRandomElements } from '../../modules/CanvasGameLogic/getRandomElements'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { annulPoint, toggleIsFinishGame } from '../../store/reducers/gameSlice'
import {
  selectGamePoint,
  selectIsFinishGame,
} from '../../store/selectors/gameSelectors'

import { FinishGameInterface } from '../../interfaces'

const FinishGame: React.FC<FinishGameInterface> = ({ setShapes }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const point = useAppSelector(selectGamePoint)
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
      <Card sx={{ p: 6, width: 480 }}>
        <DialogTitle sx={{ textAlign: 'center', fontSize: 26 }}>
          NO SPACE LEFT!
        </DialogTitle>

        <DialogContent>
          <Card
            sx={{ mt: 4, mb: 8, p: 4, background: 'black', color: 'white' }}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent={'space-between'}
              textAlign={'center'}
              padding={'0 20px'}>
              {/*<Box>*/}
              {/*  <Typography mb={1} fontSize={22} fontWeight={700}>*/}
              {/*    Best*/}
              {/*  </Typography>*/}

              {/*  <Typography fontSize={18}>144</Typography>*/}
              {/*</Box>*/}

              <Box>
                <Typography mb={1} fontSize={22} fontWeight={700}>
                  Score
                </Typography>

                <Typography fontSize={18}>{point}</Typography>
              </Box>
            </Stack>
          </Card>
        </DialogContent>

        <DialogActions
          sx={{
            flexDirection: 'column',
          }}>
          <Box display={'flex'} flexDirection={'row'} gap={5}>
            <Button size="large" variant="contained" onClick={resetGame}>
              Reset game
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

export default FinishGame
