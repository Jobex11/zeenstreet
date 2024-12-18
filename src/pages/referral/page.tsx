import Loader from "@/components/common/Loader";
import MainappLayout from "@components/common/main-app/main-app-layout"
import { lazy, Suspense } from 'react';

// Lazy load the Home component
const Referral = lazy(() => import('@components/customs/main-app/refferal'));

function ReferralPage() {
    return (
        <MainappLayout>
            <Suspense fallback={Loader()}>
                <Referral />
            </Suspense>
        </MainappLayout>
    );
}

export default ReferralPage;

