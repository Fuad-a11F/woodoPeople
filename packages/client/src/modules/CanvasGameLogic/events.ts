import React, { Dispatch, MutableRefObject, SetStateAction } from 'react'

import { drawGrid, renderShapes } from './canvasUtils'
import {
  areShapesInPanel,
  isShapeCollidingWithOtherShapes,
  isShapeInsidePlayArea,
  isThereSpaceForNewShape,
  removeIfPartFull,
} from './utils'

import { getRandomElements } from './mockDate'
import { gridSize, tileSize } from './consts'

import { Shape } from '../../interfaces'

let offsetX = 0
let offsetY = 0

let selectedShape: Shape | null | undefined = null

export const handleMouseDown = (
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  shapes: Shape[]
) => {
  const mouseX = event.nativeEvent.offsetX
  const mouseY = event.nativeEvent.offsetY

  selectedShape = shapes.find(shape =>
    shape.blocks.some(block => {
      const blockX = (shape.x + block.x) * tileSize
      const blockY = (shape.y + block.y) * tileSize
      return (
        mouseX >= blockX &&
        mouseX < blockX + tileSize &&
        mouseY >= blockY &&
        mouseY < blockY + tileSize
      )
    })
  )

  if (selectedShape && selectedShape.x >= 9) {
    selectedShape.isDragging = true
    selectedShape.initialX = selectedShape.x
    selectedShape.initialY = selectedShape.y
    offsetX = mouseX - selectedShape.x * tileSize
    offsetY = mouseY - selectedShape.y * tileSize
  } else {
    selectedShape = null
  }
}

export const handleMouseMove = (
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  shapes: Shape[],
  canvasRef: MutableRefObject<HTMLCanvasElement | null>
) => {
  const canvas = canvasRef?.current
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  if (selectedShape && selectedShape.isDragging) {
    const mouseX = event.nativeEvent.offsetX
    const mouseY = event.nativeEvent.offsetY

    selectedShape.x = (mouseX - offsetX) / tileSize
    selectedShape.y = (mouseY - offsetY) / tileSize

    selectedShape.x = Math.floor(selectedShape.x)
    selectedShape.y = Math.floor(selectedShape.y)

    drawGrid(ctx, canvas)
    renderShapes(ctx, shapes)
  }
}

export const handleMouseLeave = (
  shapes: Shape[],
  canvasRef: MutableRefObject<HTMLCanvasElement | null>
) => {
  const canvas = canvasRef?.current
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  if (!selectedShape) return

  if (
    selectedShape.x < 0 ||
    selectedShape.x >= gridSize ||
    selectedShape.y < 0 ||
    selectedShape.y >= gridSize
  ) {
    selectedShape.x = selectedShape.initialX!
    selectedShape.y = selectedShape.initialY!
  }

  selectedShape.isDragging = false
  selectedShape = null

  drawGrid(ctx, canvas)
  renderShapes(ctx, shapes)
}

export const handleMouseUp = (
  shapes: Shape[],
  canvasRef: MutableRefObject<HTMLCanvasElement | null>,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setShapes: Dispatch<SetStateAction<Shape[]>>,
  setPoint: Dispatch<SetStateAction<number>>
) => {
  const canvas = canvasRef?.current
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  if (selectedShape) {
    if (isShapeCollidingWithOtherShapes(selectedShape, shapes)) {
      selectedShape.x = selectedShape.initialX!
      selectedShape.y = selectedShape.initialY!
    }

    if (!isShapeInsidePlayArea(selectedShape)) {
      selectedShape.x = selectedShape.initialX!
      selectedShape.y = selectedShape.initialY!
    }

    if (
      selectedShape.x < 0 ||
      selectedShape.x >= gridSize ||
      selectedShape.y < 0 ||
      selectedShape.y >= gridSize
    ) {
      selectedShape.x = selectedShape.initialX!
      selectedShape.y = selectedShape.initialY!
    }

    removeIfPartFull(shapes, setPoint)

    selectedShape.isDragging = false
    selectedShape = null

    drawGrid(ctx, canvas)
    renderShapes(ctx, shapes)

    if (areShapesInPanel(shapes)) {
      const newShapes = [...getRandomElements()]
      setShapes(prev => [...prev, ...newShapes])

      if (!isThereSpaceForNewShape([...shapes, ...newShapes])) {
        setOpen(true)
      }
    }
  }
}
