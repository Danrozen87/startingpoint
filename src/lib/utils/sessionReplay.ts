/**
 * @file sessionReplay.ts
 * @purpose User session replay for debugging critical errors
 * @performance Lightweight recording with smart compression
 */

interface UserAction {
  type: 'click' | 'scroll' | 'input' | 'navigation' | 'error' | 'performance';
  timestamp: number;
  target?: string;
  value?: any;
  coordinates?: { x: number; y: number };
  url?: string;
  metadata?: Record<string, any>;
}

interface SessionData {
  sessionId: string;
  userId?: string;
  startTime: number;
  endTime?: number;
  actions: UserAction[];
  errors: Array<{ timestamp: number; error: any }>;
  performance: Array<{ timestamp: number; metric: string; value: number }>;
  viewport: { width: number; height: number };
  userAgent: string;
}

class SessionReplayRecorder {
  private sessionData: SessionData;
  private isRecording = false;
  private maxActions = 500;
  private recordingStartTime: number;
  private compressionEnabled = true;

  constructor() {
    this.sessionData = this.initializeSession();
    this.recordingStartTime = Date.now();
    
    if (import.meta.env.MODE === 'production') {
      this.startRecording();
    }
  }

  private initializeSession(): SessionData {
    return {
      sessionId: this.generateSessionId(),
      startTime: Date.now(),
      actions: [],
      errors: [],
      performance: [],
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      userAgent: navigator.userAgent
    };
  }

  private generateSessionId(): string {
    return `replay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getElementSelector(element: Element): string {
    // Generate a unique selector for the element
    if (element.id) return `#${element.id}`;
    
    const path: string[] = [];
    let current = element;
    
    while (current && current !== document.body) {
      let selector = current.tagName.toLowerCase();
      
      if (current.className) {
        const classes = current.className.split(' ')
          .filter(cls => cls && !cls.startsWith('css-')) // Filter out CSS-in-JS classes
          .slice(0, 2) // Max 2 classes for brevity
          .join('.');
        if (classes) selector += `.${classes}`;
      }
      
      // Add position if needed for uniqueness
      const siblings = Array.from(current.parentElement?.children || [])
        .filter(child => child.tagName === current.tagName);
      if (siblings.length > 1) {
        const index = siblings.indexOf(current);
        selector += `:nth-of-type(${index + 1})`;
      }
      
      path.unshift(selector);
      current = current.parentElement!;
      
      if (path.length > 4) break; // Limit depth
    }
    
    return path.join(' > ');
  }

  private recordAction(action: UserAction): void {
    if (!this.isRecording) return;
    
    this.sessionData.actions.push(action);
    
    // Maintain buffer size
    if (this.sessionData.actions.length > this.maxActions) {
      // Keep critical actions (errors, navigation) and recent actions
      const criticalActions = this.sessionData.actions.filter(a => 
        a.type === 'error' || a.type === 'navigation'
      );
      const recentActions = this.sessionData.actions.slice(-Math.floor(this.maxActions * 0.8));
      
      this.sessionData.actions = [...criticalActions, ...recentActions]
        .sort((a, b) => a.timestamp - b.timestamp)
        .slice(-this.maxActions);
    }
  }

