import MainappLayout from "@components/common/main-app/main-app-layout"
import gameImg from "@assets/images/icons/games.svg"
import { lazy, Suspense } from 'react';
import Loader from "@/components/common/Loader";

// Lazy load the Home component
const ComingSoon = lazy(() => import('@components/common/main-app/coming-soon'));

function Games() {
  return (
    <MainappLayout>
      <Suspense fallback={Loader()}>
        <ComingSoon image={gameImg} alt="an Image showing" name="Games" />
      </Suspense>
    </MainappLayout>
  );
}

export default Games;

