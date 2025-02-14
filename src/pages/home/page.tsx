import { lazy, Suspense } from 'react';
import MainappLayout from '@components/common/main-app/main-app-layout';
import Loader from '@/components/common/Loader';
import { ErrorBoundary, ErrorBoundaryError } from '@components/common/error-boundary';
// Lazy load the Home component
const Home = lazy(() => import('@components/customs/main-app/home'));

function HomePage() {
  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <MainappLayout>
        <Suspense fallback={Loader()}>
          <Home />
        </Suspense>
      </MainappLayout>
    </ErrorBoundary>

  );
}

export default HomePage;

