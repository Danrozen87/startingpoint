/**
 * @file intelligentErrorGrouping.ts
 * @purpose Advanced error grouping and deduplication with production intelligence
 * @performance Optimized for real-time error analysis
 */

interface ErrorGroup {
  id: string;
  fingerprint: string;
  count: number;
  firstSeen: number;
  lastSeen: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  examples: ErrorInstance[];
  trend: 'increasing' | 'decreasing' | 'stable';
  affectedUsers: Set<string>;
  contexts: Record<string, any>[];
}

interface ErrorInstance {
  id: string;
  message: string;
  stack: string;
  timestamp: number;
  url: string;
  userAgent: string;
  userId?: string;
  sessionId: string;
  context?: Record<string, any>;
}

interface ErrorInsights {
  topErrors: ErrorGroup[];
  criticalErrors: ErrorGroup[];
  errorTrends: { timeframe: string; count: number }[];
  affectedUserCount: number;
  recommendedActions: string[];
}

class IntelligentErrorGrouper {
  private groups: Map<string, ErrorGroup> = new Map();
  private maxGroups = 1000;
  private maxExamplesPerGroup = 10;

  private generateFingerprint(error: ErrorInstance): string {
    const message = error.message || 'Unknown error';
    const stack = error.stack || '';
    
    // Extract meaningful parts of stack trace
    const stackLines = stack.split('\n').slice(0, 3);
    const relevantStack = stackLines
      .map(line => line.replace(/:\\d+:\\d+/g, '')) // Remove line numbers
      .map(line => line.replace(/https?:\/\/[^\s]+/g, '')) // Remove URLs
      .join('');
    
    const key = `${message}${relevantStack}`;
    
    // Generate consistent hash
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      const char = key.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }

  private calculateSeverity(group: ErrorGroup): 'low' | 'medium' | 'high' | 'critical' {
    const { count, affectedUsers, examples } = group;
    const latestError = examples[examples.length - 1];
    
    // Critical conditions
    if (count > 100 || affectedUsers.size > 50) return 'critical';
    if (latestError.message.toLowerCase().includes('security') || 
        latestError.message.toLowerCase().includes('auth')) return 'critical';
    
    // High severity
    if (count > 20 || affectedUsers.size > 10) return 'high';
    if (latestError.stack?.includes('React') || 
        latestError.message.toLowerCase().includes('component')) return 'high';
    
    // Medium severity
    if (count > 5 || affectedUsers.size > 2) return 'medium';
    
    return 'low';
  }

  private calculateTrend(group: ErrorGroup): 'increasing' | 'decreasing' | 'stable' {
    const recentErrors = group.examples
      .filter(e => Date.now() - e.timestamp < 3600000) // Last hour
      .length;
    
    const olderErrors = group.examples
      .filter(e => 
        Date.now() - e.timestamp >= 3600000 && 
        Date.now() - e.timestamp < 7200000 // 1-2 hours ago
      )
      .length;
    
    if (recentErrors > olderErrors * 1.5) return 'increasing';
    if (recentErrors < olderErrors * 0.5) return 'decreasing';
    return 'stable';
  }

