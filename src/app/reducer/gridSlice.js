import { createSlice } from '@reduxjs/toolkit'
import { generateEmptyBoard } from '../../game_logic/helpers'

const initialState = { grid: generateEmptyBoard() }

export const gridSlice = createSlice({
    name: 'grid',
    initialState,
    reducers: {
        gridShift: (state, action) => {
            state.grid = action.payload
        },
        gridReset: state => {
            state.grid = generateEmptyBoard()
        }
    }
})

export const { gridShift, gridReset } = gridSlice.actions

export const selectGrid = state => state

export default gridSlice.reducer;