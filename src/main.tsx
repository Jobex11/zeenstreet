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
import ReduxProvider from "./components/common/provider";
import ReferralPage from "./pages/referral/page";
import ProfilePage from "./pages/profile/page";
import RankPage from "./pages/ranks/page";
import Notificaions from "./pages/main-notification/page";
import { init, backButton, setMiniAppHeaderColor } from '@telegram-apps/sdk-react';

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
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/referral",
    element: <ReferralPage />,
  },
  {
    path: "/ranks",
    element: <RankPage />,
  },
  {
    path: "/notifications",
    element: <Notificaions />,
  },
]);
// Initialize the package.
init();

// Mount the Back Button, so we will work with 
// the actual component properties.
setMiniAppHeaderColor('#292734');
backButton.mount();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider>
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode>
);

