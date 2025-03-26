import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isPlaying: true
}

export const musicSlice = createSlice({
    name: "music",
    initialState,
    reducers: {
        togglePlay: (state) => {
            state.isPlaying = !state.isPlaying
        }
    }
})

export const { togglePlay } = musicSlice.actions
export default musicSlice.reducer
