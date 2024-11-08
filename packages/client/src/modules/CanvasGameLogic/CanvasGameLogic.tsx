import React, { FC, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'

import { getRandomElements } from './mockDate'

import { canvasWidth, gridSize, tileSize } from './consts'

import { CanvasGameLogicInterface, Shape } from '../../interfaces'

const CanvasGameLogic: FC<CanvasGameLogicInterface> = ({
  setPoint,
  setOpen,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  let offsetX = 0
  let offsetY = 0

  const [shapes, setShapes] = useState<Shape[]>([...getRandomElements()])

  let selectedShape: Shape | null | undefined = null

  const drawGrid = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    if (!ctx || !canvas) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        ctx.strokeRect(i * tileSize, j * tileSize, tileSize, tileSize)
      }
    }
  }

  // Todo: надо доработать
  const isThereSpaceForNewShape = (shapes: Shape[]): boolean => {
    const gameField: boolean[][] = Array.from({ length: gridSize }, () =>
      Array(gridSize).fill(false)
    )

    shapes.forEach(shape => {
      shape.blocks.forEach(block => {
        const x = shape.x + block.x
        const y = shape.y + block.y
        if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
          gameField[y][x] = true // Клетка занята
        }
      })
    })

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        if (!gameField[y][x]) {
          // Если клетка свободна
          const canPlace = shapes.some(shape => {
            return shape.blocks.every(block => {
              const blockX = x + block.x
              const blockY = y + block.y
              return (
                blockX >= 0 &&
                blockX < gridSize &&
                blockY >= 0 &&
                blockY < gridSize &&
                !gameField[blockY][blockX]
              )
            })
          })

          if (canPlace) {
            return true
          }
        }
      }
    }

    return false
  }

  const renderShapes = (ctx: CanvasRenderingContext2D) => {
    if (!ctx) return

    shapes.forEach(shape => {
      shape.blocks.forEach(block => {
        const x = (shape.x + block.x) * tileSize
        const y = (shape.y + block.y) * tileSize
        ctx.fillStyle = 'blue'
        ctx.fillRect(x, y, tileSize, tileSize)
        ctx.strokeRect(x, y, tileSize, tileSize)
      })
    })
  }

  const areShapesInPanel = (shapes: Shape[]): boolean => {
    return shapes.every(shape => {
      return shape.x < gridSize
    })
  }

  const isShapeInsidePlayArea = (shape: Shape): boolean => {
    return shape.blocks.every(block => {
      const x = (shape.x + block.x) * tileSize
      const y = (shape.y + block.y) * tileSize
      return (
        x >= 0 && x < gridSize * tileSize && y >= 0 && y < gridSize * tileSize
      )
    })
  }

  const isShapeCollidingWithOtherShapes = (shape: Shape): boolean => {
    return shapes.some(otherShape => {
      if (shape === otherShape) return false

      return shape.blocks.some(block => {
        const currentBlockX = shape.x + block.x
        const currentBlockY = shape.y + block.y

        return otherShape.blocks.some(otherBlock => {
          const otherBlockX = otherShape.x + otherBlock.x
          const otherBlockY = otherShape.y + otherBlock.y

          return currentBlockX === otherBlockX && currentBlockY === otherBlockY
        })
      })
    })
  }

  const isAnyRowFilled = (): boolean | { y: number } => {
    for (let y = 0; y < gridSize; y++) {
      let filledCellsCount = 0

      for (let x = 0; x < gridSize; x++) {
        const isCellFilled = shapes.some(shape =>
          shape.blocks.some(
            block => block.x + shape.x === x && block.y + shape.y === y
          )
        )

        if (isCellFilled) {
          filledCellsCount++
        }
      }

      if (filledCellsCount === gridSize) {
        return { y }
      }
    }

    return false
  }

  const isAnyColumnFilled = (): boolean | { x: number } => {
    for (let x = 0; x < gridSize; x++) {
      let filledCellsCount = 0

      for (let y = 0; y < gridSize; y++) {
        const isCellFilled = shapes.some(shape =>
          shape.blocks.some(
            block => block.x + shape.x === x && block.y + shape.y === y
          )
        )

        if (isCellFilled) {
          filledCellsCount++
        }
      }

      if (filledCellsCount === gridSize) {
        return { x }
      }
    }

    return false
  }

  const removePartOfBlockOnFilledRow = (filledRowY: number) => {
    const gameAreaSize = gridSize

    shapes.forEach(shape => {
      shape.blocks = shape.blocks.filter(block => {
        const blockX = block.x + shape.x
        const blockY = block.y + shape.y

        const isInGameArea =
          blockX >= 0 &&
          blockX < gameAreaSize &&
          blockY >= 0 &&
          blockY < gameAreaSize

        return !(blockY === filledRowY && isInGameArea)
      })
    })
  }

  const removePartOfBlockOnFilledColumn = (filledColumnX: number) => {
    const gameAreaSize = gridSize

    shapes.forEach(shape => {
      shape.blocks = shape.blocks.filter(block => {
        const blockX = block.x + shape.x
        const blockY = block.y + shape.y

        const isInGameArea =
          blockX >= 0 &&
          blockX < gameAreaSize &&
          blockY >= 0 &&
          blockY < gameAreaSize

        return !(blockX === filledColumnX && isInGameArea)
      })
    })
  }

  const removeIfPartFull = () => {
    let rowFilled = isAnyRowFilled()
    let columnFilled = isAnyColumnFilled()

    while (rowFilled) {
      if (rowFilled && typeof rowFilled !== 'boolean') {
        setPoint(prev => prev + 20)
        removePartOfBlockOnFilledRow(rowFilled.y)
      }

      rowFilled = isAnyRowFilled()
    }

    while (columnFilled) {
      if (columnFilled && typeof columnFilled !== 'boolean') {
        setPoint(prev => prev + 20)
        removePartOfBlockOnFilledColumn(columnFilled.x)
      }

      columnFilled = isAnyColumnFilled()
    }
  }

  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
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

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const canvas = canvasRef.current
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
      renderShapes(ctx)
    }
  }

  const handleMouseLeave = () => {
    const canvas = canvasRef.current
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
    renderShapes(ctx)
  }

  const handleMouseUp = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (selectedShape) {
      if (isShapeCollidingWithOtherShapes(selectedShape)) {
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

      removeIfPartFull()

      selectedShape.isDragging = false
      selectedShape = null

      // надо будет рандомно генерить блоки

      drawGrid(ctx, canvas)
      renderShapes(ctx)

      if (areShapesInPanel(shapes)) {
        const newShapes = [...getRandomElements()]
        console.log(newShapes)
        setShapes(prev => [...prev, ...newShapes])

        if (!isThereSpaceForNewShape([...shapes, ...newShapes])) {
          setOpen(true)
        }
      }
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
    renderShapes(ctx)
  }, [shapes])

  return (
    <Box display={'flex'} justifyContent="center" margin={'26px 0 0 0'}>
      <canvas
        ref={canvasRef}
        style={{ border: '1px solid black' }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      />
    </Box>
  )
}

export default CanvasGameLogic
