import { createSlice } from '@reduxjs/toolkit'
import Block from '../../game_logic/block'

const initialState = { block: new Block() }

export const blockSlice = createSlice({
    name: 'block',
    initialState,
    reducers: {
        iterDown: state => {
            (state.block.y)++
        },
        iterLeft: state => {
            (state.block.x)--
        },
        iterRight: state => {
            (state.block.x)++
        },
        rotate: state => {
            state.block = state.block.rotate()
        }
    }
})

export const { iterDown, iterLeft, iterRight, rotate } = blockSlice.actions

export const selectBlock = state => state

export const getCoord = state => ({x: state.block.x, y: state.block.y})

export default blockSlice.reducer;