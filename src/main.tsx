import React from "react";
import ReactDOM from "react-dom/client";
import "../src/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/page";
import Tasks from "./pages/tasks/page";
import Marketplace from "./pages/marketplace/page";
import Teams from "./pages/teams/page";
import Games from "./pages/games/page";
import ReduxProvider from "./components/common/provider";
import ReferralPage from "./pages/referral/page";
import ProfilePage from "./pages/profile/page";
import RankPage from "./pages/ranks/page";
import Notifications from "./pages/main-notification/page";
import TelegramWrapper from "./components/common/Telegram.app.layout";
import 'react-lazy-load-image-component/src/effects/blur.css';
import Intro from "./pages/app-intro/page";
import { TonConnectUIProvider } from '@tonconnect/ui-react';

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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl="https://jade-obedient-tick-519.mypinata.cloud/files/bafkreiahwouhwspzt3n7gh7vah43hj33wkvjckstidqnjyhaxeetmvwmx4?X-Algorithm=PINATA1&X-Date=1734342728&X-Expires=30&X-Method=GET&X-Signature=9d270f115e63f5caef98caff92a0bde36a486c19336659bed43874157340ec69">
      <ReduxProvider>
        <TelegramWrapper>
          <RouterProvider router={router} />
        </TelegramWrapper>
      </ReduxProvider>
    </TonConnectUIProvider>
  </React.StrictMode>
);

