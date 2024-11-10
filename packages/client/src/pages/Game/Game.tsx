import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/material'

import { FinishGame } from '../../components/FinishGame'
import { GamePoint } from '../../components/GamePoint'
import { StartGame } from '../../components'

import { CanvasGameLogic } from '../../modules'

import { Shape } from '../../interfaces'
import { getRandomElements } from '../../modules/CanvasGameLogic/getRandomElements'

const Game: React.FC = () => {
  const [shapes, setShapes] = useState<Shape[]>([...getRandomElements()])

  return (
    <Typography variant="h2" gutterBottom>
      <Container maxWidth={'md'}>
        <GamePoint />

        <CanvasGameLogic shapes={shapes} setShapes={setShapes} />
      </Container>

      <FinishGame setShapes={setShapes} />

      <StartGame />
    </Typography>
  )
}

export default Game
