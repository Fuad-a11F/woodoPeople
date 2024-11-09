import { useState, useEffect } from 'react'
import { getUserData } from '../api/api'

const useAuthCheck = () => {
  const [auth, setAuth] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true)
      try {
        const userData = await getUserData()
        if (userData) {
          setAuth(true)
          sessionStorage.setItem('user', JSON.stringify(userData))
        } else {
          setAuth(false)
          sessionStorage.removeItem('user')
        }
      } catch (error) {
        setAuth(false)
        sessionStorage.removeItem('user')
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [])

  return { auth, loading, setAuth }
}

export default useAuthCheck
