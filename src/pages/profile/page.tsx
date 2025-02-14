import Loader from '@/components/common/Loader';
import MainappLayout from '@components/common/main-app/main-app-layout'
import { lazy, Suspense } from 'react';
import { ErrorBoundary, ErrorBoundaryError } from '@components/common/error-boundary';
// Lazy load the Home component
const Profile = lazy(() => import('@components/customs/main-app/profile'));

function ProfilePage() {
    return (
        <MainappLayout>
            <ErrorBoundary fallback={ErrorBoundaryError}>
                <Suspense fallback={Loader()}>
                    <Profile />
                </Suspense>
            </ErrorBoundary>
        </MainappLayout>
    );
}

export default ProfilePage;
