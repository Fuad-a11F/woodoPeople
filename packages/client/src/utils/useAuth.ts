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
          navigate('/main') //  было так  navigate('/')
        } else {
          setAuth(false)
          navigate('') //  было так navigate('/login')
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

// const useAuth = () => {
//   const [auth, setAuth] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkUser = async () => {
//       setLoading(true);
//       try {
//         const userData = JSON.parse(sessionStorage.getItem("userData") || "null");

//         if (userData) {
//           setAuth(true);
//           navigate("/main", { replace: true });
//         } else {
//           const fetchedData = await getUserData(); // Запрос к API для проверки пользователя
//           if (fetchedData) {
//             sessionStorage.setItem("userData", JSON.stringify(fetchedData));
//             setAuth(true);
//             navigate("/main", { replace: true });
//           } else {
//             setAuth(false);
//             navigate("/login", { replace: true });
//           }
//         }
//       } catch (error) {
//         console.error("Ошибка проверки пользователя:", error);
//         setAuth(false);
//         navigate("/login", { replace: true });
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkUser();
//   }, []);

//   return { auth, loading, setAuth };
// };

export default useAuth
