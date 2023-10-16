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
        },
        deleteCurrentRows: state => {
            let tot_rows = [];
    
            for(let i = 0; i < state.grid.length; ++i){
                let complete_row = true;
                for(let j = 0; j < state.grid[i].length; ++j){
                    if(!state.grid[i][j]){
                        complete_row = false;
                    }
                }
    
                if(complete_row){
                    tot_rows.push(i);
                }
            }

            let temp_grid = state.grid

            for(let i = tot_rows.length-1; i >= 0; --i){
                temp_grid.splice(tot_rows[i], 1);
            }
            for(let i = tot_rows.length-1; i >= 0; --i){
                temp_grid.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            }

            state.grid = temp_grid
        }
    }
})

export const { scoreShift, scoreReset, rowsShift, rowsReset, levelShift, levelReset, gridShift, gridReset } = statsSlice.actions

export const selectStats = state => state.stats

export default statsSlice.reducer;