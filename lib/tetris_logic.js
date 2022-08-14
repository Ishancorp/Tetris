class Tetris_Logic{
    board = generateEmptyBoard();
    score = 0;
    renderer = new Renderer();

    constructor(){
        this.time_elapsed = 0;
    
        this.active_block = new Block();
    }

    common_procedures(){
        this.time_elapsed += 1;
        this.deactivateBlocks();
        this.deleteCurrentRows();
        this.active_block.iterDown();

        this.render();
    }

    render(){
        this.renderer.render(this.getFullGrid(), this.score);
    }

    deactivateBlocks(){
        if(this.hasCollidedAbove()){
            console.log(1);
            var brd = this.active_block.getFullBlock();
            for(var i = 0; i < brd.length; ++i){
                for(var j = 0; j < brd[i].length; ++j){
                    this.board[i][j] = brd[i][j] + this.board[i][j];
                }
            }

            this.active_block = new Block();
        }
    }

    rotateBlocks(){
        this.active_block.rotate();
        if(this.isOnTopOf()){
            this.active_block.rotate();
            this.active_block.rotate();
            this.active_block.rotate();
        }
    }

    blockLeft(){
        if(!this.hasCollidedLeft()){
            this.active_block.iterLeft();
        }
    }

    blockRight(){
        if(!this.hasCollidedRight()){
            this.active_block.iterRight();
        }
    }

    blockDown(){
        if(!this.hasCollidedAbove()){
            this.active_block.iterDown();
        }
    }

    isOnTopOf(){
        var full_block = this.active_block.getFullBlock();
        var block_x = this.active_block.getX();
        var block_y = this.active_block.getY();

        for(var i = block_y+3; i >= block_y; --i){
            for(var j = block_x; j < block_x+4; ++j){
                if(i <= 0 || j <= 0 || i >= full_block.length || j >= full_block[i].length){
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
        var full_block = this.active_block.getFullBlock();
        var block_x = this.active_block.getX();
        var block_y = this.active_block.getY();

        for(var i = Math.min(block_y+3, 24); i >= block_y; --i){
            for(var j = block_x; j < Math.min(block_x+4, 10); ++j){
                if(full_block[i][j]){
                    if(i+1 == this.board.length){
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
        var full_block = this.active_block.getFullBlock();
        var block_x = this.active_block.getX();
        var block_y = this.active_block.getY();

        for(var i = Math.min(block_y+3, 24); i >= block_y; --i){
            for(var j = block_x; j < Math.min(block_x+4, 10); ++j){
                if(full_block[i][j]){
                    if(j == 0 || this.board[i][j-1]){
                        return true;
                    }
                }
            }
        }
        return false;
    }

    hasCollidedRight(){
        var full_block = this.active_block.getFullBlock();
        var block_x = this.active_block.getX();
        var block_y = this.active_block.getY();

        for(var i = Math.min(block_y+3, 24); i >= block_y; --i){
            for(var j = block_x; j < Math.min(block_x+4, 10); ++j){
                if(full_block[i][j]){
                    if(j+1 == this.board[0].length || this.board[i][j+1]){
                        return true;
                    }
                }
            }
        }
        return false;
    }

    deleteCurrentRows(){
        var tot_rows = [];

        for(var i = 0; i < this.board.length; ++i){
            var complete_row = true;
            for(var j = 0; j < this.board[i].length; ++j){
                if(!this.board[i][j]){
                    complete_row = false;
                }
            }

            if(complete_row){
                tot_rows.push(i);
            }
        }

        console.log(tot_rows);

        for(var i = tot_rows.length-1; i >= 0; --i){
            this.board.splice(tot_rows[i], 1);
            this.score++;
        }
        for(var i = tot_rows.length-1; i >= 0; --i){
            this.board.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }
    }

    getFullGrid(){
        var brd = generateEmptyBoard();
        var nuarray = this.active_block.getFullBlock();
        for(var i = 0; i < brd.length; ++i){
            for(var j = 0; j < brd[i].length; ++j){
                brd[i][j] = nuarray[i][j] + this.board[i][j];
            }
        }
        return brd;
    }

    getScore(){
        return this.score;
    }
}

var sess = new Tetris_Logic();

setInterval(sess.common_procedures.bind(sess), 500);