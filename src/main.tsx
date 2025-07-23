
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './index.css';

// Performance monitoring and utilities
if (import.meta.env.MODE === 'development') {
  // Import console replacer first
  import('./lib/utils/consoleReplacer.ts');
  
  // Enhanced performance monitoring
  import('./lib/utils/performanceMonitor.ts').then(({ performanceMonitor }) => {
    (window as any).__performanceMonitor = performanceMonitor;
  });
  
  // Error grouping utilities
  import('./lib/utils/intelligentErrorGrouping.ts').then(({ errorGrouper }) => {
    (window as any).__errorGrouper = errorGrouper;
  });
  
  // Session replay for critical debugging
  import('./lib/utils/sessionReplay.ts').then(({ sessionReplayRecorder }) => {
    (window as any).__sessionReplay = sessionReplayRecorder;
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
