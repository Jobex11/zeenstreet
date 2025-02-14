import { lazy, Suspense } from 'react';
import Loader from '@/components/shared/Loader';
import { ErrorBoundary, ErrorBoundaryError } from '@/components/shared/error-boundary';
// Lazy load the Home component
const ZeenAppIntro = lazy(() => import("@components/customs/app-intro/page"));

function Intro() {
    return (
        <ErrorBoundary fallback={ErrorBoundaryError}>
            <Suspense fallback={Loader()}>
                <ZeenAppIntro />
            </Suspense>
        </ErrorBoundary>
    );
}

export default Intro;

