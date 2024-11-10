import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import '@testing-library/jest-dom'

import gameSlice from '../../store/reducers/gameSlice'

import { GamePoint } from './index'

describe('Компонент GamePoint', () => {
  it('должен отображать правильное значение счета', () => {
    const store = configureStore({
      reducer: {
        game: gameSlice,
      },
      preloadedState: {
        game: {
          point: 42,
          isStartGame: false,
          isFinishGame: false,
          shapes: [],
        },
      },
    })

    const { getByText } = render(
      <Provider store={store}>
        <GamePoint />
      </Provider>
    )

    expect(getByText('Счет: 42')).toBeInTheDocument()
  })
})
