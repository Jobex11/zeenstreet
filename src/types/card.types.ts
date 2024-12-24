
  
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
  

  