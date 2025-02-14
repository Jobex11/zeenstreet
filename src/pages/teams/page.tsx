import Loader from "@/components/shared/Loader";
import MainappLayout from "@/components/layouts/main-app-layout"
import { lazy, Suspense } from 'react';
import { ErrorBoundary, ErrorBoundaryError } from '@/components/shared/error-boundary';
// Lazy load the Home component
const Referral = lazy(() => import('@components/customs/main-app/tasks'));

function Teams() {
  return (
    <MainappLayout>
      <ErrorBoundary fallback={ErrorBoundaryError}>
        <Suspense fallback={Loader()}>
          <Referral />
        </Suspense>
      </ErrorBoundary>
    </MainappLayout>
  );
}

export default Teams;

