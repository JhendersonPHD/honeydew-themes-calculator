// S4.2 Error Boundary - Catch and display errors gracefully
import React from 'react'

interface Props {
  children: React.ReactNode
  fallbackMessage?: string
}

interface State {
  hasError: boolean
  error?: Error
}

/**
 * React Error Boundary component
 * Catches JavaScript errors in child component tree
 * Displays a friendly fallback UI instead of crashing
 */
export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          background: '#FFF8E7',
          border: '2px solid #F5A623',
          borderRadius: '12px',
          padding: '1.5rem',
          marginTop: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚠️</div>
          <h3 style={{ 
            color: '#2D1B00', 
            marginBottom: '0.5rem',
            fontFamily: 'var(--font-sans)'
          }}>
            Something went wrong
          </h3>
          <p style={{ 
            color: '#6B4423', 
            fontSize: '0.875rem',
            fontFamily: 'var(--font-sans)'
          }}>
            {this.props.fallbackMessage || 'The result could not be displayed. Please try again.'}
          </p>
          <button
            onClick={this.handleReset}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1.5rem',
              background: '#F5A623',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)'
            }}
          >
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
