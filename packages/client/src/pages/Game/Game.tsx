import React, { useEffect, useRef, useState } from 'react'
import Typography from '@mui/material/Typography'
import { Button, Container } from '@mui/material'
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
  const gameContainerRef = useRef<HTMLDivElement | null>(null)

  const [shapes, setShapes] = useState<Shape[]>([...getRandomElements()])
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    return () => {
      dispatch(isStartGameTrue())
      dispatch(annulPoint())
    }
  }, [])

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      gameContainerRef.current?.requestFullscreen?.()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  return (
    <div ref={gameContainerRef} style={{ width: '100%', height: '100%' }}>
      <Typography variant="h2" gutterBottom>
        <Container maxWidth={'md'}>
          <GamePoint />
          <CanvasGameLogic shapes={shapes} setShapes={setShapes} />
        </Container>
        <FinishGame setShapes={setShapes} />
        <StartGame />
        <Button
          variant="contained"
          color="primary"
          onClick={toggleFullscreen}
          style={{ marginTop: '20px' }}>
          {isFullscreen ? 'Выйти из полноэкранного режима' : 'На весь экран'}
        </Button>
      </Typography>
    </div>
  )
}

export default Game
