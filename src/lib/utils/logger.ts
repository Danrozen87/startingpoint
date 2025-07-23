/**
 * @file logger.ts
 * @purpose Centralized, structured logging system with environment awareness
 * @performance Zero overhead in production, batched logging, intelligent sampling
 */

import React from 'react';

type LogLevel = 'error' | 'warn' | 'info' | 'debug' | 'trace';
type LogContext = Record<string, any>;

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: LogContext;
  timestamp: number;
  component?: string;
  userId?: string;
  sessionId?: string;
  buildId?: string;
  stackTrace?: string;
}

interface LoggerConfig {
  level: LogLevel;
  enableBatching: boolean;
  batchSize: number;
  batchTimeout: number;
  enableSampling: boolean;
  samplingRate: number;
  enableConsole: boolean;
  enableStorage: boolean;
  enableRemote: boolean;
  remoteEndpoint?: string;
}

class Logger {
  private config: LoggerConfig;
  private buffer: LogEntry[] = [];
  private batchTimer: NodeJS.Timeout | null = null;
  private sessionId: string;
  private buildId: string;

  private readonly logLevels: Record<LogLevel, number> = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    trace: 4,
  };

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
      enableBatching: process.env.NODE_ENV === 'production',
      batchSize: 50,
      batchTimeout: 5000,
      enableSampling: process.env.NODE_ENV === 'production',
      samplingRate: 0.1, // 10% sampling in production
      enableConsole: process.env.NODE_ENV === 'development',
      enableStorage: true,
      enableRemote: process.env.NODE_ENV === 'production',
      ...config,
    };

    this.sessionId = this.generateSessionId();
    this.buildId = this.getBuildId();

    // Setup cleanup on page unload
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => this.flush());
      window.addEventListener('pagehide', () => this.flush());
    }
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getBuildId(): string {
    // In a real app, this would come from build process
    return process.env.VITE_BUILD_ID || 'dev';
  }

  private shouldLog(level: LogLevel): boolean {
    if (this.config.enableSampling && Math.random() > this.config.samplingRate) {
      return false;
    }
    return this.logLevels[level] <= this.logLevels[this.config.level];
  }

  private getStackTrace(): string {
    const stack = new Error().stack;
    return stack ? stack.split('\n').slice(3).join('\n') : '';
  }

  private getComponentName(): string {
    const stack = new Error().stack;
    if (!stack) return 'unknown';
    
    // Try to extract component name from stack trace
    const reactComponentMatch = stack.match(/at (\w+)(?:\s|\()/);
    return reactComponentMatch ? reactComponentMatch[1] : 'unknown';
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    context?: LogContext
  ): LogEntry {
    return {
      level,
      message,
      context: {
        ...context,
        url: typeof window !== 'undefined' ? window.location.href : undefined,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      },
      timestamp: Date.now(),
      component: this.getComponentName(),
      sessionId: this.sessionId,
      buildId: this.buildId,
      stackTrace: level === 'error' ? this.getStackTrace() : undefined,
    };
  }

  private async processLogEntry(entry: LogEntry): Promise<void> {
    // Console logging for development
    if (this.config.enableConsole) {
      const style = this.getConsoleStyle(entry.level);
      const prefix = `[${entry.level.toUpperCase()}] ${entry.component || 'Unknown'}:`;
      
      console.groupCollapsed(`%c${prefix} ${entry.message}`, style);
      if (entry.context) {
        console.log('Context:', entry.context);
      }
      if (entry.stackTrace) {
        console.log('Stack:', entry.stackTrace);
      }
      console.groupEnd();
    }

    // Local storage for persistence
    if (this.config.enableStorage && typeof localStorage !== 'undefined') {
      try {
        const logs = JSON.parse(localStorage.getItem('app_logs') || '[]');
        logs.push(entry);
        // Keep only last 1000 logs
        if (logs.length > 1000) {
          logs.splice(0, logs.length - 1000);
        }
        localStorage.setItem('app_logs', JSON.stringify(logs));
      } catch (error) {
        // Ignore storage errors
      }
    }

    // Add to buffer for batching
    if (this.config.enableBatching) {
      this.buffer.push(entry);
      
      if (this.buffer.length >= this.config.batchSize) {
        await this.flush();
      } else if (!this.batchTimer) {
        this.batchTimer = setTimeout(() => this.flush(), this.config.batchTimeout);
      }
    } else if (this.config.enableRemote) {
      await this.sendToRemote([entry]);
    }
  }

  private getConsoleStyle(level: LogLevel): string {
    const styles = {
      error: 'color: #ef4444; font-weight: bold;',
      warn: 'color: #f59e0b; font-weight: bold;',
      info: 'color: #3b82f6; font-weight: bold;',
      debug: 'color: #6b7280; font-weight: normal;',
      trace: 'color: #9ca3af; font-weight: normal;',
    };
    return styles[level];
  }

  private async sendToRemote(entries: LogEntry[]): Promise<void> {
    if (!this.config.remoteEndpoint) return;

    try {
      await fetch(this.config.remoteEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          logs: entries,
          metadata: {
            sessionId: this.sessionId,
            buildId: this.buildId,
            timestamp: Date.now(),
          },
        }),
      });
    } catch (error) {
      // Silently fail remote logging to avoid infinite loops
    }
  }

  async flush(): Promise<void> {
    if (this.buffer.length === 0) return;

    const entries = [...this.buffer];
    this.buffer = [];

    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = null;
    }

    if (this.config.enableRemote) {
      await this.sendToRemote(entries);
    }
  }

  // Public logging methods
  error(message: string, context?: LogContext): void {
    if (this.shouldLog('error')) {
      const entry = this.createLogEntry('error', message, context);
      this.processLogEntry(entry);
    }
  }

  warn(message: string, context?: LogContext): void {
    if (this.shouldLog('warn')) {
      const entry = this.createLogEntry('warn', message, context);
      this.processLogEntry(entry);
    }
  }

  info(message: string, context?: LogContext): void {
    if (this.shouldLog('info')) {
      const entry = this.createLogEntry('info', message, context);
      this.processLogEntry(entry);
    }
  }

  debug(message: string, context?: LogContext): void {
    if (this.shouldLog('debug')) {
      const entry = this.createLogEntry('debug', message, context);
      this.processLogEntry(entry);
    }
  }

  trace(message: string, context?: LogContext): void {
    if (this.shouldLog('trace')) {
      const entry = this.createLogEntry('trace', message, context);
      this.processLogEntry(entry);
    }
  }

  // Utility methods
  startTimer(name: string): () => void {
    const start = performance.now();
    return () => {
      const duration = performance.now() - start;
      this.debug(`Timer: ${name}`, { duration });
    };
  }

  logPerformance(name: string, value: number, unit = 'ms'): void {
    this.info(`Performance: ${name}`, { 
      performance: { name, value, unit },
      timestamp: Date.now()
    });
  }

  logUserAction(action: string, context?: LogContext): void {
    this.info(`User action: ${action}`, {
      userAction: action,
      ...context
    });
  }

  logError(error: Error, context?: LogContext): void {
    this.error(error.message, {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      ...context,
    });
  }

  // Development helpers
  getStoredLogs(): LogEntry[] {
    if (typeof localStorage === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem('app_logs') || '[]');
    } catch {
      return [];
    }
  }

  clearStoredLogs(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('app_logs');
    }
  }

  setLevel(level: LogLevel): void {
    this.config.level = level;
  }

  getConfig(): LoggerConfig {
    return { ...this.config };
  }
}

