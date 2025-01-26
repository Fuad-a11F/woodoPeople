import React, { useMemo, useEffect } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'
import { AuthRoutes } from './routes'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://158.160.1.88/api`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }
    fetchServerData()
  }, [])

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
