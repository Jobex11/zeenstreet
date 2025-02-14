import MainappLayout from "@/components/layouts/main-app-layout";
import marketImg from "@assets/images/icons/market_place.svg";
import { lazy, Suspense } from 'react';
import Loader from "@/components/shared/Loader";
import { ErrorBoundary, ErrorBoundaryError } from '@/components/shared/error-boundary';
// Lazy load the Home component
const ComingSoon = lazy(() => import("@components/common/main-app/coming-soon"));

function Marketplace() {
  return (
    <MainappLayout>
      <ErrorBoundary fallback={ErrorBoundaryError}>
        <Suspense fallback={Loader()}>
          <ComingSoon image={marketImg} alt="an Image showing market place" name="Marketplace" />
        </Suspense>
      </ErrorBoundary>
    </MainappLayout>
  );
}

export default Marketplace;

