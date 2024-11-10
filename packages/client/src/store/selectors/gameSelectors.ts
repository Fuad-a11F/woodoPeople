import { RootState } from '../store'

export const selectGamePoint = (store: RootState) => store.game.point

export const selectIsFinishGame = (store: RootState) => store.game.isFinishGame

export const selectIsStartGame = (store: RootState) => store.game.isStartGame

export const selectGameShapes = (store: RootState) => store.game.shapes
