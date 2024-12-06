import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { render, screen, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from './store/store'

const appContent = 'Авторизация'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve(`${appContent}`) })
)

test('Example test', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    )
  })

  expect(screen.getByText(appContent)).toBeDefined()
})
