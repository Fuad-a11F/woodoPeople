import { Dispatch, SetStateAction } from 'react'

export interface CanvasGameLogicInterface {
  setShapes: Dispatch<SetStateAction<Shape[]>>
  shapes: Shape[]
}

export interface Shape {
  x: number
  y: number
  initialX?: number
  initialY?: number
  blocks: { x: number; y: number }[]
  isDragging: boolean
  color: string
  strokeColor: string
}
