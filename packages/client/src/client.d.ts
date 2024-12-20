import { RootState } from './store/store'

declare const __SERVER_PORT__: number
declare const __EXTERNAL_SERVER_URL__: string
declare const __INTERNAL_SERVER_URL__: string

declare global {
  interface Window {
    APP_INITIAL_STATE: RootState
  }
}
