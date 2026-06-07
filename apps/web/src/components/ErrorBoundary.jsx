import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
          <h1 className="text-3xl font-bold text-destructive mb-4">Something went wrong</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {this.state.error?.message || 'An unexpected error occurred while rendering the application.'}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 font-medium transition-colors"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}