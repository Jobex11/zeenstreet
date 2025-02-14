import Loader from '@/components/shared/Loader';
import MainappLayout from '@/components/layouts/main-app-layout'
import { lazy, Suspense } from 'react';
import { ErrorBoundary, ErrorBoundaryError } from '@/components/shared/error-boundary';
// Lazy load the Home component
const MailNotification = lazy(() => import('@components/customs/main-app/mails'));

function Notificaions() {
    return (
        <MainappLayout>
            <ErrorBoundary fallback={ErrorBoundaryError}>
                <Suspense fallback={Loader()}>
                    <MailNotification />
                </Suspense>
            </ErrorBoundary>
        </MainappLayout>
    );
}

export default Notificaions;

