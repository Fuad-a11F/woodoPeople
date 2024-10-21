import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Button,
  Box,
  Typography,
} from '@mui/material'

const FinishGameModal: React.FC = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleClose = (_: unknown, reason: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false)
    }
  }

  const backToMenu = () => {
    setOpen(false)
    navigate('/')
  }

  return (
    <Dialog
      open={open}
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
            <Button variant="contained">Reset game</Button>
            <Button sx={{ ml: 0 }} variant="contained" onClick={backToMenu}>
              Back to menu
            </Button>
          </Box>
        </DialogActions>
      </Card>
    </Dialog>
  )
}

export default FinishGameModal
