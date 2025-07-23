/**
 * @file LoggingDashboard.tsx
 * @purpose Development logging dashboard for real-time monitoring
 * @performance Optimized for development use only
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography, Stack } from '@/design-system';
import { logger, type LogEntry, type LogLevel } from '@/lib/utils/logger';
import { errorReporter } from '@/lib/utils/errorReporting';
import { performanceMonitor } from '@/lib/utils/performanceMonitor';
import { 
  X, 
  Trash2, 
  Download, 
  Filter, 
  Activity, 
  AlertTriangle, 
  Info, 
  Bug, 
  Zap 
} from 'lucide-react';

const LoggingDashboard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<LogLevel | 'all'>('all');
  const [errorQueueStatus, setErrorQueueStatus] = useState({ errors: 0, performance: 0, userActions: 0 });
  const [performanceMetrics, setPerformanceMetrics] = useState(performanceMonitor.getMetrics());

  // Toggle visibility with keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'L') {
        event.preventDefault();
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update logs and metrics
  useEffect(() => {
    if (!isVisible) return;

    const updateData = () => {
      setLogs(logger.getStoredLogs());
      setErrorQueueStatus(errorReporter.getQueueStatus());
      setPerformanceMetrics(performanceMonitor.getMetrics());
    };

    updateData();
    const interval = setInterval(updateData, 1000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const filteredLogs = useMemo(() => {
    if (selectedLevel === 'all') return logs;
    return logs.filter(log => log.level === selectedLevel);
  }, [logs, selectedLevel]);

  const logStats = useMemo(() => {
    const stats = logs.reduce((acc, log) => {
      acc[log.level] = (acc[log.level] || 0) + 1;
      return acc;
    }, {} as Record<LogLevel, number>);

    return {
      error: stats.error || 0,
      warn: stats.warn || 0,
      info: stats.info || 0,
      debug: stats.debug || 0,
      trace: stats.trace || 0,
      total: logs.length,
    };
  }, [logs]);

  const performanceStats = useMemo(() => {
    if (performanceMetrics.length === 0) return null;

    const slowRenders = performanceMetrics.filter(m => m.renderTime > 16).length;
    const avgRenderTime = performanceMetrics.reduce((sum, m) => sum + m.renderTime, 0) / performanceMetrics.length;

    return {
      slowRenders,
      totalRenders: performanceMetrics.length,
      avgRenderTime: avgRenderTime.toFixed(2),
      memoryUsage: (performance as any).memory ? Math.round((performance as any).memory.usedJSHeapSize / 1048576) : 'N/A',
    };
  }, [performanceMetrics]);

  const getLevelIcon = (level: LogLevel) => {
    switch (level) {
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      case 'warn': return <AlertTriangle className="h-4 w-4" />;
      case 'info': return <Info className="h-4 w-4" />;
      case 'debug': return <Bug className="h-4 w-4" />;
      case 'trace': return <Activity className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getLevelColor = (level: LogLevel) => {
    switch (level) {
      case 'error': return 'destructive';
      case 'warn': return 'secondary';
      case 'info': return 'default';
      case 'debug': return 'outline';
      case 'trace': return 'outline';
      default: return 'default';
    }
  };

  const exportLogs = () => {
    const dataStr = JSON.stringify(logs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `logs_${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const clearLogs = () => {
    logger.clearStoredLogs();
    performanceMonitor.clear();
    errorReporter.clearQueues();
    setLogs([]);
    setPerformanceMetrics([]);
  };

  if (import.meta.env.MODE !== 'development' || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 max-h-[80vh] z-50">
      <Card className="p-4 backdrop-blur-sm bg-background/95 border shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <Typography variant="cardTitle" className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Logging Dashboard
          </Typography>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={exportLogs}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={clearLogs}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsVisible(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="logs" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="logs">Logs ({logStats.total})</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="errors">Errors ({errorQueueStatus.errors})</TabsTrigger>
          </TabsList>

          <TabsContent value="logs" className="space-y-4">
            {/* Log level filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant={selectedLevel === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedLevel('all')}
              >
                All ({logStats.total})
              </Button>
              {(['error', 'warn', 'info', 'debug', 'trace'] as LogLevel[]).map(level => (
                <Button
                  key={level}
                  variant={selectedLevel === level ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedLevel(level)}
                  className="capitalize"
                >
                  {level} ({logStats[level]})
                </Button>
              ))}
            </div>

            {/* Logs list */}
            <ScrollArea className="h-64">
              <div className="space-y-2">
                {filteredLogs.slice(-50).reverse().map((log, index) => (
                  <div key={index} className="p-2 rounded border-l-2 border-l-primary/20 bg-muted/50">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <Badge variant={getLevelColor(log.level)} className="flex items-center gap-1">
                          {getLevelIcon(log.level)}
                          {log.level}
                        </Badge>
                        <Typography variant="small" className="truncate">
                          {log.component}
                        </Typography>
                      </div>
                      <Typography variant="small" color="muted">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </Typography>
                    </div>
                    <Typography variant="small" className="mt-1">
                      {log.message}
                    </Typography>
                    {log.context && Object.keys(log.context).length > 0 && (
                      <details className="mt-2">
                        <summary className="text-xs cursor-pointer text-muted-foreground">
                          Context
                        </summary>
                        <pre className="text-xs mt-1 p-2 bg-background rounded overflow-x-auto">
                          {JSON.stringify(log.context, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            {performanceStats && (
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-3">
                  <Typography variant="small" color="muted">Slow Renders</Typography>
                  <Typography variant="large" className="text-destructive">
                    {performanceStats.slowRenders}
                  </Typography>
                </Card>
                <Card className="p-3">
                  <Typography variant="small" color="muted">Avg Render Time</Typography>
                  <Typography variant="large">
                    {performanceStats.avgRenderTime}ms
                  </Typography>
                </Card>
                <Card className="p-3">
                  <Typography variant="small" color="muted">Total Renders</Typography>
                  <Typography variant="large">
                    {performanceStats.totalRenders}
                  </Typography>
                </Card>
                <Card className="p-3">
                  <Typography variant="small" color="muted">Memory Usage</Typography>
                  <Typography variant="large">
                    {performanceStats.memoryUsage}MB
                  </Typography>
                </Card>
              </div>
            )}

            <ScrollArea className="h-48">
              <div className="space-y-2">
                {performanceMetrics.slice(-20).reverse().map((metric, index) => (
                  <div key={index} className="p-2 rounded bg-muted/50">
                    <div className="flex items-center justify-between">
                      <Typography variant="small" className="font-medium">
                        {metric.componentName}
                      </Typography>
                      <Badge variant={metric.renderTime > 16 ? 'destructive' : 'default'}>
                        {metric.renderTime.toFixed(2)}ms
                      </Badge>
                    </div>
                    <Typography variant="small" color="muted">
                      {new Date(metric.timestamp).toLocaleTimeString()}
                    </Typography>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="errors" className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <Card className="p-3 text-center">
                <Typography variant="small" color="muted">Errors</Typography>
                <Typography variant="large" className="text-destructive">
                  {errorQueueStatus.errors}
                </Typography>
              </Card>
              <Card className="p-3 text-center">
                <Typography variant="small" color="muted">Performance</Typography>
                <Typography variant="large">
                  {errorQueueStatus.performance}
                </Typography>
              </Card>
              <Card className="p-3 text-center">
                <Typography variant="small" color="muted">User Actions</Typography>
                <Typography variant="large">
                  {errorQueueStatus.userActions}
                </Typography>
              </Card>
            </div>

            <Typography variant="small" color="muted">
              Error reporting is enabled in production environments.
            </Typography>
          </TabsContent>
        </Tabs>

        <Typography variant="small" color="muted" className="mt-4 text-center">
          Press Ctrl+Shift+L to toggle this dashboard
        </Typography>
      </Card>
    </div>
  );
};

export default LoggingDashboard;