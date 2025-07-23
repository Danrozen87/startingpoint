
/**
 * @file usePerformance.ts
 * @purpose Monitor component render performance and prop changes
 * @dependencies React (useEffect, useRef)
 * @ai-context Development tool for performance monitoring
 * @performance Minimal overhead, only active in development
 */

import { useEffect, useRef } from 'react';

interface PerformanceOptions {
  logRenders?: boolean;
  logProps?: boolean;
  componentName?: string;
}

/**
 * Hook for monitoring component performance and render patterns
 * @param componentName Name of the component for debugging
 * @param props Component props to monitor for changes
 * @param options Configuration options
 * @param options.logRenders Whether to log render count
 * @param options.logProps Whether to log prop changes
 * @returns Object with performance metrics
 * 
 * @example
 * const MyComponent = (props) => {
 *   const { renderCount } = usePerformance('MyComponent', props, {
 *     logRenders: true,
 *     logProps: true
 *   });
 *   
 *   return <div>Rendered {renderCount} times</div>;
 * };
 * 
 * @ai-context Use in development to identify performance issues
 * @performance Only active in development mode
 */
export function usePerformance(
  componentName: string,
  props?: Record<string, any>,
  options: PerformanceOptions = {}
) {
  const renderCount = useRef(0);
  const prevProps = useRef(props);
  const { logRenders = false, logProps = false } = options;

  // Track render count
  useEffect(() => {
    renderCount.current += 1;
    
    if (process.env.NODE_ENV === 'development' && logRenders) {
      console.log(`[${componentName}] Render #${renderCount.current}`);
    }
  });

  // Track prop changes
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && logProps && props) {
      const changedProps = Object.keys(props).filter(
        key => prevProps.current?.[key] !== props[key]
      );
      
      if (changedProps.length > 0) {
        console.log(`[${componentName}] Props changed:`, changedProps);
      }
    }
    
    prevProps.current = props;
  }, [props, componentName, logProps]);

  return {
    renderCount: renderCount.current,
  };
}
