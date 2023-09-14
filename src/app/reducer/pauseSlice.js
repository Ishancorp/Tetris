import { createSlice } from '@reduxjs/toolkit'

const initialState = { pause: false }

export const pauseSlice = createSlice({
    name: 'pause',
    initialState,
    reducers: {
        pauseShift: (state, action) => {
            state.pause = action.payload
        },
        pauseReset: state => {
            state.pause = false
        }
    }
})

export const { pauseShift, pauseReset } = pauseSlice.actions

export const selectPause = state => state.pause

export default pauseSlice.reducer;