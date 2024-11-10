import { tileSize } from './consts'
import { Shape } from '../../interfaces'

export const drawGrid = (
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

export const renderShapes = (
  ctx: CanvasRenderingContext2D,
  shapes: Shape[]
) => {
  if (!ctx) return

  shapes.forEach(shape => {
    shape.blocks.forEach(block => {
      const x = (shape.x + block.x) * tileSize
      const y = (shape.y + block.y) * tileSize
      ctx.fillStyle = '#1976d2'
      ctx.fillRect(x, y, tileSize, tileSize)
      ctx.strokeRect(x, y, tileSize, tileSize)
    })
  })
}
