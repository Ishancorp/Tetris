import { createSlice } from '@reduxjs/toolkit'

const initialState = { rows: 0 }

export const rowsSlice = createSlice({
    name: 'rows',
    initialState,
    reducers: {
        rowsShift: (state, action) => {
            state.rows = action.payload
        },
        rowsReset: state => {
            state.rows = 0
        }
    }
})

export const { rowsShift, rowsReset } = rowsSlice.actions

export const selectRows = state => state.rows

export default rowsSlice.reducer;