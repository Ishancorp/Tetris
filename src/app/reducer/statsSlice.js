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
        },
        deactivateBlock: (state, action) => {
            //payload being the block.getFullBlock
            const fullBlock = action.payload
            let newGrid = generateEmptyBoard()
            for (const i = 0; i < newGrid.length; ++i) {
                for (const j = 0; j < newGrid[i].length; ++j) {
                    newGrid[i][j] = fullBlock[i][j] + state.grid[i][j]
                }
            }
            state.grid = newGrid
            //add line on removing lines and adding empty ones at top
        }
    }
})

export const { scoreShift, scoreReset, rowsShift, rowsReset, levelShift, levelReset, gridShift, gridReset } = statsSlice.actions

export const selectStats = state => state.stats

export default statsSlice.reducer;