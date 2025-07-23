
import React from 'react';
import { Typography, Stack, Container, Section } from '@/design-system';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Only log errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // In production, you would send this to your error reporting service
    // Example: errorReportingService.captureException(error, { extra: errorInfo });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent 
            error={this.state.error!} 
            resetError={this.handleReset} 
          />
        );
      }

      return (
        <Section size="xl" background="default" className="min-h-screen">
          <Container size="sm">
            <Stack direction="column" align="center" justify="center" gap={6} className="min-h-screen">
              <div className="flex items-center justify-center w-24 h-24 mx-auto bg-destructive/10 rounded-full">
                <AlertTriangle className="h-12 w-12 text-destructive" />
              </div>
              
              <Stack direction="column" align="center" gap={3}>
                <Typography variant="h1" align="center" className="text-4xl font-bold">
                  Something went wrong
                </Typography>
                <Typography variant="body" align="center" color="muted" className="max-w-md">
                  We're sorry, but something unexpected happened. Please try refreshing the page.
                </Typography>
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="mt-4 p-4 bg-muted rounded-lg text-sm">
                    <summary className="cursor-pointer font-medium">Error Details</summary>
                    <pre className="mt-2 whitespace-pre-wrap">{this.state.error.toString()}</pre>
                  </details>
                )}
              </Stack>
              
              <Stack direction="row" gap={4}>
                <Button onClick={this.handleReset} size="lg" className="hover-lift">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/">Go Home</a>
                </Button>
              </Stack>
            </Stack>
          </Container>
        </Section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
