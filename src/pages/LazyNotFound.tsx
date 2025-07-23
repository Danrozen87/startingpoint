
import { Suspense } from 'react';
import { LoadingSpinner } from '@/design-system';
import { useLazyRoute } from '@/lib/hooks/useLazyRoute';

const LazyNotFound = useLazyRoute(() => import('./NotFound'));

const LazyNotFoundPage = () => (
  <Suspense 
    fallback={
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" label="Loading page..." />
      </div>
    }
  >
    <LazyNotFound />
  </Suspense>
);

export default LazyNotFoundPage;
