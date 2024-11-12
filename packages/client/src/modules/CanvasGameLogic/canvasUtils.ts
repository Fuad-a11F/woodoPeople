import { tileSize } from './consts'
import { Shape } from '../../interfaces'
import { drawRoundedRect } from './utils/utils'

export const drawGrid = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) => {
  if (!ctx || !canvas) return

  ctx.strokeStyle = '#EFF7F6'

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      drawRoundedRect(
        ctx,
        i * tileSize,
        j * tileSize,
        tileSize,
        tileSize,
        5,
        '#132436',
        '#160923'
      )
    }
  }
}

export const renderShapes = (
  ctx: CanvasRenderingContext2D,
  shapes: Shape[]
) => {
  if (!ctx) return

  shapes.forEach(shape => {
    shape.blocks.forEach(block => {
      const x = (shape.x + block.x) * tileSize
      const y = (shape.y + block.y) * tileSize
      drawRoundedRect(
        ctx,
        x,
        y,
        tileSize,
        tileSize,
        5,
        shape.color || '#FF6EC7',
        shape.strokeColor || '#B81C6D',
        shape.isDragging
      )
    })
  })
}
