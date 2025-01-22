import { useMemo } from "react";

export const useGoldFormatter = (goldAmount: number | null) => {
  return useMemo(() => {
    const formatNumber = (num: number, suffix: string) => {
      // Round to 1 decimal place
      const rounded = Math.round(num * 10) / 10;

      // Convert to string and remove trailing '.0' if present
      const formatted = rounded.toString().replace(/\.0$/, '');

      return formatted + suffix;
    };

    if (goldAmount && goldAmount < 100_000) {
      return goldAmount.toLocaleString();
    } else if (goldAmount && goldAmount >= 1_000_000_000) {
      return formatNumber(goldAmount && goldAmount / 1_000_000_000, "b"); 
    } else if (goldAmount && goldAmount >= 1_000_000) {
      return formatNumber(goldAmount && goldAmount / 1_000_000, "m"); 
    } else if (goldAmount && goldAmount >= 100_000) {
      return formatNumber(goldAmount && goldAmount / 1_000, "k"); 
    }
  }, [goldAmount]);
};

