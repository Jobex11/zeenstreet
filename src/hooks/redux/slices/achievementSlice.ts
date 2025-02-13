import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    unlockedAchievement: null, // Stores the currently unlocked achievement
    isDrawerOpen: false, // Controls the visibility of the drawer
};

export const achievementSlice = createSlice({
    name: "achievement",
    initialState,
    reducers: {
        unlockAchievement: (state, action) => {
            state.unlockedAchievement = action.payload;
            state.isDrawerOpen = true;
        },
        closeDrawer: (state) => {
            state.unlockedAchievement = null;
            state.isDrawerOpen = false;
        },
    },
});

export const { unlockAchievement, closeDrawer } = achievementSlice.actions;
export default achievementSlice.reducer;
