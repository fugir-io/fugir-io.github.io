import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          color: 'white',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          textAlign: 'center',
          padding: '20px',
        }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>⚠️</div>
          <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>Something went wrong</h1>
          <p style={{ fontSize: '16px', marginBottom: '20px', maxWidth: '600px' }}>
            An error occurred while loading the application. Please check the browser console for more details.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              color: 'white',
              padding: '12px 24px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Reload Page
          </button>
          {this.state.error && (
            <details style={{ marginTop: '20px', fontSize: '12px', maxWidth: '800px' }}>
              <summary style={{ cursor: 'pointer', marginBottom: '10px' }}>Error Details</summary>
              <pre style={{ 
                background: 'rgba(0, 0, 0, 0.3)', 
                padding: '10px', 
                borderRadius: '4px',
                textAlign: 'left',
                overflow: 'auto',
              }}>
                {this.state.error.message}
                {'\n'}
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;