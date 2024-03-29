
import { generateEmptyBoard } from './helpers';
import Block from './block.js';

export default class TetrisLogic{
    constructor(){
        this.newSesh();
    }

    newSesh() {
        this.board = generateEmptyBoard();
        this.rows = 0;
        this.rate = 64;
        this.level = 1;
        this.score = 0;
        this.pause = false;
        this.game_over = false;
        this.completed_rows = [];
        this.time_elapsed = 0;
        this.true_time_elapsed = 0;
    
        this.active_block = new Block();
    }

    common_procedures(){
        this.time_elapsed += 1;
        this.deactivateBlocks();
        
        this.deleteCurrentRows();

        if(this.completed_rows !== []){
            this.active_block.iterDown();
        }
        else if(this.active_block == null){
            this.newBlock();
        }

        this.level = Math.min(7, Math.floor(this.rows/10))+1;
        console.log("Level" + this.level);
        this.rate = 64 - (8*(this.level-1));
    }

    outer_procedure(){
        this.true_time_elapsed += 1;
        if((this.true_time_elapsed % this.rate === 0) && (!this.pause)){
            this.common_procedures();
        }
    }

    getState(){
        return {
            grid: this.getFullGrid(), 
            paused: this.pause, 
            game_over: this.game_over, 
            rows: this.rows, 
            score: this.score, 
            level:this.level, 
            completedRows: this.getCompletedRows()
        }
    }

    deactivateBlocks(){
        if(this.hasCollidedAbove()){
            this.time_elapsed = 1;
            const brd = this.active_block.getFullBlock();
            for(let i = 0; i < brd.length; ++i){
                for(let j = 0; j < brd[i].length; ++j){
                    this.board[i][j] = brd[i][j] + this.board[i][j];
                }
            }
            this.newBlock();
            if(this.isOnTopOf()){
                this.pause = true;
                this.game_over = true;
            }
            this.true_time_elapsed = 15;
        }
    }

    newBlock(){
        this.active_block = new Block();
    }

    emptyBlock(){
        this.active_block = null;
    }

    rotateBlocks(){
        if(!this.pause){
            this.active_block.rotate();
            if(this.isOnTopOf()){
                this.active_block.rotate();
                this.active_block.rotate();
                this.active_block.rotate();
            }
        }
    }

    blockLeft(){
        if(!this.hasCollidedLeft() && (!this.pause)){
            this.active_block.iterLeft();
        }
    }

    blockRight(){
        if(!this.hasCollidedRight() && (!this.pause)){
            this.active_block.iterRight();
        }
    }

    blockDown(){
        if(!this.hasCollidedAbove() && (!this.pause)){
            this.active_block.iterDown();
        }
    }

    isOnTopOf(){
        const full_block = this.active_block.getFullBlock();
        const {x: block_x, y: block_y} = this.active_block.getCoord();

        for(let i = block_y+3; i >= block_y; --i){
            for(let j = block_x; j < block_x+this.active_block.getSize(); ++j){
                if(i < 0 || j < 0 || i >= full_block.length || j >= full_block[i].length){
                    return true;
                }
                if(full_block[i][j] && this.board[i][j]){
                    return true;
                }
            }
        }
        return false;
    }

    hasCollidedAbove(){
        const full_block = this.active_block.getFullBlock();
        const {x: block_x, y: block_y} = this.active_block.getCoord();

        for(let i = Math.min(block_y+3, 24); i >= block_y; --i){
            for(let j = block_x; j < Math.min(block_x+this.active_block.getSize(), 10); ++j){
                if(full_block[i][j]){
                    if(i+1 === this.board.length){
                        return true;
                    }
                    if(this.board[i+1][j]){
                        return true;
                    }
                }
            }
        }
        return false;
    }

    hasCollidedLeft(){
        const full_block = this.active_block.getFullBlock();
        const {x: block_x, y: block_y} = this.active_block.getCoord();

        for(let i = Math.min(block_y+3, 24); i >= block_y; --i){
            for(let j = block_x; j < Math.min(block_x+this.active_block.getSize(), 10); ++j){
                if(full_block[i][j]){
                    if(j === 0 || this.board[i][j-1]){
                        return true;
                    }
                }
            }
        }
        return false;
    }

    hasCollidedRight(){
        const full_block = this.active_block.getFullBlock();
        const {x: block_x, y: block_y} = this.active_block.getCoord();

        for(let i = Math.min(block_y+3, 24); i >= block_y; --i){
            for(let j = block_x; j < Math.min(block_x+this.active_block.getSize(), 10); ++j){
                if(full_block[i][j]){
                    if(j+1 === this.board[0].length || this.board[i][j+1]){
                        return true;
                    }
                }
            }
        }
        return false;
    }

    getCompletedRows(){
        let tot_rows = [];

        for(let i = 0; i < this.board.length; ++i){
            let complete_row = true;
            for(let j = 0; j < this.board[i].length; ++j){
                if(!this.board[i][j]){
                    complete_row = false;
                }
            }

            if(complete_row){
                tot_rows.push(i);
            }
        }

        this.completed_rows = tot_rows;

        return tot_rows;
    }

    deleteCurrentRows(){
        const tot_rows = this.getCompletedRows(1);

        for(let i = tot_rows.length-1; i >= 0; --i){
            this.board.splice(tot_rows[i], 1);
            this.rows++;
        }
        for(let i = tot_rows.length-1; i >= 0; --i){
            this.board.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }

        if(tot_rows.length === 1){
            this.score += 40*this.level;
        }
        else if(tot_rows.length === 2){
            this.score += 100*this.level;
        }
        else if(tot_rows.length === 3){
            this.score += 300*this.level;
        }
        else if(tot_rows.length === 4){
            this.score += 1200*this.level;
        }
    }

    setPause(){
        this.pause = !(this.pause);
    }

    getFullGrid(){
        let brd = generateEmptyBoard();
        const nuarray = this.active_block.getFullBlock();
        for(let i = 0; i < brd.length; ++i){
            for(let j = 0; j < brd[i].length; ++j){
                brd[i][j] = nuarray[i][j] + this.board[i][j];
            }
        }
        return brd;
    }

    getScore(){
        return this.score;
    }

    getRows(){
        return this.rows;
    }
}