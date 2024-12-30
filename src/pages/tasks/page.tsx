import Loader from "@/components/common/Loader";
import MainappLayout from "@components/common/main-app/main-app-layout"
import { lazy, Suspense } from 'react';

// Lazy load the Home component
const Tasks = lazy(() => import('@components/customs/main-app/tasks'));
const StoriesLayout = lazy(() => import('@components/common/stories'))
function TasksPage() {
  return (
    <MainappLayout>
      <Suspense fallback={Loader()}>
        <StoriesLayout>
          <Tasks />
        </StoriesLayout>
      </Suspense>
    </MainappLayout>
  );
}

export default TasksPage;

