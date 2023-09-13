import { createSlice } from '@reduxjs/toolkit'

export const scoreSlice = createSlice({
    name: 'score',
    initialState: 0,
    reducers: {
        shift: (state, action) => {
            state = action.payload
        },
        reset: state => {
            state = 0
        }
    }
})

export const { shift, reset } = scoreSlice.actions

export const selectScore = state => state.score

export default scoreSlice.reducer;