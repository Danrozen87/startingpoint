
import { useEffect, useRef } from 'react';

interface PerformanceOptions {
  logRenders?: boolean;
  logProps?: boolean;
  componentName?: string;
}

export function usePerformance(
  componentName: string,
  props?: Record<string, any>,
  options: PerformanceOptions = {}
) {
  const renderCount = useRef(0);
  const prevProps = useRef(props);
  const { logRenders = false, logProps = false } = options;

  useEffect(() => {
    renderCount.current += 1;
    
    if (process.env.NODE_ENV === 'development' && logRenders) {
      console.log(`[${componentName}] Render #${renderCount.current}`);
    }
  });

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
