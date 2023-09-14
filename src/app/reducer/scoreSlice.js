import { createSlice } from '@reduxjs/toolkit'

const initialState = { score: 0 }

export const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        shift: (state, action) => {
            state.score = action.payload
        },
        reset: state => {
            state.score = 0
        }
    }
})

export const { shift, reset } = scoreSlice.actions

export const selectScore = state => state.score

export default scoreSlice.reducer;