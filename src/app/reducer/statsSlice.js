import { createSlice } from '@reduxjs/toolkit'
import { generateEmptyBoard } from '../../game_logic/helpers'

const initialState = { score: 0, rows: 0, level: 0, grid: generateEmptyBoard() }

export const statsSlice = createSlice({
    name: 'stats',
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
        },
        gridShift: (state, action) => {
            state.grid = action.payload
        },
        gridReset: state => {
            state.grid = generateEmptyBoard()
        }
    }
})

export const { scoreShift, scoreReset, rowsShift, rowsReset, levelShift, levelReset, gridShift, gridReset } = statsSlice.actions

export const selectStats = state => state.stats

export default statsSlice.reducer;