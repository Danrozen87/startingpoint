
import { Suspense } from 'react';
import { LoadingSpinner } from '@/design-system';
import { useLazyRoute } from '@/lib/hooks/useLazyRoute';

const LazyIndex = useLazyRoute(() => import('./Index'));

const LazyIndexPage = () => (
  <Suspense 
    fallback={
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" label="Loading page..." />
      </div>
    }
  >
    <LazyIndex />
  </Suspense>
);

export default LazyIndexPage;
