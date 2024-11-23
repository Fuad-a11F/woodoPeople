import React, { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:3001/api`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  // const theme = useMemo(
  //   () =>
  //     createTheme({
  //       colorSchemes: {
  //         dark: true,
  //       },
  //     }),
  //   []
  // )

  return (
    <div className="App">
      Hello world
      {/*<ErrorBoundary>*/}
      {/*  <ThemeProvider theme={theme}>*/}
      {/*    <CssBaseline />*/}
      {/*    <AuthRoutes />*/}
      {/*  </ThemeProvider>*/}
      {/*</ErrorBoundary>*/}
    </div>
  )
}

export default App
