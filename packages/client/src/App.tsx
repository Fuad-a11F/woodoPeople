import React, { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'

import {
  Forum,
  ForumTopic,
  Game,
  Leaderboard,
  Login,
  Main,
  Profile,
  Registration,
  NotFound,
} from './pages'

import { Menu } from './components'

import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const API_URL = 'https://ya-praktikum.tech/api/v2'
  const location = useLocation()

  useEffect(() => {
    if (isAuthenticated) {
      sessionStorage.setItem('lastPath', location.pathname)
    }
  }, [location, isAuthenticated])

  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/user`, {
        method: 'GET',
        credentials: 'include',
      })
      if (response.ok) {
        const user = await response.json()
        sessionStorage.setItem('user', JSON.stringify(user))
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Ошибка при получении данных пользователя', error)
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user')
    if (storedUser) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }

    const lastPath = sessionStorage.getItem('lastPath') || '/'
    if (isAuthenticated) {
      window.history.replaceState(null, '', lastPath)
    }

    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [isAuthenticated])

  const handleLogin = () => {
    setIsAuthenticated(true)
    checkAuth()
  }

  const sampleData = [
    { id: 1, name: 'Alice', score: 1200 },
    { id: 2, name: 'Bob', score: 950 },
    { id: 3, name: 'Charlie', score: 1100 },
  ]

  return (
    <div className="App">
      <BrowserRouter>
        {isAuthenticated && <Menu />}
        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? <Main /> : <Navigate to="/login" replace />
              }
            />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/forum"
              element={
                isAuthenticated ? <Forum /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/forum-topic"
              element={
                isAuthenticated ? (
                  <ForumTopic />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/game"
              element={
                isAuthenticated ? <Game /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/leaderboard"
              element={
                isAuthenticated ? (
                  <Leaderboard data={sampleData} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/profile"
              element={
                isAuthenticated ? <Profile /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/registration"
              element={<Registration onRegister={handleLogin} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  )
}

export default App
