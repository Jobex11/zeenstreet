import { lazy, Suspense } from 'react';
import MainappLayout from '@/components/layouts/main-app-layout';
import Loader from '@/components/shared/Loader';
import { ErrorBoundary, ErrorBoundaryError } from '@/components/shared/error-boundary';
// Lazy load the Home component
const Ranks = lazy(() => import('@components/customs/main-app/ranks'));

function RankPage() {
    return (
        <MainappLayout>
            <ErrorBoundary fallback={ErrorBoundaryError}>
                <Suspense fallback={Loader()}>
                    <Ranks />
                </Suspense>
            </ErrorBoundary>
        </MainappLayout>
    );
}

export default RankPage;

