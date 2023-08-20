/*const types = {
    EMPTY_BLOCK: 0,
    YELLOW_BLOCK: 1,
    BLUE_BLOCK: 2,
    GREEN_BLOCK: 3,
    RED_BLOCK: 4,
    DBLUE_BLOCK: 5,
    ORANGE_BLOCK: 6,
    PURPLE_BLOCK: 7
}
*/

import {types, blocks, generateEmptyBoard, generateMiniBoard} from './helpers.js';

const colours = {
    normal: {
        front: {
            0: "#000000",
            1: "#FFFF80",
            2: "#C0C0FF",
            3: "#80FF80",
            4: "#FF8080",
            5: "#8080FF",
            6: "#FFC080",
            7: "#FF80FF",
            8: "#C0C0C0",
            9: "#4F4F4F"
        },
        back: {
            0: "#000000",
            1: "#FFFF00",
            2: "#8080FF",
            3: "#00FF00",
            4: "#FF0000",
            5: "#0000FF",
            6: "#FF8000",
            7: "#FF00FF",
            8: "#C0C0C0",
            9: "#4F4F4F"
        }
    }
}

export default class Renderer{
    canvas = document.getElementById("tetris_canvas");
    ctx = document.getElementById("tetris_canvas").getContext("2d");
    canvas_width = this.canvas.getAttribute("width");
    canvas_height = this.canvas.getAttribute("height");
    tile_length = 20;
    grid_dark = "#4F4F4F";

    constructor(){

    }

    render(grd, rws, scre, lvl, currentRows, time_elapsed){
        this.ctx.fillStyle = "#808080";
        this.ctx.fillRect(0, 0, 2130, 3300);
        this.ctx.fillStyle = "#000000";
        this.ctx.font = "30px Verdana";
        this.ctx.fillText("Rows: " + rws, 40, 140);
        this.ctx.fillText("Score: " + scre, 40, 180);
        this.ctx.fillText("Level " + lvl, 40, 220);

        var r_i = 0;

        console.log(currentRows);
        for(var i = 5; i < grd.length; ++i){
            for(var j = 0; j < grd[i].length; ++j){
                if(currentRows[r_i] == i && time_elapsed%2 == 0){
                    this.drawTile(types.EMPTY_BLOCK, j*this.tile_length+400, i*this.tile_length+50);
                }
                else if(grd[i][j]){
                    this.drawTile(grd[i][j], j*this.tile_length+400, i*this.tile_length+50);
                }
                else{
                    this.drawTile(types.EMPTY_BLOCK, j*this.tile_length+400, i*this.tile_length+50);
                }
            }

            if(currentRows[r_i] == i){
                ++r_i;
            }
        }
    }

    drawTile(colour, x, y) {
        this.ctx.fillStyle = colours.normal.back[colour];
        this.ctx.fillRect(x, y, this.tile_length, this.tile_length);
        
        this.ctx.fillStyle = colours.normal.front[colour];
        this.ctx.fillRect(x+3, y+3, this.tile_length-6, this.tile_length-6);

        if(colour != types.EMPTY_BLOCK && colour != types.COMPLETED_BLOCK && colour != types.PSEUD_EMPTY_BLOCK){
            this.ctx.strokeStyle = "#C0C0C0";
            this.ctx.strokeRect(x+3, y+3, this.tile_length-6, this.tile_length-6);
        }
        
        if(colour != types.COMPLETED_BLOCK && colour != types.PSEUD_EMPTY_BLOCK && colour != types.EMPTY_BLOCK){
            this.ctx.strokeStyle = "#000000";
            this.ctx.strokeRect(x, y, this.tile_length, this.tile_length);
            this.ctx.strokeStyle = "#000000";
        }
    }
}