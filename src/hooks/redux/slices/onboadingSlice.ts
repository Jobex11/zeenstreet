import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    confirmedAccounts: {
        Youtube: false,
        Telegram: false,
        X: false
    },
};

export const confirmedAccountsSlice = createSlice({
    name: 'confirmedAccounts',
    initialState,
    reducers: {
        setConfirmedSocialAccounts: (state, action) => {
            state.confirmedAccounts = action.payload;
        },
    },
});

export const { setConfirmedSocialAccounts } = confirmedAccountsSlice.actions;
export default confirmedAccountsSlice.reducer;
