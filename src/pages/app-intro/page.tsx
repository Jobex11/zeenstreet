import { lazy, Suspense } from 'react';
import Loader from '@/components/common/Loader';

// Lazy load the Home component
const ZeenAppIntro = lazy(() => import("@components/customs/app-intro/page"));

function Intro() {
    return (
        <Suspense fallback={Loader()}>
            <ZeenAppIntro />
        </Suspense>
    );
}

export default Intro;

