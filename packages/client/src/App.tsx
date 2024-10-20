import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

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

  return (
    <div className="App">
      <BrowserRouter>
        {isAuthenticated && <Menu />}
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Main /> : <Navigate to="/login" />}
          />
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
          <Route
            path="/game"
            element={isAuthenticated ? <Game /> : <Navigate to="/login" />}
          />
          <Route
            path="/leaderboard"
            element={
              isAuthenticated ? <Leaderboard /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
          />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
