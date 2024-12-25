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

export type UserProps = {
  user: {
    name: string;
    totalShares: number;
  };
};


type Rank = "Top Leader" | "Mid Leader" | "Bottom Feader";

const getUserRank = (totalShares: number): Rank => {
  if (totalShares >= 100000) {
    return "Top Leader";
  } else if (totalShares >= 5000) {
    return "Mid Leader";
  } else if (totalShares >= 1000) {
    return "Bottom Feader";
  }


  return "Bottom Feader";
};

export default getUserRank;



export const getRankIconColor = (rank: string): string => {
  switch (rank) {
    case "Top Leader":
      return "#FFD700"; // Gold
    case "Mid Leader":
      return "#4CAF50"; // Green
    case "Bottom Feader":
      return "#D25804"; // Orange
    default:
      return "#B0B0B0"; // Default grey for unknown rank
  }
};
