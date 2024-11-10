import { gridSize } from '../consts'
import {
  areShapesInPanel,
  isAnyColumnFilled,
  isAnyRowFilled,
  isShapeInsidePlayArea,
  removeIfPartFull,
  removePartOfBlockOnFilledColumn,
} from './utils'

import { Shape } from '../../../interfaces'

describe('isAnyRowFilled', () => {
  it('должен вернуть объект с координатой y, если строка полностью заполнена', () => {
    const shapes: Shape[] = [
      {
        x: 0,
        y: 0,
        blocks: Array.from({ length: gridSize }, (_, x) => ({ x, y: 0 })),
        isDragging: false,
      },
    ]

    expect(isAnyRowFilled(shapes)).toEqual({ y: 0 })
  })

  it('должен вернуть false, если ни одна строка не заполнена', () => {
    const shapes: Shape[] = [
      { x: 0, y: 0, blocks: [{ x: 0, y: 0 }], isDragging: false },
    ]

    expect(isAnyRowFilled(shapes)).toBe(false)
  })
})

describe('isAnyColumnFilled', () => {
  it('должен вернуть false, если ни один столбец не заполнен', () => {
    const shapes: Shape[] = [
      { x: 0, y: 0, blocks: [{ x: 0, y: 0 }], isDragging: false },
    ]

    expect(isAnyColumnFilled(shapes)).toBe(false)
  })
})

describe('removeIfPartFull', () => {
  it('должен увеличить счет очков, если ряд или столбец полностью заполнен', () => {
    const shapes: Shape[] = Array.from({ length: gridSize }, (_, x) => ({
      x,
      y: 0,
      blocks: [{ x: 0, y: 0 }],
      isDragging: false,
    }))
    const setPointGame = jest.fn()

    removeIfPartFull(shapes, setPointGame)

    expect(setPointGame).toHaveBeenCalledWith(20)
  })
})

describe('isShapeInsidePlayArea', () => {
  it('должен вернуть true, если фигура находится внутри игрового поля', () => {
    const shape: Shape = {
      x: 0,
      y: 0,
      blocks: [{ x: 0, y: 0 }],
      isDragging: false,
    }

    expect(isShapeInsidePlayArea(shape)).toBe(true)
  })

  it('должен вернуть false, если фигура выходит за границы игрового поля', () => {
    const shape: Shape = {
      x: 11,
      y: 10,
      blocks: [{ x: 0, y: 0 }],
      isDragging: false,
    }

    expect(isShapeInsidePlayArea(shape)).toBe(false)
  })
})

describe('areShapesInPanel', () => {
  it('должен вернуть true, если все фигуры находятся в пределах панели', () => {
    const shapes: Shape[] = [
      { x: 0, y: 0, blocks: [{ x: 0, y: 0 }], isDragging: false },
    ]

    expect(areShapesInPanel(shapes)).toBe(true)
  })

  it('должен вернуть false, если хотя бы одна фигура вне панели', () => {
    const shapes: Shape[] = [
      { x: 10, y: 0, blocks: [{ x: 0, y: 0 }], isDragging: false },
    ]

    expect(areShapesInPanel(shapes)).toBe(false)
  })
})

describe('removePartOfBlockOnFilledColumn', () => {
  it('должен удалить блоки в заполненном столбце', () => {
    const filledColumnX = 1
    const shapes: Shape[] = [
      { x: 1, y: 0, blocks: [{ x: 0, y: 0 }], isDragging: false },
    ]

    removePartOfBlockOnFilledColumn(filledColumnX, shapes)

    expect(shapes[0].blocks.length).toBe(0)
  })
})
