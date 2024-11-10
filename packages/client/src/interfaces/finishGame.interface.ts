import { Dispatch, SetStateAction } from 'react'
import { Shape } from './canvasGameLogic.interface'

export interface FinishGameInterface {
  setShapes: Dispatch<SetStateAction<Shape[]>>
}
