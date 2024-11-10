import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isStartGame: true,
  isFinishGame: false,
  shapes: [],
  point: 0,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    toggleIsStartGame: state => {
      state.isStartGame = !state.isStartGame
    },
    toggleIsFinishGame: state => {
      state.isFinishGame = !state.isFinishGame
    },
    setShapes: (state, action) => {
      state.shapes = action.payload
    },
    setPoint: (state, action) => {
      state.point += action.payload
    },
    annulPoint: state => {
      state.point = 0
    },
  },
})

export const {
  toggleIsStartGame,
  toggleIsFinishGame,
  annulPoint,
  setShapes,
  setPoint,
} = gameSlice.actions
export default gameSlice.reducer
