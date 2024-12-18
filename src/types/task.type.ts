

export type TaskcardType = {
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
        diminishingRewards: "Yes" | "No";
        countdown: number;
        baseReward: number;
        isExpired: boolean;
        remainingTime: number;
        reward: number;
    }
}
