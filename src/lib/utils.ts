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
  const cardsNeeded = wealthClass.requiredCards - (totalShares / wealthClass.sharesReward);
  
  // If user is already above the required shares
  if (cardsNeeded <= 0) {
    return `You have already unlocked ${wealthClass.name}. Your rank is ${rank}.`;
  }

  // Determine the rank the user is in
  const userRank = totalShares >= wealthClass.minRank ? rank : "Nobody";

  return `To unlock ${wealthClass.name}, you need ${cardsNeeded.toFixed(0)} more cards and ${userRank} rank.`;
};


export const getUserRank = (totalShares: number, rankData: RankData[]): string => {
  if (!rankData || rankData.length === 0) return "Nobody";

  for (const rank of rankData) {
    if (totalShares >= rank.min && totalShares <= rank.max) {
      return rank.rank;
    }
  }

  // If totalShares exceeds the maximum range, return the highest rank
  const highestRank = rankData[rankData.length - 1];
  return totalShares > highestRank.max ? highestRank.rank : "Nobody";
};



export const getRankIconColor = (rank: string): string => {
  switch (rank) {
    case "Maze Rat":
      return "#9E9E9E"; // Gray
    case "Street Runner":
      return "#FF5722"; // Orange
    case "Intern":
      return "#FFC107"; // Amber
    case "Analyst":
      return "#03A9F4"; // Light Blue
    case "Senior Analyst":
      return "#0288D1"; // Dark Blue
    case "Broker":
      return "#4CAF50"; // Green
    case "Associate":
      return "#8BC34A"; // Light Green
    case "Senior Associate":
      return "#CDDC39"; // Lime
    case "Director":
      return "#FFEB3B"; // Yellow
    case "Senior Director":
      return "#FFC107"; // Deep Amber
    case "Managing Director (MD)":
      return "#FF9800"; // Deep Orange
    case "Senior Managing Director":
      return "#FF5722"; // Red Orange
    case "Partner":
      return "#673AB7"; // Deep Purple
    case "Senior Partner":
      return "#9C27B0"; // Purple
    case "Group Head":
      return "#E91E63"; // Pink
    case "Managing Partner":
      return "#F44336"; // Red
    case "Regional Head":
      return "#2196F3"; // Blue
    case "Division Head":
      return "#3F51B5"; // Indigo
    case "Chief Executive Officer (CEO)":
      return "#009688"; // Teal
    case "Chairperson of the Board":
      return "#4CAF50"; // Green
    case "Wall Street Tycoon":
      return "#8BC34A"; // Light Green
    case "Investor":
      return "#CDDC39"; // Lime
    case "Venture Capitalist":
      return "#FFEB3B"; // Yellow
    case "Financial Mogul":
      return "#FFC107"; // Amber
    case "Market Tycoon":
      return "#FF9800"; // Orange
    case "Master of Wealth":
      return "#FF5722"; // Red Orange
    case "Portfolio Pharaoh":
      return "#795548"; // Brown
    case "Global Financier":
      return "#607D8B"; // Blue Gray
    case "Investment Overlord":
      return "#3E2723"; // Dark Brown
    case "WEF Chairman":
      return "#000000"; // Black
    case "Master of the Market":
      return "#212121"; // Deep Black
    case "Sovereign Lord":
      return "#880E4F"; // Dark Magenta
    case "Omniarch":
      return "#B71C1C"; // Crimson Red
    default:
      return "#B0B0B0";
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
