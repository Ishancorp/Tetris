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

const colours = {
    0: "#000000",
    1: "#FFFF00",
    2: "#8080FF",
    3: "#00FF00",
    4: "#FF0000",
    5: "#0000FF",
    6: "#FF8000",
    7: "#FF00FF"
}

class Renderer{
    canvas = document.getElementById("tetris_canvas");
    ctx = document.getElementById("tetris_canvas").getContext("2d");
    canvas_width = this.canvas.getAttribute("width");
    canvas_height = this.canvas.getAttribute("height");
    tile_length = 20;
    grid_dark = "#4F4F4F";

    constructor(){

    }

    render(grd, scre){
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.fillRect(0, 0, 2130, 3300);
        this.ctx.fillStyle = "#000000";
        this.ctx.font = "30px Verdana";
        this.ctx.fillText("Rows: " + scre, 40, 140);

        for(var i = 5; i < grd.length; ++i){
            for(var j = 0; j < grd[i].length; ++j){
                if(grd[i][j]){
                    this.drawTile(grd[i][j], j*this.tile_length, i*this.tile_length+50);
                }
                else{
                    this.drawTile(types.EMPTY_BLOCK, j*this.tile_length, i*this.tile_length+50);
                }
            }
        }
    }

    drawTile(colour, x, y) {
        this.ctx.fillStyle = colours[colour];
        this.ctx.fillRect(x, y, this.tile_length, this.tile_length);

        this.ctx.strokeStyle = "#000000";
        this.ctx.strokeRect(x+3, y+3, this.tile_length-6, this.tile_length-6);
    
        this.ctx.strokeStyle = "#7E7E7E";
        this.ctx.strokeRect(x, y, this.tile_length, this.tile_length);
        this.ctx.strokeStyle = "#000000";
    }
}