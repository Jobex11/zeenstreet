import MainappLayout from "@components/common/main-app/main-app-layout";
import marketImg from "@assets/images/icons/market_place.svg";
import { lazy, Suspense } from 'react';
import Loader from "@/components/common/Loader";

// Lazy load the Home component
const ComingSoon = lazy(() => import("@components/common/main-app/coming-soon"));

function Marketplace() {
  return (
    <MainappLayout>
      <Suspense fallback={Loader()}>
        <ComingSoon image={marketImg} alt="an Image showing market place" name="Marketplace" />
      </Suspense>
    </MainappLayout>
  );
}

export default Marketplace;

