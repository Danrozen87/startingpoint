
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './index.css';

// Performance monitoring in development
if (process.env.NODE_ENV === 'development') {
  import('./lib/utils/performance.ts').then(({ performanceMonitor }) => {
    // Make performance monitor available globally in development
    (window as any).__performanceMonitor = performanceMonitor;
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
