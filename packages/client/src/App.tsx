import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
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

  useEffect(() => {
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

  const sampleData = [
    { id: 1, name: 'Alice', score: 1200 },
    { id: 2, name: 'Bob', score: 950 },
    { id: 3, name: 'Charlie', score: 1100 },
  ]

  return (
    <div className="App">
      <BrowserRouter>
        <Menu />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/forum"
              element={isAuthenticated ? <Forum /> : <Navigate to="/login" />}
            />
            <Route
              path="/forum-topic"
              element={
                isAuthenticated ? <ForumTopic /> : <Navigate to="/login" />
              }
            />
            <Route path="/game" element={<Game />} />
            <Route
              path="/leaderboard"
              element={
                isAuthenticated ? (
                  <Leaderboard data={sampleData} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/profile"
              element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
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
