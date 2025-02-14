import MainappLayout from "@components/common/main-app/main-app-layout"
import { lazy, Suspense } from 'react';
import Loader from "@components/common/Loader";
import { ErrorBoundary, ErrorBoundaryError } from '@components/common/error-boundary';
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

