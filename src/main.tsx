import React from "react";
import ReactDOM from "react-dom/client";
import "../src/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/page";
import Tasks from "./pages/tasks/page";
import Marketplace from "./pages/marketplace/page";
import Teams from "./pages/teams/page";
import GameScreen from "./pages/games/page";
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
import { ErrorBoundary, ErrorBoundaryError } from '@components/common/error-boundary';
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./lib/store";
import Loader from "./components/common/Loader";

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
    element: <GameScreen />,
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
      <ErrorBoundary fallback={ErrorBoundaryError}>
        <ReduxProvider>
          <PersistGate loading={<Loader />} persistor={persistor}>
            <TelegramWrapper>
              <RouterProvider router={router} />
            </TelegramWrapper>
          </PersistGate>
        </ReduxProvider>
      </ErrorBoundary>
    </TonConnectUIProvider>
  </React.StrictMode>
);

