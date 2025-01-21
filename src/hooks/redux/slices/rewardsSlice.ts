import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Reward {
    // id: string;
    // name: string;
    views: number; 
}

export const rewardsSlice = createSlice({
    name: "rewards",
    initialState: {
        claimedRewards: [] as Reward[], // Store an array of Reward objects
    },
    reducers: {
        updateClaimedRewards: (state, action: PayloadAction<Reward>) => {
            const data = action.payload;
            // Ensure the reward is not already in claimedRewards
            if (!state.claimedRewards.find((reward) => reward.views === data.views)) {
                state.claimedRewards.push(data);
            }
        },
    },
});

export const { updateClaimedRewards } = rewardsSlice.actions;
export default rewardsSlice.reducer;
export type { Reward };
