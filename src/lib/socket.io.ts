import { io } from "socket.io-client";

const socketUrl = 'http://localhost:4000';

export const socket = io(socketUrl);
