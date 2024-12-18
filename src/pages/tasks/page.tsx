import Loader from "@/components/common/Loader";
import MainappLayout from "@components/common/main-app/main-app-layout"
import { lazy, Suspense } from 'react';

// Lazy load the Home component
const Tasks = lazy(() => import('@components/customs/main-app/tasks'));

function TasksPage() {
  return (
    <MainappLayout>
      <Suspense fallback={Loader()}>
        <Tasks />
      </Suspense>
    </MainappLayout>
  );
}

export default TasksPage;

