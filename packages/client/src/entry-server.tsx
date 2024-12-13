import React from 'react'
import ReactDOM from 'react-dom/server'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { fetchUserData } from './store/reducers/userSlice'
import rootReducer from './store/reducers'
import { StaticRouter } from 'react-router-dom/server'

export const render = async (req: any) => {
  const store = configureStore({
    reducer: rootReducer,
  })

  await store.dispatch(fetchUserData())

  return {
    html: ReactDOM.renderToString(
      <StaticRouter location={req.url}>
        <Provider store={store}>
          <App />
        </Provider>
      </StaticRouter>
    ),
    initialState: store.getState(),
  }
}
