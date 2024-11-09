import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { render, screen, act } from '@testing-library/react'

const appContent = 'Авторизация'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
  })

  expect(screen.getByText(appContent)).toBeDefined()
})
