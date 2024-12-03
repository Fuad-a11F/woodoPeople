import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuthCheck from './useAuthCheck'
import { Box, CircularProgress } from '@mui/material'
import useAuth from '../utils/useAuth'

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    const { auth, loading } = useAuthCheck()

    if (loading) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}>
          <CircularProgress />
        </Box>
      )
    }

    if (!auth) {
      return <Navigate to="" replace /> // вот тут поменял return <Navigate to="/login" replace />
    }

    return <Component {...props} />
  }
}

// const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
//   return (props: P) => {
//     const { auth, loading } = useAuth();

//     if (loading) {
//       return (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "100vh",
//           }}
//         >
//           <CircularProgress />
//         </Box>
//       );
//     }

//     if (!auth) {
//       return <Navigate to="/login" replace />;
//     }

//     return <Component {...props} />;
//   };
// };

export default withAuth
