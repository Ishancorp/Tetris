import { createSlice } from '@reduxjs/toolkit'

const initialState = { score: 0 }

export const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        scoreShift: (state, action) => {
            state.score = action.payload
        },
        scoreReset: state => {
            state.score = 0
        }
    }
})

export const { scoreShift, scoreReset } = scoreSlice.actions

export const selectScore = state => state.score

export default scoreSlice.reducer;