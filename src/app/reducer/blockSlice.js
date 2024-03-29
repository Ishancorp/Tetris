import { createSlice } from '@reduxjs/toolkit'
import { blocks, generateEmptyBoard, generateMiniBoard } from '../../game_logic/helpers.js';

const initialState = { x: 3, y: 2, blk: blocks[(Math.floor(Math.random() * 7) + 1)] }

export const blockSlice = createSlice({
    name: 'block',
    initialState,
    reducers: {
        iterDown: state => {
            (state.y)++
        },
        iterLeft: state => {
            (state.x)--
        },
        iterRight: state => {
            (state.x)++
        },
        rotate: state => {
            let old_block = state.blk;
            let new_block = generateMiniBoard(state.blk.length);
            console.log(old_block);
            for(const i = 0; i < new_block.length; ++i){
                for(const j = 0; j < new_block[i].length; ++j){
                    console.log(new_block.length);
                    new_block[i][new_block[i].length - 1 - j] = old_block[j][i];
                }
            }

            state.blk = new_block
        },
        blockReset: state => {
            state = { x: 3, y: 2, blk: blocks[(Math.floor(Math.random() * 7) + 1)] }
        }
    }
})

export const { iterDown, iterLeft, iterRight, rotate } = blockSlice.actions

export const selectBlock = state => state

export const getSize = state => state.block.blk.length

export const getCoord = state => ({x: state.block.x, y: state.block.y})

export const getMiniBlock = state => state.block.blk

export const getFullBlock = function() {
    let ret_board = generateEmptyBoard();
    for(const i = 0; i < this.blk.length; ++i){
        for(const j = 0; j < this.blk[i].length; ++j){
            if(this.blk[i][j]){
                ret_board[i+this.y][j+this.x] = this.blk[i][j];
            }
        }
    }
    return ret_board;
}

export default blockSlice.reducer;