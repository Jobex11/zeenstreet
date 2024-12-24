

export interface TaskcardType  {
    task: {
        _id: string;
        title: string;
        taskUrl: string;
        image: string;
        taskType: "one-time" | "recurring";
        category:
        | "Special"
        | "Daily"
        | "Events"
        | "Referral"
        | "Partners"
        | "Social";
        countdown: number;
        baseReward: number;
        isExpired: boolean;
        remainingTime: number;
        reward: number;
        diminishingPercentage: number;
        diminishingRewards: "Yes" | "No";
        diminishingPoints: number[];
    },
    refetch?: () => void;
}

export type TaskcardInterface = {
      _id: string;
      title: string;
      taskUrl: string;
      image: string;
      taskType: "one-time" | "recurring";
      category:
      | "Special"
      | "Daily"
      | "Events"
      | "Referral"
      | "Partners"
      | "Social";
      diminishingRewards: "Yes" | "No";
      countdown: number;
      baseReward: number;
      isExpired: boolean;
      remainingTime: number;
      reward: number;
      diminishingPoints: number[];
      diminishingPercentage:number[];
}
