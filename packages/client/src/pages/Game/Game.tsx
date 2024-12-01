import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/material'

import { FinishGame } from '../../components/FinishGame'
import { GamePoint } from '../../components/GamePoint'
import { StartGame } from '../../components'

import { CanvasGameLogic } from '../../modules'
import { getRandomElements } from '../../modules/CanvasGameLogic/getRandomElements'

import { useAppDispatch } from '../../store/hooks'

import { annulPoint, isStartGameTrue } from '../../store/reducers/gameSlice'

import { Shape } from '../../interfaces'

const Game: React.FC = () => {
  const dispatch = useAppDispatch()

  const [shapes, setShapes] = useState<Shape[]>([...getRandomElements()])

  useEffect(() => {
    return () => {
      dispatch(isStartGameTrue())
      dispatch(annulPoint())
    }
  }, [])

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
