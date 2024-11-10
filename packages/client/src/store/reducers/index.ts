import { combineReducers } from 'redux'
import userReducer from './userSlice'
import gameSlice from './gameSlice'

export default combineReducers({
  user: userReducer,
  game: gameSlice,
})
