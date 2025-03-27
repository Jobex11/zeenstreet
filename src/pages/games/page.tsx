import { lazy, Suspense } from 'react';
import { ErrorBoundary, ErrorBoundaryError } from '@/components/shared/error-boundary';
// Lazy load the Home component
import { PiGameControllerDuotone } from "react-icons/pi";
const Games = lazy(() => import("@components/customs/main-app/games"));

function GameScreen() {
  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <Suspense fallback={
        <div className={"flex flex-col items-center justify-center  h-screen bg-slate-800"}>
          <p className={"text-white text-sm inconsolata"}>Updating Game State...</p>
          <PiGameControllerDuotone size={70} color='#ea580c' />
        </div>}>
        <Games />
      </Suspense>
    </ErrorBoundary>
  );
}

export default GameScreen;

