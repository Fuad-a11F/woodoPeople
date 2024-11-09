import React from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'
import { AuthRoutes } from './routes'

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <AuthRoutes />
      </ErrorBoundary>
    </div>
  )
}

export default App
