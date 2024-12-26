
  
  export interface CardType {
    _id: string;
    image:string;
    title:string;
    totalUnlockPoints: number;
    basePoint: number;
    isUnlocked: boolean;
    isCurrent:boolean;
    progress:{
        unlockedPoints?: number;
        progressInPercentage?: number;
        progressDisplay?: string;
    }

  }
  

  
  export interface Card {
    _id: string;
    title: string;
    image: string;
    wealthClass: string; 
  }
  
  // Type for a single wealth class
  export interface WealthClass {
    _id?: string;
    name?: string;
    minRank: number;
    maxRank: number;
    requiredCards: number;
    sharesReward: number;
    additionalRewards?: {
      shares?: string;
      USDT?: string;
      SOL?: string;
    };
    createdAt?: string;
  }
  
  // Type for the user
  export interface User {
    shares: number;
    collectedCards: Card[];
  }
