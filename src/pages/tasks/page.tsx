import Loader from "@/components/common/Loader";
import MainappLayout from "@components/common/main-app/main-app-layout"
import { lazy, Suspense } from 'react';
import { ErrorBoundary, ErrorBoundaryError } from '@components/common/error-boundary';
// Lazy load the Home component
const Tasks = lazy(() => import('@components/customs/main-app/tasks'));
function TasksPage() {
  return (
    <MainappLayout>
      <ErrorBoundary fallback={ErrorBoundaryError}>
        <Suspense fallback={Loader()}>
          <Tasks />
        </Suspense>
      </ErrorBoundary>
    </MainappLayout>
  );
}

export default TasksPage;

