import React, { FC, useEffect, useRef } from 'react'
import Box from '@mui/material/Box'

import { selectGamePoint } from '../../store/selectors/gameSelectors'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setPoint, toggleIsFinishGame } from '../../store/reducers/gameSlice'
import { getUserData } from '../../api/api'
import { saveLeaderboard } from '../../api/leaderboardApi'

import { canvasWidth, gridSize, tileSize } from './consts'

import { drawGrid, renderShapes } from './canvasUtils'
import {
  handleMouseDown,
  handleMouseLeave,
  handleMouseMove,
  handleMouseUp,
} from './events'
import { isThereSpaceForNewShape } from './utils/utils'

import { CanvasGameLogicInterface } from '../../interfaces'

const CanvasGameLogic: FC<CanvasGameLogicInterface> = ({
  shapes,
  setShapes,
}) => {
  const dispatch = useAppDispatch()
  const point = useAppSelector(selectGamePoint)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const setOpen = () => {
    dispatch(toggleIsFinishGame())
  }
  const setPointGame = (point: number) => {
    dispatch(setPoint(point))
  }

  const handlerMouseUp = async () => {
    handleMouseUp(shapes, canvasRef, setShapes, setPointGame)

    if (!isThereSpaceForNewShape(shapes)) {
      const data = await getUserData()

      await saveLeaderboard({
        data: {
          name: data.first_name,
          WoodoPeopleTeam: point,
        },
        ratingFieldName: 'WoodoPeopleTeam',
        teamName: 'WoodoPeopleTeam',
      })

      setOpen()
    }
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
        onMouseDown={e => handleMouseDown(e, shapes)}
        onMouseUp={handlerMouseUp}
        onMouseLeave={() => handleMouseLeave(shapes, canvasRef)}
        onMouseMove={e => handleMouseMove(e, shapes, canvasRef)}
      />
    </Box>
  )
}

export default CanvasGameLogic
