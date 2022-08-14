class Block{
    x=3;
    y=0;
    constructor(type = (Math.floor(Math.random() * 7) + 1)){
        this.blk = blocks[type];
    }

    //detect if collision in logic file
    rotate(){
        var old_block = this.blk;
        this.blk = generateMiniBoard(this.blk.length);
        console.log(old_block);
        for(var i = 0; i < this.blk.length; ++i){
            for(var j = 0; j < this.blk[i].length; ++j){
                console.log(this.blk.length);
                this.blk[i][this.blk[i].length - 1 - j] = old_block[j][i];
            }
        }
    }

    getMiniBlock(){
        return this.blk;
    }

    getFullBlock(){
        var ret_board = generateEmptyBoard();
        for(var i = 0; i < this.blk.length; ++i){
            for(var j=0; j < this.blk[i].length; ++j){
                if(this.blk[i][j]){
                    ret_board[i+this.y][j+this.x] = this.blk[i][j];
                }
            }
        }
        return ret_board;
    }

    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }

    iterDown(){
        (this.y)++;
    }

    iterLeft(){
        (this.x)--;
    }

    iterRight(){
        (this.x)++;
    }
}