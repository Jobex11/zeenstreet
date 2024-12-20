import Loader from '@/components/common/Loader';
import MainappLayout from '@components/common/main-app/main-app-layout'
import { lazy, Suspense } from 'react';

// Lazy load the Home component
const Profile = lazy(() => import('@components/customs/main-app/profile'));

function ProfilePage() {
    return (
        <MainappLayout>
            <Suspense fallback={Loader()}>
                <Profile />
            </Suspense>
        </MainappLayout>
    );
}

export default ProfilePage;
