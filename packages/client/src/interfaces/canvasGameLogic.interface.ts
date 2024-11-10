import { Dispatch, SetStateAction } from 'react'

export interface CanvasGameLogicInterface {
  setPoint: Dispatch<SetStateAction<number>>
  setOpen: Dispatch<SetStateAction<boolean>>
}

export interface Shape {
  x: number
  y: number
  initialX?: number
  initialY?: number
  blocks: { x: number; y: number }[]
  isDragging: boolean
}
