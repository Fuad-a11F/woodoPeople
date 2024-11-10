import React, { useEffect } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'
import { AuthRoutes } from './routes'

// import AuthRoutes from './pages/Login/AuthRoutes'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  return (
    <div className="App">
      <ErrorBoundary>
        <AuthRoutes />
      </ErrorBoundary>
    </div>
  )
}

export default App
