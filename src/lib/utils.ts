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

  return `${days > 0 ? `${days}d ` : ""} ${hours > 0 ? `${hours}h` : ""} ${minutes > 0 ? `${minutes}m` : ""} ${secs}s`;
};

export type UserProps = {
  user: {
    name: string;
    totalShares: number;
  };
};

export function formatGameTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
}



type RankData = { rank: string; min: number; max: number };

interface WealthClassData {
  SOL: string;
  USDT: string;
  shares: string;
  createdAt: string;
  maxRank: number;
  minRank: number;
  name: string;
  requiredCards: number;
  sharesReward: number;
}

export const getUnlockDetails = (
  totalShares: number,
  rankData: RankData[],
  wealthClass: WealthClassData
): string => {
  // Determine the user's rank
  const rank = getUserRank(totalShares, rankData);

  // Calculate how many cards the user still needs to unlock
  const cardsNeeded = wealthClass?.requiredCards - (totalShares / wealthClass?.sharesReward);

  // If user is already above the required shares
  if (cardsNeeded <= 0) {
    return `You have already unlocked ${wealthClass?.name}. Your rank is ${rank}.`;
  }

  // Determine the rank the user is in
  const userRank = totalShares >= wealthClass?.minRank ? rank : "Nobody";

  return `To unlock ${wealthClass?.name}, you need ${cardsNeeded.toFixed(0)} more cards and ${userRank} rank.`;
};


export const getUserRank = (totalShares: number | null, rankData: RankData[]): string => {
  if (!rankData || rankData?.length === 0) return "Nobody";

  for (const rank of rankData) {
    if (totalShares && totalShares >= rank?.min && totalShares <= rank?.max) {
      return rank?.rank;
    }
  }

  // If totalShares exceeds the maximum range, return the highest rank
  const highestRank = rankData[rankData.length - 1];
  return totalShares && totalShares > highestRank.max ? highestRank.rank : "Nobody";
};



export const getRankIconColor = (rank: string): string => {
  switch (rank) {
    case "Nobody":
      return "#9E9E9E"; // Gray
    case "Velatus":
      return "#FF5722"; // Orange
    case "Legionary":
      return "#FFC107"; // Amber
    case "Decanus":
      return "#03A9F4"; // Light Blue
    case "Centurion":
      return "#0288D1"; // Dark Blue
    case "Tribune i":
      return "#4CAF50"; // Green
    case "Tribune ii":
      return "#8BC34A"; // Light Green
    case "Tribune iii":
      return "#CDDC39"; // Lime
    case "Tribune iv":
      return "#FFEB3B"; // Yellow
    case "Praetor i":
      return "#FFC107"; // Deep Amber
    case "Praetor ii":
      return "#FF9800"; // Deep Orange
    case "Praetor iii":
      return "#FF5722"; // Red Orange
    case "Praetor iv":
      return "#673AB7"; // Deep Purple
    case "Legatus i":
      return "#9C27B0"; // Purple
    case "Legatus ii":
      return "#E91E63"; // Pink
    case "Legatus iii":
      return "#F44336"; // Red
    case "Legatus iv":
      return "#2196F3"; // Blue
    case "Dominus i":
      return "#3F51B5"; // Indigo
    case "Dominus ii":
      return "#009688"; // Teal
    case "Dominus iii":
      return "#4CAF50"; // Green
    case "Dominus iv":
      return "#8BC34A"; // Light Green
    case "Consul i":
      return "#CDDC39"; // Lime
    case "Consul ii":
      return "#FFEB3B"; // Yellow
    case "Consul iii":
      return "#FFC107"; // Amber
    case "Consul iv":
      return "#FF9800"; // Orange
    case "Imperator i":
      return "#FF5722"; // Red Orange
    case "Imperator ii":
      return "#795548"; // Brown
    case "Imperator iii":
      return "#607D8B"; // Blue Gray
    case "Imperator iv":
      return "#3E2723"; // Dark Brown
    case "Supreme Imperator":
      return "#000000"; // Black
    case "Rex":
      return "#212121"; // Deep Black
    case "Caesar":
      return "#880E4F"; // Dark Magenta
    case "Augustus":
      return "#B71C1C"; // Crimson Red
    case "Regis Maximus":
      return "#B0B0B0"; // Default Gray
    default:
      return "#B0B0B0"; // Default fallback color
  }
};



interface MatchedData {
  name: string; // The name of the wealth class
  minRank: number; // Minimum rank (inclusive)
  maxRank: number; // Maximum rank (inclusive)
  requiredCards: number; // Number of required cards to unlock
}

interface UnlockedCard {
  wealthClass: string; // The name of the wealth class this card belongs to
}

type CheckWealthClassUnlock = (
  userShares: number,
  unlockedCards: UnlockedCard[],
  matchedData: MatchedData | null // Can be null if no data is matched
) => boolean;



export const checkWealthClassUnlock: CheckWealthClassUnlock = (
  userShares,
  unlockedCards,
  matchedData
) => {
  if (!matchedData) return false;

  // Clamp userShares to ensure it stays within the range
  const clampedUserShares = Math.min(
    Math.max(userShares, matchedData.minRank),
    matchedData.maxRank
  );

  // Check if within rank
  const isWithinRank =
    clampedUserShares >= matchedData.minRank &&
    clampedUserShares <= matchedData.maxRank;
  console.log(
    "isWithinRank:",
    isWithinRank,
    "clampedUserShares:",
    clampedUserShares,
    "minRank:",
    matchedData?.minRank,
    "maxRank:",
    matchedData?.maxRank
  );

  // Check if required cards are collected
  const unlockedCardsForClass = unlockedCards?.filter(
    (card) => card.wealthClass === matchedData.name
  ).length;
  const hasRequiredCards = unlockedCardsForClass >= matchedData?.requiredCards;
  console.log(
    "unlockedCardsForClass:",
    unlockedCardsForClass,
    "requiredCards:",
    matchedData?.requiredCards
  );

  // Determine if unlocked
  return isWithinRank && hasRequiredCards;
};


export function triggerErrorVibration() {
  if (navigator.vibrate) {
    navigator.vibrate([200]);
  } else {
    console.warn("Vibration API is not supported on this device.");
  }
}
