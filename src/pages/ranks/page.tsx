import { lazy, Suspense } from 'react';
import MainappLayout from '@components/common/main-app/main-app-layout';
import Loader from '@/components/common/Loader';

// Lazy load the Home component
const Ranks = lazy(() => import('@components/customs/main-app/ranks'));

function RankPage() {
    return (
        <MainappLayout>
          <Suspense fallback={Loader()}>
                <Ranks />
            </Suspense>
        </MainappLayout>
    );
}

export default RankPage;

