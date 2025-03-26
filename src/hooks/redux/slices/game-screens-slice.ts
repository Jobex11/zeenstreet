import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SCREENS } from "@/lib/utils"; 

interface ScreenState {
    activeScreen: string;
}

const initialState: ScreenState = {
    activeScreen: SCREENS.WELCOME, 
};

export const screenSlice = createSlice({
    name: "screen",
    initialState,
    reducers: {
        setActiveScreen: (state, action: PayloadAction<string>) => {
            state.activeScreen = action.payload;
        },
    },
});

export const { setActiveScreen } = screenSlice.actions;
export default screenSlice.reducer;
export type { ScreenState };
