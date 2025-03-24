import { lazy, Suspense } from 'react';
import Loader from "@/components/shared/Loader";
import { ErrorBoundary, ErrorBoundaryError } from '@/components/shared/error-boundary';
// Lazy load the Home component
const Games = lazy(() => import("@components/customs/main-app/games"));

function GameScreen() {
  return (
      <ErrorBoundary fallback={ErrorBoundaryError}>
        <Suspense fallback={Loader()}>
          <Games />
        </Suspense>
      </ErrorBoundary>
  );
}

export default GameScreen;