  private setupEventListeners(): void {
    // Click tracking
    document.addEventListener('click', (event) => {
      const target = event.target as Element;
      this.recordAction({
        type: 'click',
        timestamp: Date.now(),
        target: this.getElementSelector(target),
        coordinates: { x: event.clientX, y: event.clientY },
        metadata: {
          button: event.button,
          ctrlKey: event.ctrlKey,
          shiftKey: event.shiftKey
        }
      });
    }, { passive: true });

    // Scroll tracking (throttled)
    let scrollTimeout: NodeJS.Timeout;
    document.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.recordAction({
          type: 'scroll',
          timestamp: Date.now(),
          coordinates: { x: window.scrollX, y: window.scrollY }
        });
      }, 100);
    }, { passive: true });

    // Input tracking (debounced for privacy)
    let inputTimeout: NodeJS.Timeout;
    document.addEventListener('input', (event) => {
      const target = event.target as HTMLInputElement;
      clearTimeout(inputTimeout);
      
      inputTimeout = setTimeout(() => {
        // Don't record sensitive input values
        const isSensitive = target.type === 'password' || 
                          target.autocomplete?.includes('password') ||
                          target.name?.toLowerCase().includes('password');
        
        this.recordAction({
          type: 'input',
          timestamp: Date.now(),
          target: this.getElementSelector(target),
          value: isSensitive ? '[REDACTED]' : target.value?.substring(0, 50), // Limit length
          metadata: {
            inputType: target.type,
            placeholder: target.placeholder
          }
        });
      }, 500);
    }, { passive: true });

    // Navigation tracking
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    
    history.pushState = function(...args) {
      originalPushState.apply(this, args);
      sessionReplayRecorder.recordAction({
        type: 'navigation',
        timestamp: Date.now(),
        url: window.location.href,
        metadata: { method: 'pushState' }
      });
    };
    
    history.replaceState = function(...args) {
      originalReplaceState.apply(this, args);
      sessionReplayRecorder.recordAction({
        type: 'navigation',
        timestamp: Date.now(),
        url: window.location.href,
        metadata: { method: 'replaceState' }
      });
    };

    window.addEventListener('popstate', () => {
      this.recordAction({
        type: 'navigation',
        timestamp: Date.now(),
        url: window.location.href,
        metadata: { method: 'popstate' }
      });
    });

    // Viewport changes
    window.addEventListener('resize', () => {
      this.sessionData.viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      };
    });
  }

  startRecording(): void {
    if (this.isRecording) return;
    
    this.isRecording = true;
    this.setupEventListeners();
    
    this.recordAction({
      type: 'navigation',
      timestamp: Date.now(),
      url: window.location.href,
      metadata: { reason: 'session_start' }
    });
  }

  stopRecording(): void {
    this.isRecording = false;
    this.sessionData.endTime = Date.now();
  }

  recordError(error: any, context?: Record<string, any>): void {
    this.sessionData.errors.push({
      timestamp: Date.now(),
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name,
        context
      }
    });

    // Mark this action as critical
    this.recordAction({
      type: 'error',
      timestamp: Date.now(),
      metadata: {
        errorMessage: error.message,
        severity: 'high'
      }
    });
  }

  recordPerformanceMetric(metric: string, value: number): void {
    this.sessionData.performance.push({
      timestamp: Date.now(),
      metric,
      value
    });

    if (value > 100) { // Slow operations
      this.recordAction({
        type: 'performance',
        timestamp: Date.now(),
        metadata: {
          metric,
          value,
          severity: 'medium'
        }
      });
    }
  }

  getSessionData(): SessionData {
    return { ...this.sessionData };
  }

  getSessionSummary(): {
    sessionId: string;
    duration: number;
    actionCount: number;
    errorCount: number;
    lastUrl: string;
  } {
    const lastAction = this.sessionData.actions[this.sessionData.actions.length - 1];
    
    return {
      sessionId: this.sessionData.sessionId,
      duration: Date.now() - this.sessionData.startTime,
      actionCount: this.sessionData.actions.length,
      errorCount: this.sessionData.errors.length,
      lastUrl: lastAction?.url || window.location.href
    };
  }

  exportSession(): string {
    const data = this.getSessionData();
    
    if (this.compressionEnabled) {
      // Simple compression - remove redundant data
      const compressed = {
        ...data,
        actions: data.actions.map(action => ({
          ...action,
          timestamp: action.timestamp - this.recordingStartTime // Relative timestamps
        }))
      };
      
      return JSON.stringify(compressed);
    }
    
    return JSON.stringify(data, null, 2);
  }

  clear(): void {
    this.sessionData = this.initializeSession();
    this.recordingStartTime = Date.now();
  }

  // Privacy controls
  pauseRecording(): void {
    this.isRecording = false;
  }

  resumeRecording(): void {
    this.isRecording = true;
  }

  enableCompression(enable: boolean): void {
    this.compressionEnabled = enable;
  }
}

export const sessionReplayRecorder = new SessionReplayRecorder();
export type { UserAction, SessionData };
