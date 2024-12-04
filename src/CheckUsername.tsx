import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Intro from "./pages/app-intro/page";

const CheckUsername: React.FC = () => {
  const [redirect, setRedirect] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const checkUsername = async () => {
      try {
        // Get telegram ID from Telegram WebApp
        const telegram = (window as any).Telegram.WebApp;
        const telegramId = telegram?.initDataUnsafe?.user?.id;

        if (!telegramId) {
          setRedirect(<Intro />);
          return;
        }

        // Fetch the preferred username status
        const response = await fetch(
          `https://ravegenie-vgm7.onrender.com/api/username/has/${telegramId}`
        );
        const data = await response.json();

        if (response.ok && data.hasPreferredUsername) {
          setRedirect(<Navigate to="/home" replace />);
        } else {
          setRedirect(<Intro />);
        }
      } catch (error) {
        console.error("Error checking username:", error);
        setRedirect(<Intro />);
      }
    };

    checkUsername();
  }, []);

  // Show a loader while fetching
  return redirect || <div>Loading...</div>;
};

export default CheckUsername;
