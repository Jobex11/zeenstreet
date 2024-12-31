import { io } from "socket.io-client";

export const socket = io(
    process.env.NODE_ENV === "production"
      ? "https://ravegenie-backend.onrender.com" 
      : "https://ravegenie-backend.onrender.com"           
  );
