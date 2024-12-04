import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "../src/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Intro from "./pages/app-intro/page";
import Home from "./pages/home/page";
import Tasks from "./pages/tasks/page";
import Marketplace from "./pages/marketplace/page";
import Teams from "./pages/teams/page";
import Games from "./pages/games/page";
import ReduxProvider from "./components/common/provider";
import ReferralPage from "./pages/referral/page";
import ProfilePage from "./pages/profile/page";
import RankPage from "./pages/ranks/page";
import Notificaions from "./pages/main-notification/page";
import AppWrapper from "./AppWrapper";

// Define routes using createBrowserRouter
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

// Render the app
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider>
      <AppWrapper>
        <RouterProvider router={router} />
      </AppWrapper>
    </ReduxProvider>
  </React.StrictMode>
);

/*
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider>
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode>
);


*/
