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
import { sampleData } from '../utils/sampleData'
import { Menu } from '../components'
import useAuth from '../utils/useAuth'

const AuthRoutes = () => {
  const { auth, setAuth } = useAuthCheck()

  const handleLogout = () => {
    sessionStorage.clear()
    setAuth(false)
    window.location.reload()
  }

  const ProtectedMain = withAuth(Main)
  const ProtectedProfile = withAuth(Profile)
  const ProtectedForum = withAuth(Forum)
  const ProtectedForumTopic = withAuth(ForumTopic)
  const ProtectedGame = withAuth(Game)
  const ProtectedLeaderboard = withAuth(() => <Leaderboard data={sampleData} />)

  return (
    <>
      {auth && <Menu onLogout={handleLogout} />}
      <Routes>
        <Route path="/main" element={<ProtectedMain />} />
        <Route path="/profile" element={<ProtectedProfile />} />
        <Route path="/forum" element={<ProtectedForum />} />
        <Route path="/forum-topic" element={<ProtectedForumTopic />} />
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
