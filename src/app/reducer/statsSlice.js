import { createSlice } from '@reduxjs/toolkit'

const initialState = { score: 0, rows: 0, level: 0 }

export const statsSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        scoreShift: (state, action) => {
            state.score = action.payload
        },
        scoreReset: state => {
            state.score = 0
        },
        rowsShift: (state, action) => {
            state.rows = action.payload
        },
        rowsReset: state => {
            state.rows = 0
        },
        levelShift: (state, action) => {
            state.level = action.payload
        },
        levelReset: state => {
            state.level = 0
        }
    }
})

export const { scoreShift, scoreReset, rowsShift, rowsReset, levelShift, levelReset } = statsSlice.actions

export const selectStats = state => state.stats

export default statsSlice.reducer;