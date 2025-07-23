
import { lazy, ComponentType, LazyExoticComponent } from 'react';

interface LazyRouteOptions {
  retryCount?: number;
  retryDelay?: number;
}

export function useLazyRoute<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: LazyRouteOptions = {}
): LazyExoticComponent<T> {
  const { retryCount = 3, retryDelay = 1000 } = options;

  return lazy(() => {
    return new Promise<{ default: T }>((resolve, reject) => {
      let attempts = 0;
      
      const tryImport = async () => {
        try {
          const module = await importFn();
          resolve(module);
        } catch (error) {
          attempts++;
          
          if (attempts < retryCount) {
            setTimeout(tryImport, retryDelay * attempts);
          } else {
            reject(error);
          }
        }
      };
      
      tryImport();
    });
  });
}
