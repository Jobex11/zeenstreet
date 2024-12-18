import Loader from '@/components/common/Loader';
import MainappLayout from '@components/common/main-app/main-app-layout'
import { lazy, Suspense } from 'react';

// Lazy load the Home component
const MailNotification = lazy(() => import('@components/customs/main-app/mails'));

function Notificaions() {
    return (
        <MainappLayout>
            <Suspense fallback={Loader()}>
                <MailNotification />
            </Suspense>
        </MainappLayout>
    );
}

export default Notificaions;

