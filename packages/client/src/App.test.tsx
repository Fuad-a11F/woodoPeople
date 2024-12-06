import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from './store/store'
import '@testing-library/jest-dom'

const appContent = 'Авторизация'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve(`${appContent}`) })
)

test('Example test', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )

  expect(await screen.findByText(appContent)).toBeInTheDocument()
})
