
import React, { useEffect, useState } from 'react';
import { performanceMonitor } from '@/lib/utils/performance';
import { Typography, Stack, Card } from '@/design-system';

interface PerformanceStats {
  slowRenders: number;
  averageRenderTime: number;
  totalRenders: number;
}

const PerformanceMonitor = () => {
  const [stats, setStats] = useState<PerformanceStats>({
    slowRenders: 0,
    averageRenderTime: 0,
    totalRenders: 0,
  });

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const interval = setInterval(() => {
      const metrics = performanceMonitor.getMetrics();
      const slowRenders = metrics.filter(m => m.renderTime > 16).length;
      const averageRenderTime = metrics.length > 0 
        ? metrics.reduce((acc, m) => acc + m.renderTime, 0) / metrics.length 
        : 0;

      setStats({
        slowRenders,
        averageRenderTime: Math.round(averageRenderTime * 100) / 100,
        totalRenders: metrics.length,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="p-3 bg-card/95 backdrop-blur-sm border border-border/50 min-w-[200px]">
        <Stack direction="column" gap={2}>
          <Typography variant="small" className="font-semibold">
            Performance Monitor
          </Typography>
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
          </Stack>
        </Stack>
      </Card>
    </div>
  );
};

export default PerformanceMonitor;
