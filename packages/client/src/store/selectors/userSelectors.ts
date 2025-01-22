import { RootState } from '../store'

// Селектор для получения данных пользователя
export const selectUserData = (state: RootState) => state.user.data

// Селектор для проверки статуса загрузки
export const selectUserLoading = (state: RootState) => state.user.loading

// Селектор для ошибки
export const selectUserError = (state: RootState) => state.user.error
