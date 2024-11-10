import React, { FC, useEffect, useRef } from 'react'
import Box from '@mui/material/Box'

import { useAppDispatch } from '../../store/hooks'
import { setPoint, toggleIsFinishGame } from '../../store/reducers/gameSlice'

import { canvasWidth, gridSize, tileSize } from './consts'

import { drawGrid, renderShapes } from './canvasUtils'
import {
  handleMouseDown,
  handleMouseLeave,
  handleMouseMove,
  handleMouseUp,
} from './events'

import { CanvasGameLogicInterface } from '../../interfaces'

const CanvasGameLogic: FC<CanvasGameLogicInterface> = ({
  shapes,
  setShapes,
}) => {
  const dispatch = useAppDispatch()

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const setOpen = () => {
    dispatch(toggleIsFinishGame())
  }
  const setPointGame = (point: number) => {
    dispatch(setPoint(point))
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvasWidth
    canvas.height = tileSize * gridSize

    drawGrid(ctx, canvas)
    renderShapes(ctx, shapes)
  }, [shapes])

  return (
    <Box display={'flex'} justifyContent="center" margin={'26px 0 0 0'}>
      <canvas
        ref={canvasRef}
        style={{ border: '1px solid black' }}
        onMouseDown={e => handleMouseDown(e, shapes)}
        onMouseUp={() =>
          handleMouseUp(shapes, canvasRef, setOpen, setShapes, setPointGame)
        }
        onMouseLeave={() => handleMouseLeave(shapes, canvasRef)}
        onMouseMove={e => handleMouseMove(e, shapes, canvasRef)}
      />
    </Box>
  )
}

export default CanvasGameLogic
