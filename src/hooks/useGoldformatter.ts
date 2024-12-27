import { useMemo } from 'react';

export const useGoldFormatter = (goldAmount: number) => {
  return useMemo(() => {
    if (goldAmount <= 100_000) {
      return goldAmount.toLocaleString();
    } else if (goldAmount >= 1_000_000_000) {
      return (goldAmount / 1_000_000_000).toFixed(1) + 'b'; // Billions (e.g., 1.2b)
    } else if (goldAmount >= 1_000_000) {
      return (goldAmount / 1_000_000).toFixed(1) + 'm'; // Millions (e.g., 2.5m)
    } else if (goldAmount >= 100_000) {
      return (goldAmount / 1_000).toFixed(1) + 'k'; // Thousands (e.g., 100.1k)
    }
  }, [goldAmount]);

};

