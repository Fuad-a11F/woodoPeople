import React, { useMemo } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'
import { AuthRoutes } from './routes'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

function App() {
  const theme = useMemo(
    () =>
      createTheme({
        colorSchemes: {
          dark: true,
        },
      }),
    []
  )

  return (
    <div className="App">
      <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthRoutes />
        </ThemeProvider>
      </ErrorBoundary>
    </div>
  )
}

export default App