  addError(errorInstance: ErrorInstance): ErrorGroup {
    const fingerprint = this.generateFingerprint(errorInstance);
    
    let group = this.groups.get(fingerprint);
    
    if (!group) {
      // Create new group
      group = {
        id: `group_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        fingerprint,
        count: 0,
        firstSeen: errorInstance.timestamp,
        lastSeen: errorInstance.timestamp,
        severity: 'low',
        examples: [],
        trend: 'stable',
        affectedUsers: new Set(),
        contexts: []
      };
      this.groups.set(fingerprint, group);
    }
    
    // Update group
    group.count++;
    group.lastSeen = errorInstance.timestamp;
    
    if (errorInstance.userId) {
      group.affectedUsers.add(errorInstance.userId);
    }
    
    // Add example (keep most recent and diverse examples)
    group.examples.push(errorInstance);
    if (group.examples.length > this.maxExamplesPerGroup) {
      // Keep first occurrence, most recent, and diverse middle examples
      const firstError = group.examples[0];
      const recentErrors = group.examples.slice(-3);
      const middleErrors = group.examples
        .slice(1, -3)
        .filter((_, index) => index % Math.ceil(group.examples.length / 5) === 0)
        .slice(0, 4);
      
      group.examples = [firstError, ...middleErrors, ...recentErrors];
    }
    
    // Add context
    if (errorInstance.context) {
      group.contexts.push(errorInstance.context);
      // Keep only last 20 contexts
      if (group.contexts.length > 20) {
        group.contexts = group.contexts.slice(-20);
      }
    }
    
    // Recalculate derived properties
    group.severity = this.calculateSeverity(group);
    group.trend = this.calculateTrend(group);
    
    // Manage memory
    if (this.groups.size > this.maxGroups) {
      this.cleanupOldGroups();
    }
    
    return group;
  }

  private cleanupOldGroups(): void {
    const cutoffTime = Date.now() - 7 * 24 * 60 * 60 * 1000; // 7 days
    
    // Remove old, low-impact groups
    const groupsToRemove: string[] = [];
    
    for (const [fingerprint, group] of this.groups) {
      if (group.lastSeen < cutoffTime && 
          group.severity === 'low' && 
          group.count < 5) {
        groupsToRemove.push(fingerprint);
      }
    }
    
    groupsToRemove.forEach(fingerprint => {
      this.groups.delete(fingerprint);
    });
    
    // If still too many, remove least impactful
    if (this.groups.size > this.maxGroups) {
      const sortedGroups = Array.from(this.groups.entries())
        .sort(([, a], [, b]) => {
          const scoreA = this.getGroupImpactScore(a);
          const scoreB = this.getGroupImpactScore(b);
          return scoreA - scoreB;
        });
      
      const toRemove = sortedGroups.slice(0, this.groups.size - this.maxGroups);
      toRemove.forEach(([fingerprint]) => {
        this.groups.delete(fingerprint);
      });
    }
  }

  private getGroupImpactScore(group: ErrorGroup): number {
    const severityWeight = { low: 1, medium: 3, high: 7, critical: 15 };
    const trendWeight = { decreasing: 0.5, stable: 1, increasing: 2 };
    const timeRelevance = Math.max(0, 1 - (Date.now() - group.lastSeen) / (7 * 24 * 60 * 60 * 1000));
    
    return (
      group.count * 
      severityWeight[group.severity] * 
      trendWeight[group.trend] * 
      timeRelevance * 
      Math.log(group.affectedUsers.size + 1)
    );
  }

  getInsights(): ErrorInsights {
    const groups = Array.from(this.groups.values());
    
    // Top errors by impact
    const topErrors = groups
      .sort((a, b) => this.getGroupImpactScore(b) - this.getGroupImpactScore(a))
      .slice(0, 10);
    
    // Critical errors
    const criticalErrors = groups.filter(g => g.severity === 'critical');
    
    // Error trends (last 24 hours in 4-hour buckets)
    const now = Date.now();
    const errorTrends = Array.from({ length: 6 }, (_, i) => {
      const bucketStart = now - (i + 1) * 4 * 60 * 60 * 1000;
      const bucketEnd = now - i * 4 * 60 * 60 * 1000;
      
      const count = groups.reduce((sum, group) => {
        const errorsInBucket = group.examples.filter(e => 
          e.timestamp >= bucketStart && e.timestamp < bucketEnd
        ).length;
        return sum + errorsInBucket;
      }, 0);
      
      return {
        timeframe: `${i * 4}h ago`,
        count
      };
    }).reverse();
    
    // Affected users
    const allUsers = new Set<string>();
    groups.forEach(group => {
      group.affectedUsers.forEach(user => allUsers.add(user));
    });
    
    // Generate recommendations
    const recommendations: string[] = [];
    
    if (criticalErrors.length > 0) {
      recommendations.push(`${criticalErrors.length} critical errors require immediate attention`);
    }
    
    const increasingErrors = groups.filter(g => g.trend === 'increasing');
    if (increasingErrors.length > 5) {
      recommendations.push('Multiple error types are increasing - investigate infrastructure');
    }
    
    const reactErrors = groups.filter(g => 
      g.examples.some(e => e.stack?.includes('React') || e.message.includes('component'))
    );
    if (reactErrors.length > groups.length * 0.3) {
      recommendations.push('High percentage of React-related errors - review component architecture');
    }
    
    if (allUsers.size > 100) {
      recommendations.push('Errors affecting large user base - consider emergency hotfix');
    }

    return {
      topErrors,
      criticalErrors,
      errorTrends,
      affectedUserCount: allUsers.size,
      recommendedActions: recommendations
    };
  }

  getGroup(fingerprint: string): ErrorGroup | undefined {
    return this.groups.get(fingerprint);
  }

  getAllGroups(): ErrorGroup[] {
    return Array.from(this.groups.values());
  }

  clear(): void {
    this.groups.clear();
  }

  exportData(): string {
    const data = {
      groups: Array.from(this.groups.entries()),
      insights: this.getInsights(),
      exportTime: new Date().toISOString()
    };
    return JSON.stringify(data, (key, value) => {
      if (value instanceof Set) {
        return Array.from(value);
      }
      return value;
    }, 2);
  }
}

export const errorGrouper = new IntelligentErrorGrouper();
export type { ErrorGroup, ErrorInstance, ErrorInsights };
