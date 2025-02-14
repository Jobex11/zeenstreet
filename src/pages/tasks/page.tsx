import Loader from "@/components/shared/Loader";
import MainappLayout from "@/components/layouts/main-app-layout"
import { lazy, Suspense } from 'react';
import { ErrorBoundary, ErrorBoundaryError } from '@/components/shared/error-boundary';
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

