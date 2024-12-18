import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTime = (seconds: number) => {
  const days = Math.floor(seconds / 86400); // 1 day = 86400 seconds
  const hours = Math.floor((seconds % 86400) / 3600); // Remaining hours
  const minutes = Math.floor((seconds % 3600) / 60); // Remaining minutes
  const secs = seconds % 60; // Remaining seconds

  return `${days > 0 ? `${days}d ` : ""}${hours}h ${minutes}m ${secs}s`;
};
