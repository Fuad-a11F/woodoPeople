import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Divider,
  Stack,
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material'

import woodoku from './assets/unnamed.png'

const Main: React.FC = () => {
  const navigate = useNavigate()

  const gamePage = () => {
    navigate('/game')
  }

  return (
    <Container>
      <Stack direction="row" spacing={6} mt={10} alignItems="flex-start">
        <Box>
          <img
            src={woodoku}
            alt=" Woodoku"
            style={{ height: '100%', maxWidth: '430px' }}
          />
        </Box>

        <Box>
          <Box>
            <Typography
              variant="h6"
              component="h1"
              sx={{
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                fontSize: 62,
                letterSpacing: '.5rem',
              }}>
              WOODOKU
              <Typography
                variant="overline"
                component="span"
                sx={{
                  fontWeight: 700,
                  fontSize: 22,
                }}>
                TM
              </Typography>
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              Woodoku is a free mobile puzzle video game that can be played with
              both blocks and grids. This unusual puzzle app developed by
              Tripledot Studios Limited is essentially a wooden block game
              combined with a Sudoku grid, as its unique name suggests.
            </Typography>

            <Box mt={4} display={'flex'} flexDirection={'column'} gap={2}>
              <p>
                <strong>Total players:</strong> 4
              </p>
              <p>
                <strong>Game rating:</strong> 4.4
              </p>
              <p>
                <strong>Last score:</strong> 155
              </p>
            </Box>
          </Box>

          <Button
            size={'large'}
            variant={'contained'}
            sx={{ mt: 10, width: 260 }}
            onClick={gamePage}>
            Play game
          </Button>
        </Box>
      </Stack>

      <Divider sx={{ mt: 4 }} />
    </Container>
  )
}

export default Main
