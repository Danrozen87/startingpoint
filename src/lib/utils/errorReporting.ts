/**
 * @file errorReporting.ts
 * @purpose Production error tracking and reporting system
 * @performance Optimized for minimal impact on user experience
 */

import { logger } from './logger';

interface ErrorReport {
  id: string;
  message: string;
  stack: string;
  url: string;
  userAgent: string;
  timestamp: number;
  userId?: string;
  sessionId: string;
  buildId: string;
  context?: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  fingerprint: string;
}

interface PerformanceReport {
  name: string;
  value: number;
  metric: 'FCP' | 'LCP' | 'FID' | 'CLS' | 'TTFB' | 'custom';
  timestamp: number;
  url: string;
  sessionId: string;
  context?: Record<string, any>;
}

interface UserReport {
  action: string;
  timestamp: number;
  url: string;
  sessionId: string;
  userId?: string;
  context?: Record<string, any>;
  duration?: number;
}

class ErrorReporter {
  private endpoint: string | null = null;
  private isEnabled: boolean = import.meta.env.MODE === 'production';
  private errorQueue: ErrorReport[] = [];
  private performanceQueue: PerformanceReport[] = [];
  private userQueue: UserReport[] = [];
  private flushInterval: NodeJS.Timeout | null = null;
  private sessionId: string;
  private buildId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.buildId = this.getBuildId();
    
    if (this.isEnabled) {
      this.setupGlobalErrorHandlers();
      this.setupPerformanceObserver();
      this.startFlushInterval();
    }
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getBuildId(): string {
    return import.meta.env.VITE_BUILD_ID || 'dev';
  }

  private generateFingerprint(error: Error): string {
    const message = error.message || 'Unknown error';
    const stack = error.stack || '';
    const key = `${message}${stack.split('\n')[0] || ''}`;
    
    // Simple hash function for fingerprinting
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      const char = key.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  private getSeverity(error: Error): 'low' | 'medium' | 'high' | 'critical' {
    const message = error.message.toLowerCase();
    const stack = error.stack?.toLowerCase() || '';
    
    // Critical errors
    if (message.includes('chunk') || message.includes('network') || 
        message.includes('security') || message.includes('auth')) {
      return 'critical';
    }
    
    // High severity
    if (message.includes('component') || message.includes('render') ||
        stack.includes('react') || message.includes('hook')) {
      return 'high';
    }
    
    // Medium severity
    if (message.includes('warning') || message.includes('deprecated')) {
      return 'medium';
    }
    
    return 'low';
  }

  private setupGlobalErrorHandlers(): void {
    // Unhandled JavaScript errors
    window.addEventListener('error', (event) => {
      this.reportError(event.error || new Error(event.message), {
        source: 'window.error',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    });

    // Unhandled Promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      const error = event.reason instanceof Error 
        ? event.reason 
        : new Error(String(event.reason));
      
      this.reportError(error, {
        source: 'unhandledrejection',
        promise: true,
      });
    });

    // React error boundary integration
    const originalConsoleError = console.error;
    console.error = (...args) => {
      // Check if this is a React error boundary error
      const message = args.join(' ');
      if (message.includes('React') && message.includes('error boundary')) {
        this.reportError(new Error(message), {
          source: 'react.error.boundary',
        });
      }
      originalConsoleError.apply(console, args);
    };
  }

  private setupPerformanceObserver(): void {
    // Web Vitals observer
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.reportPerformance('LCP', entry.startTime);
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.reportPerformance('FID', (entry as any).processingStart - entry.startTime);
        }
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            this.reportPerformance('CLS', (entry as any).value);
          }
        }
      }).observe({ entryTypes: ['layout-shift'] });
    }

    // Navigation timing
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          this.reportPerformance('FCP', navigation.responseStart - navigation.fetchStart);
          this.reportPerformance('TTFB', navigation.responseStart - navigation.requestStart);
        }
      }, 0);
    });
  }

  private startFlushInterval(): void {
    this.flushInterval = setInterval(() => {
      this.flush();
    }, 30000); // Flush every 30 seconds
  }

  setEndpoint(endpoint: string): void {
    this.endpoint = endpoint;
  }

  enable(): void {
    this.isEnabled = true;
    if (!this.flushInterval) {
      this.startFlushInterval();
    }
  }

  disable(): void {
    this.isEnabled = false;
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
      this.flushInterval = null;
    }
  }

  reportError(error: Error, context?: Record<string, any>): void {
    if (!this.isEnabled) return;

    const report: ErrorReport = {
      id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      message: error.message,
      stack: error.stack || '',
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      buildId: this.buildId,
      context,
      severity: this.getSeverity(error),
      fingerprint: this.generateFingerprint(error),
    };

    this.errorQueue.push(report);
    
    // Log locally as well
    logger.error('Error reported', { 
      errorId: report.id,
      fingerprint: report.fingerprint,
      severity: report.severity,
      ...context 
    });

    // Flush immediately for critical errors
    if (report.severity === 'critical') {
      this.flush();
    }
  }

  reportPerformance(metric: PerformanceReport['metric'], value: number, context?: Record<string, any>): void {
    if (!this.isEnabled) return;

    const report: PerformanceReport = {
      name: metric,
      value,
      metric,
      timestamp: Date.now(),
      url: window.location.href,
      sessionId: this.sessionId,
      context,
    };

    this.performanceQueue.push(report);
    
    // Log performance metrics
    logger.logPerformance(metric, value);
  }

  reportUserAction(action: string, context?: Record<string, any>, duration?: number): void {
    if (!this.isEnabled) return;

    const report: UserReport = {
      action,
      timestamp: Date.now(),
      url: window.location.href,
      sessionId: this.sessionId,
      context,
      duration,
    };

    this.userQueue.push(report);
    
    // Log user action
    logger.logUserAction(action, context);
  }

  async flush(): Promise<void> {
    if (!this.endpoint || 
        (this.errorQueue.length === 0 && this.performanceQueue.length === 0 && this.userQueue.length === 0)) {
      return;
    }

    const payload = {
      errors: [...this.errorQueue],
      performance: [...this.performanceQueue],
      userActions: [...this.userQueue],
      metadata: {
        sessionId: this.sessionId,
        buildId: this.buildId,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      },
    };

    // Clear queues
    this.errorQueue = [];
    this.performanceQueue = [];
    this.userQueue = [];

    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      // Silently fail to avoid infinite error loops
      logger.warn('Failed to send error reports', { error: error.message });
    }
  }

  getQueueStatus(): { errors: number; performance: number; userActions: number } {
    return {
      errors: this.errorQueue.length,
      performance: this.performanceQueue.length,
      userActions: this.userQueue.length,
    };
  }

  clearQueues(): void {
    this.errorQueue = [];
    this.performanceQueue = [];
    this.userQueue = [];
  }
}

// Global error reporter instance
export const errorReporter = new ErrorReporter();

// React hook for error reporting
export function useErrorReporting() {
  const reportError = (error: Error, context?: Record<string, any>) => {
    errorReporter.reportError(error, context);
  };

  const reportUserAction = (action: string, context?: Record<string, any>) => {
    errorReporter.reportUserAction(action, context);
  };

  const reportPerformance = (name: string, value: number, context?: Record<string, any>) => {
    errorReporter.reportPerformance('custom', value, { name, ...context });
  };

  return {
    reportError,
    reportUserAction,
    reportPerformance,
    getQueueStatus: () => errorReporter.getQueueStatus(),
  };
}

export type { ErrorReport, PerformanceReport, UserReport };