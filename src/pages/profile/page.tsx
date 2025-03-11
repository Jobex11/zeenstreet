import Loader from '@/components/shared/Loader';
import MainappLayout from '@/components/layouts/main-app-layout'
import { lazy, Suspense } from 'react';
import { ErrorBoundary, ErrorBoundaryError } from '@/components/shared/error-boundary';

const Profile = lazy(() => import('@/components/customs/main-app/profile'));

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
