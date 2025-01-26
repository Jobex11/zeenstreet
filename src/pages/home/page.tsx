import { lazy, Suspense } from 'react';
import MainappLayout from '@components/common/main-app/main-app-layout';
import Loader from '@/components/common/Loader';

// Lazy load the Home component
const Home = lazy(() => import('@components/customs/main-app/home'));

function HomePage() {
  return (
    <MainappLayout>
      <Suspense fallback={Loader()}>
          <Home />
      </Suspense>
    </MainappLayout>
  );
}

export default HomePage;

