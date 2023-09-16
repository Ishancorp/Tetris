import { createSlice } from '@reduxjs/toolkit'

const initialState = { pause: false, gameOver: false }

export const contSlice = createSlice({
    name: 'cont',
    initialState,
    reducers: {
        pauseShift: (state, action) => {
            state.pause = action.payload
        },
        pauseReset: state => {
            state.pause = false
        },
        gameOverShift: (state, action) => {
            state.gameOver = action.payload
        },
        gameOverReset: state => {
            state.gameOver = false
        }
    }
})

export const { pauseShift, pauseReset, gameOverShift, gameOverReset } = contSlice.actions

export const selectCont = state => state.cont

export default contSlice.reducer;