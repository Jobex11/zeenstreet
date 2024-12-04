import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkUsername = async () => {
      try {
        const telegramData = window.Telegram.WebApp.initDataUnsafe.user; // Ensure this works in your environment
        const telegramId = telegramData.id;

        // Check if user has a preferred username
        const response = await axios.get(
          `https://ravegenie-vgm7.onrender.com/api/username/has/${telegramId}`
        );
        const { hasPreferredUsername } = response.data;

        // Redirect based on the response
        if (hasPreferredUsername) {
          navigate("/home"); // Redirect to home if username exists
        } else {
          navigate("/intro"); // Redirect to intro if username does not exist
        }
      } catch (error) {
        console.error("Error checking username:", error);
        navigate("/intro"); // Default to intro on error
      } finally {
        setIsChecking(false);
      }
    };

    checkUsername();
  }, [navigate]);

  if (isChecking) {
    return <div>Loading...</div>; // Optional loading screen while checking
  }

  return <>{children}</>;
};

export default AppWrapper;
