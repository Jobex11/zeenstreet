import MainappLayout from "@/components/layouts/main-app-layout"
import { lazy, Suspense } from 'react';
import Loader from "@/components/shared/Loader";
import { ErrorBoundary, ErrorBoundaryError } from '@/components/shared/error-boundary';
// Lazy load the Home component
const GlobalLeaderboard = lazy(() => import('@components/customs/main-app/leader-board'));

function LeaderBoard() {
    return (
        <MainappLayout>
            <ErrorBoundary fallback={ErrorBoundaryError}>
                <Suspense fallback={Loader()}>
                    <GlobalLeaderboard />
                </Suspense>
            </ErrorBoundary>
        </MainappLayout>
    );
}

export default LeaderBoard;

