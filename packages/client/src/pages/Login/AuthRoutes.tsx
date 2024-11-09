import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Main } from '../Main'
import Login from './Login'
import { Forum } from '../Forum'
import { ForumTopic } from '../ForumTopic'
import { Game } from '../Game'
import { Leaderboard } from '../Leaderboard'
import { useEffect } from 'react'
import { Profile } from '../Profile'
import { Registration } from '../Registration'
import { NotFound } from '../404'
import { sampleData } from '../../utils/sampleData'

const AuthRoutes: React.FC<{
  isAuthenticated: boolean
  onLogin: () => void
}> = ({ isAuthenticated, onLogin }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Main /> : <Navigate to="/login" replace />}
      />
      <Route path="/login" element={<Login onLogin={onLogin} />} />
      <Route
        path="/forum"
        element={isAuthenticated ? <Forum /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/forum-topic"
        element={
          isAuthenticated ? <ForumTopic /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/game"
        element={isAuthenticated ? <Game /> : <Navigate to="/login" replace />}
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
        element={<Registration onRegister={onLogin} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AuthRoutes
