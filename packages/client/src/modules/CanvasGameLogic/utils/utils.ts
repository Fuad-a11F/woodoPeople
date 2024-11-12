import { gridSize, tileSize } from '../consts'

import { Shape } from '../../../interfaces'

// Todo: надо доработать
export const isThereSpaceForNewShape = (shapes: Shape[]): boolean => {
  const gameField: boolean[][] = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(false)
  )

  shapes.forEach(shape => {
    shape.blocks.forEach(block => {
      const x = shape.x + block.x
      const y = shape.y + block.y
      if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
        gameField[y][x] = true
      }
    })
  })

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (!gameField[y][x]) {
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

export const isAnyRowFilled = (shapes: Shape[]): boolean | { y: number } => {
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

export const isAnyColumnFilled = (shapes: Shape[]): boolean | { x: number } => {
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

export const removePartOfBlockOnFilledRow = (
  filledRowY: number,
  shapes: Shape[]
) => {
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

export const removePartOfBlockOnFilledColumn = (
  filledColumnX: number,
  shapes: Shape[]
) => {
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

export const areShapesInPanel = (shapes: Shape[]): boolean => {
  return shapes.every(shape => {
    return shape.x < gridSize
  })
}

export const removeIfPartFull = (
  shapes: Shape[],
  setPointGame: (point: number) => void
) => {
  let rowFilled = isAnyRowFilled(shapes)
  let columnFilled = isAnyColumnFilled(shapes)

  while (rowFilled) {
    if (rowFilled && typeof rowFilled !== 'boolean') {
      setPointGame(20)
      removePartOfBlockOnFilledRow(rowFilled.y, shapes)
    }

    rowFilled = isAnyRowFilled(shapes)
  }

  while (columnFilled) {
    if (columnFilled && typeof columnFilled !== 'boolean') {
      setPointGame(20)
      removePartOfBlockOnFilledColumn(columnFilled.x, shapes)
    }

    columnFilled = isAnyColumnFilled(shapes)
  }
}

export const isShapeInsidePlayArea = (shape: Shape): boolean => {
  return shape.blocks.every(block => {
    const x = (shape.x + block.x) * tileSize
    const y = (shape.y + block.y) * tileSize
    return (
      x >= 0 && x < gridSize * tileSize && y >= 0 && y < gridSize * tileSize
    )
  })
}

export const isShapeCollidingWithOtherShapes = (
  shape: Shape,
  shapes: Shape[]
): boolean => {
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

export const drawRoundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number | { tl: number; tr: number; br: number; bl: number },
  color: string,
  strokeColor: string,
  isDragging?: boolean
) => {
  ctx.fillStyle = color
  ctx.strokeStyle = strokeColor
  ctx.lineWidth = 1

  if (isDragging) {
    ctx.strokeStyle = '#582FF5'
  }

  ctx.beginPath()

  // Если `radius` - число, задаем одинаковое скругление для всех углов
  if (typeof radius === 'number') {
    radius = { tl: radius, tr: radius, br: radius, bl: radius }
  } else {
    // Убедитесь, что у каждого угла есть значение
    radius = {
      tl: radius.tl || 0,
      tr: radius.tr || 0,
      br: radius.br || 0,
      bl: radius.bl || 0,
    }
  }

  // Рисуем путь скругленного прямоугольника
  ctx.moveTo(x + radius.tl, y)
  ctx.lineTo(x + width - radius.tr, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr)
  ctx.lineTo(x + width, y + height - radius.br)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height)
  ctx.lineTo(x + radius.bl, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl)
  ctx.lineTo(x, y + radius.tl)
  ctx.quadraticCurveTo(x, y, x + radius.tl, y)

  ctx.closePath()
  ctx.fill() // Заливаем прямоугольник
  ctx.stroke() // Используйте stroke(), если нужен только контур
}
