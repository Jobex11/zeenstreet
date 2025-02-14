import Loader from '@components/common/Loader';
import MainappLayout from '@components/common/main-app/main-app-layout'
import { lazy, Suspense } from 'react';
import { ErrorBoundary, ErrorBoundaryError } from '@components/common/error-boundary';
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

