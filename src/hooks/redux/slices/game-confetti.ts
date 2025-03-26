import { createSlice } from "@reduxjs/toolkit";


// Confetti Slice
export const confettiSlice = createSlice({
    name: "confetti",
    initialState: { confettiShown: false },
    reducers: {
        showConfetti: (state) => {
            state.confettiShown = true;
        },
        resetConfetti: (state) => {
            state.confettiShown = false;
        },
    },
});

// Export actions
export const { showConfetti, resetConfetti } = confettiSlice.actions;
export default confettiSlice.reducer;
