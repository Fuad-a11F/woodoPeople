import { Routes, Route } from 'react-router-dom'
import useAuthCheck from '../hooks/useAuthCheck'
import withAuth from '../hooks/withAuth'
import {
  Forum,
  ForumTopic,
  Game,
  Leaderboard,
  Login,
  Main,
  NotFound,
  Profile,
  Registration,
} from '../pages'
import { Menu } from '../components'
import useAuth from '../utils/useAuth'

const AuthRoutes = () => {
  const { auth, setAuth, loading } = useAuthCheck()

  const handleLogout = () => {
    sessionStorage.clear()
    setAuth(false)
    window.location.reload()
  }

  const ProtectedMain = withAuth(Main, auth, loading)
  const ProtectedProfile = withAuth(Profile, auth, loading)
  const ProtectedForum = withAuth(Forum, auth, loading)
  const ProtectedForumTopic = withAuth(ForumTopic, auth, loading)
  const ProtectedGame = withAuth(Game, auth, loading)
  const ProtectedLeaderboard = withAuth(Leaderboard, auth, loading)

  return (
    <>
      {auth && <Menu onLogout={handleLogout} />}
      <Routes>
        <Route path="/main" element={<ProtectedMain />} />
        <Route path="/profile" element={<ProtectedProfile />} />
        <Route path="/forum" element={<ProtectedForum />} />
        <Route path="/forum-topic/:topicId" element={<ProtectedForumTopic />} />
        <Route path="/game" element={<ProtectedGame />} />
        <Route path="/leaderboard" element={<ProtectedLeaderboard />} />
        <Route path="/" element={<Login onLogin={() => setAuth(true)} />} />
        <Route
          path="/registration"
          element={<Registration onRegister={() => setAuth(true)} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default AuthRoutes
