import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface UserState {
    username: string | null;
    accountName: string | null;
    shares: number | null;
    telegram_id: string | null;
    photo_url: string | null;
}

const initialState: UserState = {
    username: null,
    accountName: null,
    shares: null,
    telegram_id: null,
    photo_url: null
};


export const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserDetails: (
            state,
            action: PayloadAction<{ username: string; accountName: string; shares: number; telegram_id: string; photo_url: string }>
        ) => {
            const { username, accountName, shares, telegram_id, photo_url } = action.payload;
            state.username = username;
            state.accountName = accountName;
            state.shares = shares;
            state.telegram_id = telegram_id;
            state.photo_url = photo_url;
        },
        clearUserDetails: (state) => {
            state.username = null;
            state.accountName = null;
            state.shares = null;
            state.telegram_id = null;
        },
        updateShares: (state, action: PayloadAction<number>) => {
            state.shares = action.payload;
        },
    },
});


export const { setUserDetails, clearUserDetails, updateShares } = userSlice.actions;


export default userSlice.reducer;
export type { UserState }