// Global logger instance
export const logger = new Logger();

// Hook for React components
export function useLogger(componentName?: string) {
  const createContextualLogger = (name: string) => ({
    error: (message: string, context?: LogContext) => 
      logger.error(`[${name}] ${message}`, context),
    warn: (message: string, context?: LogContext) => 
      logger.warn(`[${name}] ${message}`, context),
    info: (message: string, context?: LogContext) => 
      logger.info(`[${name}] ${message}`, context),
    debug: (message: string, context?: LogContext) => 
      logger.debug(`[${name}] ${message}`, context),
    trace: (message: string, context?: LogContext) => 
      logger.trace(`[${name}] ${message}`, context),
    logError: (error: Error, context?: LogContext) => 
      logger.logError(error, { component: name, ...context }),
    logUserAction: (action: string, context?: LogContext) => 
      logger.logUserAction(action, { component: name, ...context }),
    startTimer: (timerName: string) => 
      logger.startTimer(`${name}.${timerName}`),
  });

  return createContextualLogger(componentName || 'Component');
}

// Performance measurement HOC
export function withLogging<T extends Record<string, any>>(
  componentName: string,
  WrappedComponent: React.ComponentType<T>
): React.ComponentType<T> {
  return function LoggedComponent(props: T) {
    const log = useLogger(componentName);
    
    React.useEffect(() => {
      log.debug('Component mounted', { props });
      return () => log.debug('Component unmounted');
    }, []);

    return React.createElement(WrappedComponent, props);
  };
}

export type { LogLevel, LogContext, LogEntry, LoggerConfig };
