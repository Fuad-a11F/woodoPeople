import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'

import { Menu } from './components'
import './App.css'

import AuthRoutes from './pages/Login/AuthRoutes'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user')
    if (storedUser) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }

    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    sessionStorage.clear()
    setIsAuthenticated(false)
  }

  return (
    <div className="App">
      <BrowserRouter>
        {isAuthenticated && <Menu onLogout={handleLogout} />}
        <ErrorBoundary>
          <AuthRoutes isAuthenticated={isAuthenticated} onLogin={handleLogin} />
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  )
}

export default App
