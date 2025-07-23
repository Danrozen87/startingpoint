
import React, { useEffect, useState, useCallback } from 'react';
import { performanceMonitor } from '@/lib/utils/performanceMonitor';
import { Typography, Stack } from '@/design-system';
import { Card } from '@/components/ui/card';

interface PerformanceStats {
  slowRenders: number;
  averageRenderTime: number;
  totalRenders: number;
  memoryUsage?: number;
}

const PerformanceMonitor = React.memo(() => {
  const [stats, setStats] = useState<PerformanceStats>({
    slowRenders: 0,
    averageRenderTime: 0,
    totalRenders: 0,
  });

  const [isVisible, setIsVisible] = useState(false);

  // Memoized stats calculation
  const calculateStats = useCallback(() => {
    const metrics = performanceMonitor.getMetrics();
    const slowRenders = metrics.filter(m => m.renderTime > 16).length;
    const averageRenderTime = metrics.length > 0 
      ? metrics.reduce((acc, m) => acc + m.renderTime, 0) / metrics.length 
      : 0;

    // Memory usage (if available)
    const memoryUsage = (performance as any).memory?.usedJSHeapSize 
      ? Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024)
      : undefined;

    return {
      slowRenders,
      averageRenderTime: Math.round(averageRenderTime * 100) / 100,
      totalRenders: metrics.length,
      memoryUsage,
    };
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const interval = setInterval(() => {
      setStats(calculateStats());
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateStats]);

  // Toggle visibility with keyboard shortcut
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'p' && e.ctrlKey && e.shiftKey) {
        e.preventDefault();
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (process.env.NODE_ENV !== 'development' || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="p-3 bg-card/95 backdrop-blur-sm border border-border/50 min-w-[220px]">
        <Stack direction="column" gap={2}>
          <Stack direction="row" justify="between" align="center">
            <Typography variant="small" className="font-semibold">
              Performance Monitor
            </Typography>
            <button
              onClick={() => setIsVisible(false)}
              className="text-muted-foreground hover:text-foreground text-xs"
            >
              ✕
            </button>
          </Stack>
          
          <Stack direction="column" gap={1}>
            <Typography variant="caption">
              Total Renders: {stats.totalRenders}
            </Typography>
            <Typography variant="caption">
              Slow Renders: {stats.slowRenders}
            </Typography>
            <Typography variant="caption">
              Avg Time: {stats.averageRenderTime}ms
            </Typography>
            {stats.memoryUsage && (
              <Typography variant="caption">
                Memory: {stats.memoryUsage}MB
              </Typography>
            )}
          </Stack>
          
          <Typography variant="caption" className="text-muted-foreground">
            Press Ctrl+Shift+P to toggle
          </Typography>
        </Stack>
      </Card>
    </div>
  );
});

PerformanceMonitor.displayName = 'PerformanceMonitor';

export default PerformanceMonitor;
