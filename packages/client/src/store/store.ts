import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
  TypedUseSelectorHook,
  useStore as useStoreBase,
} from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
})

export default store

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export const useDispatch: () => AppDispatch = useDispatchBase
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorBase
export const useStore: () => typeof store = useStoreBase