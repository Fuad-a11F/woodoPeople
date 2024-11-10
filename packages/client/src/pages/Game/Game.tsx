import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/material'

import { FinishGame } from '../../components/FinishGame'
import { GamePoint } from '../../components/GamePoint'

import { CanvasGameLogic } from '../../modules'

const Game: React.FC = () => {
  const [point, setPoint] = useState(0)
  const [open, setOpen] = useState(false)

  return (
    <Typography variant="h2" gutterBottom>
      <Container maxWidth={'md'}>
        <GamePoint point={point} />

        <CanvasGameLogic setPoint={setPoint} setOpen={setOpen} />
      </Container>

      <FinishGame open={open} setOpen={setOpen} />
    </Typography>
  )
}

export default Game
