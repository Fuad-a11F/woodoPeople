import React, { Component, ReactNode } from 'react'
import { Box, Typography, Button } from '@mui/material'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode | (() => ReactNode)
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Caught an error:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    const { fallback, children } = this.props
    if (this.state.hasError) {
      if (fallback) {
        return typeof fallback === 'function' ? fallback() : fallback
      }
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
          bgcolor="background.default"
          padding={2}
          textAlign="center">
          <Typography variant="h4" color="text.primary" gutterBottom>
            Oops! Something went wrong.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            An unexpected error occurred. Please try reloading the page.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleReload}>
            Reload Page
          </Button>
        </Box>
      )
    }
    return children
  }
}

export default ErrorBoundary
