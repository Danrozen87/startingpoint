/**
 * @file buildLogger.ts
 * @purpose Build-time logging and error collection system
 * @performance Optimized for build process integration
 */

interface BuildError {
  id: string;
  type: 'typescript' | 'eslint' | 'build' | 'runtime';
  severity: 'error' | 'warning' | 'info';
  message: string;
  file?: string;
  line?: number;
  column?: number;
  rule?: string;
  stack?: string;
  timestamp: number;
  buildId: string;
}

interface BuildMetrics {
  buildId: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  success: boolean;
  errors: BuildError[];
  warnings: BuildError[];
  bundleSize?: number;
  chunkSizes?: Record<string, number>;
  dependencies?: string[];
  timestamp: number;
}

class BuildLogger {
  private errors: BuildError[] = [];
  private metrics: BuildMetrics;
  private buildId: string;

  constructor() {
    this.buildId = this.generateBuildId();
    this.metrics = {
      buildId: this.buildId,
      startTime: Date.now(),
      success: false,
      errors: [],
      warnings: [],
      timestamp: Date.now(),
    };
  }

  private generateBuildId(): string {
    return `build_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  logError(
    type: BuildError['type'],
    severity: BuildError['severity'],
    message: string,
    details?: Partial<Pick<BuildError, 'file' | 'line' | 'column' | 'rule' | 'stack'>>
  ): void {
    const error: BuildError = {
      id: `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      severity,
      message,
      timestamp: Date.now(),
      buildId: this.buildId,
      ...details,
    };

    this.errors.push(error);

    if (severity === 'error') {
      this.metrics.errors.push(error);
    } else if (severity === 'warning') {
      this.metrics.warnings.push(error);
    }

    // Log to console with appropriate styling
    const style = this.getConsoleStyle(severity);
    const prefix = `[${type.toUpperCase()}]`;
    
    if (details?.file) {
      console.log(`%c${prefix} ${details.file}:${details.line || 0}:${details.column || 0}`, style);
    } else {
      console.log(`%c${prefix}`, style);
    }
    console.log(`  ${message}`);
    
    if (details?.stack) {
      console.log(`  Stack: ${details.stack}`);
    }
  }

  private getConsoleStyle(severity: BuildError['severity']): string {
    switch (severity) {
      case 'error': return 'color: #ef4444; font-weight: bold;';
      case 'warning': return 'color: #f59e0b; font-weight: bold;';
      case 'info': return 'color: #3b82f6; font-weight: normal;';
      default: return 'color: #6b7280; font-weight: normal;';
    }
  }

  setBundleMetrics(bundleSize: number, chunkSizes: Record<string, number>): void {
    this.metrics.bundleSize = bundleSize;
    this.metrics.chunkSizes = chunkSizes;
  }

  setDependencies(dependencies: string[]): void {
    this.metrics.dependencies = dependencies;
  }

  markBuildComplete(success: boolean): void {
    this.metrics.endTime = Date.now();
    this.metrics.duration = this.metrics.endTime - this.metrics.startTime;
    this.metrics.success = success;

    this.logBuildSummary();
  }

  private logBuildSummary(): void {
    const { duration, success, errors, warnings, bundleSize } = this.metrics;
    
    console.log('\n=== Build Summary ===');
    console.log(`Status: ${success ? '✅ Success' : '❌ Failed'}`);
    console.log(`Duration: ${duration}ms`);
    console.log(`Errors: ${errors.length}`);
    console.log(`Warnings: ${warnings.length}`);
    
    if (bundleSize) {
      console.log(`Bundle Size: ${(bundleSize / 1024).toFixed(2)} KB`);
    }
    
    if (this.metrics.chunkSizes) {
      console.log('Chunk Sizes:');
      Object.entries(this.metrics.chunkSizes).forEach(([name, size]) => {
        console.log(`  ${name}: ${(size / 1024).toFixed(2)} KB`);
      });
    }
    
    console.log('====================\n');
  }

  getErrors(): BuildError[] {
    return [...this.errors];
  }

  getMetrics(): BuildMetrics {
    return { ...this.metrics };
  }

  getBuildId(): string {
    return this.buildId;
  }

  exportReport(): string {
    return JSON.stringify({
      ...this.metrics,
      allErrors: this.errors,
    }, null, 2);
  }

  // Integration helpers for build tools
  createTypeScriptReporter() {
    return (diagnostic: any) => {
      const file = diagnostic.file?.fileName;
      const position = diagnostic.file?.getLineAndCharacterOfPosition(diagnostic.start);
      
      this.logError(
        'typescript',
        diagnostic.category === 1 ? 'error' : 'warning',
        diagnostic.messageText,
        {
          file,
          line: position?.line ? position.line + 1 : undefined,
          column: position?.character ? position.character + 1 : undefined,
        }
      );
    };
  }

  createESLintReporter() {
    return (results: any[]) => {
      results.forEach(result => {
        result.messages.forEach((message: any) => {
          this.logError(
            'eslint',
            message.severity === 2 ? 'error' : 'warning',
            message.message,
            {
              file: result.filePath,
              line: message.line,
              column: message.column,
              rule: message.ruleId,
            }
          );
        });
      });
    };
  }

  createViteReporter() {
    return {
      onError: (error: Error) => {
        this.logError(
          'build',
          'error',
          error.message,
          {
            stack: error.stack,
          }
        );
      },
      onWarning: (warning: string) => {
        this.logError(
          'build',
          'warning',
          warning
        );
      },
    };
  }
}

// Global build logger instance
export const buildLogger = new BuildLogger();

// Vite plugin for build integration
export function createBuildLoggerPlugin() {
  return {
    name: 'build-logger',
    buildStart() {
      console.log(`🏗️  Build started: ${buildLogger.getBuildId()}`);
    },
    buildEnd(error?: Error) {
      if (error) {
        buildLogger.logError('build', 'error', error.message, {
          stack: error.stack,
        });
      }
      buildLogger.markBuildComplete(!error);
    },
    generateBundle(options: any, bundle: any) {
      const chunks = Object.values(bundle) as any[];
      const bundleSize = chunks.reduce((total, chunk) => {
        return total + (chunk.code?.length || 0);
      }, 0);
      
      const chunkSizes = chunks.reduce((sizes, chunk) => {
        if (chunk.fileName && chunk.code) {
          sizes[chunk.fileName] = chunk.code.length;
        }
        return sizes;
      }, {} as Record<string, number>);
      
      buildLogger.setBundleMetrics(bundleSize, chunkSizes);
    },
  };
}

export type { BuildError, BuildMetrics };