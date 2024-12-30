import { io } from "socket.io-client";

export const socket = io(
    process.env.NODE_ENV === "production"
      ? "https://ravegenie-vgm7.onrender.com" 
      : "https://ravegenie-vgm7.onrender.com"           
  );
