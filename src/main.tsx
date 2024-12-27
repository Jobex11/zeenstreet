import React from "react";
import ReactDOM from "react-dom/client";
import "../src/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/page";
import Tasks from "./pages/tasks/page";
import Marketplace from "./pages/marketplace/page";
import Teams from "./pages/teams/page";
import Games from "./pages/games/page";
import ReduxProvider from "@components/common/provider";
import ReferralPage from "./pages/referral/page";
import ProfilePage from "./pages/profile/page";
import RankPage from "./pages/ranks/page";
import Notifications from "./pages/main-notification/page";
import TelegramWrapper from "./components/common/Telegram.app.layout";
import 'react-lazy-load-image-component/src/effects/blur.css';
import Intro from "./pages/app-intro/page";
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import LeaderBoard from "./pages/leader-board/page";
import ErrorBoundary from '@components/common/error-boundary';

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
    element: <Notifications />,
  },
  {
    path: "/leader-board",
    element: <LeaderBoard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TonConnectUIProvider
      manifestUrl='https://zeenstreet-ten.vercel.app/tonconnect-manifest.json'
      actionsConfiguration={{
        twaReturnUrl: 'https://t.me/RaveGenie_Bot/game'
      }}
    >
      <ReduxProvider>
        <TelegramWrapper>
          <ErrorBoundary>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </TelegramWrapper>
      </ReduxProvider>
    </TonConnectUIProvider>
  </React.StrictMode>
);

