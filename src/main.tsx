import * as React from "react";
import * as ReactDOM from "react-dom/client";
import '../src/index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Intro from './pages/app-intro/page';
import Home from './pages/home/page';
import Tasks from './pages/tasks/page';
import Marketplace from './pages/marketplace/page';
import Teams from './pages/teams/page';
import Games from './pages/games/page';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Intro />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/tasks",
    element: <Tasks />,
  },
  {
    path: "/marketplace",
    element: <Marketplace />,
  },
  {
    path: "/teams",
    element: <Teams />,
  },
  {
    path: "/games",
    element: <Games />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
