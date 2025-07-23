interface PerformanceMetrics {
  renderTime: number;
  componentName: string;
  propsHash: string;
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private readonly maxMetrics = 100;

  logRender(componentName: string, renderTime: number, propsHash: string) {
    if (process.env.NODE_ENV === 'development') {
      this.metrics.push({
        renderTime,
        componentName,
        propsHash,
        timestamp: Date.now(),
      });

      // Keep only the last 100 metrics
      if (this.metrics.length > this.maxMetrics) {
        this.metrics = this.metrics.slice(-this.maxMetrics);
      }

      // Log slow renders
      if (renderTime > 16) {
        console.warn(
          `[Performance] Slow render detected: ${componentName} took ${renderTime}ms`
        );
      }
    }
  }

  getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  getComponentMetrics(componentName: string): PerformanceMetrics[] {
    return this.metrics.filter(m => m.componentName === componentName);
  }

  clear() {
    this.metrics = [];
  }
}

export const performanceMonitor = new PerformanceMonitor();

export function measureRender<T extends Record<string, any>>(
  componentName: string,
  props: T,
  renderFn: () => React.ReactElement
): React.ReactElement {
  if (process.env.NODE_ENV === 'development') {
    const start = performance.now();
    const result = renderFn();
    const end = performance.now();
    
    const propsHash = JSON.stringify(props);
    performanceMonitor.logRender(componentName, end - start, propsHash);
    
    return result;
  }
  
  return renderFn();
}
