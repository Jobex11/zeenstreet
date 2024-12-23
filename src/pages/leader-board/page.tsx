import MainappLayout from "@components/common/main-app/main-app-layout"
import leaderBoardImg from "@assets/images/icons/leader_board.svg"
import { lazy, Suspense } from 'react';
import Loader from "@/components/common/Loader";

// Lazy load the Home component
const ComingSoon = lazy(() => import('@components/common/main-app/coming-soon'));

function LeaderBoard() {
    return (
        <MainappLayout>
            <Suspense fallback={Loader()}>
                <ComingSoon image={leaderBoardImg} alt="an Image showing" name="Leader Board" />
            </Suspense>
        </MainappLayout>
    );
}

export default LeaderBoard;

