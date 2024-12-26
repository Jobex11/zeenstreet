import MainappLayout from "@components/common/main-app/main-app-layout"
import { lazy, Suspense } from 'react';
import Loader from "@components/common/Loader";

// Lazy load the Home component
const GlobalLeaderboard = lazy(() => import('@components/customs/main-app/leader-board'));

function LeaderBoard() {
    return (
        <MainappLayout>
            <Suspense fallback={Loader()}>
                <GlobalLeaderboard />
            </Suspense>
        </MainappLayout>
    );
}

export default LeaderBoard;

