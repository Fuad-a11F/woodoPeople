import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserData } from '../api/api'

const useAuth = () => {
  const [auth, setAuth] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true)
      try {
        const userData = await getUserData()
        if (userData) {
          setAuth(true)
          navigate('/main')
        } else {
          setAuth(false)
          navigate('/')
        }
      } catch (error) {
        setAuth(false)
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [])

  return { auth, loading, setAuth }
}

export default useAuth
