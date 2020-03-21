function noScroll() {
    window.scrollTo(0, 0);
}

// add listener to disable scroll
window.addEventListener('scroll', noScroll);

var canvas = document.getElementById("tetris_canvas");
var ctx = canvas.getContext("2d");
let canvas_width = canvas.getAttribute("width");
let canvas_height = canvas.getAttribute("height");
var time_elapsed = 0
setInterval(render, 5);
var tiles = [];
let YELLOW_BLOCK = 1;
let BLUE_BLOCK = 2;
let GREEN_BLOCK = 3;
let RED_BLOCK = 4;
let DBLUE_BLOCK = 5;
let ORANGE_BLOCK = 6;
let PURPLE_BLOCK = 7;
let TOP_X = 475;
let TOP_Y = 150;
var activeTile = makeBlock(475, 150, false);
var mass_adjust = 0;
var deactivate_block = true;
var score = 0;
var hover_over_restart = false;
var hover_over_pause = false;
var paused = false;
var one_fourth = 375;
var three_fourth = 625;
var tile_length = 25;
var tile_to_place = makeBlock(475, 150, false);
var game_over = false;
drawGrid();

function render() {
    time_elapsed += 1;
    ctx.fillStyle = "#6F6F6F";
    ctx.fillRect(0, 0, canvas_width, canvas_height);

    //determine if the active block has collided with a wall, or other blocks
    if (!paused) {
        deactivateBlocks((time_elapsed % 200) == 0);
    }

    deleteCompletedRows();

    //draw inactive tiles
    var i;
    for (i = 0; i < tiles.length; i++) {
        var j;
        for (j = 0; j < tiles[i].tiles.length; j++) {
            drawTile(tiles[i].colour, tiles[i].tiles[j].x, tiles[i].tiles[j].y);
        }
    }

    //draw active block
    var j;
    for (j = 0; j < activeTile.tiles.length; j++) {
        drawTile(activeTile.colour, activeTile.tiles[j].x, activeTile.tiles[j].y);
    }

    //draw lines
    ctx.strokeStyle = "#7E7E7E";
    ctx.stroke();
    ctx.strokeStyle = "#000000";

    //draw backgrounds
    ctx.fillStyle = "#CFCFCF";
    ctx.fillRect(0, 0, one_fourth, canvas_height);
    ctx.fillRect(three_fourth, 0, canvas_width, canvas_height);
    ctx.fillRect(one_fourth, 0, three_fourth, 200);

    //draw buttons
    makeButton("Restart", 25, 50, 100, 50, hover_over_restart);

    ctx.fillText("Score: " + score, 200, 80);

    makeButton(" Pause", 325, 50, 100, 50, hover_over_pause);

    makeButton("Next block", 25, canvas_height / 2 - 65, 120, 220, false);

    //makeButton("", 40, canvas_height / 2 + 60 - 50 - 10, 70, 120, true);

    //draw background for next block
    var k;
    for (k = 0; k < 24; k++) {
        drawTile("#6F6F6F", 35 + 25 * (k % 4), 25 * Math.floor(k / 4) + 75 - 90 + (canvas_height / 2));
    }

    //draw next block
    for (k = 0; k < activeTile.tiles.length; k++) {
        drawTile(tile_to_place.colour, tile_to_place.tiles[k].x - 425 + 10, tile_to_place.tiles[k].y - 90 + (canvas_height / 2));
    }

    //grey background if paused
    if (paused) {
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas_width, canvas_height);
        ctx.globalAlpha = 1;
    }
}

//draw the grid
function drawGrid() {
    var i;
  
    for (i = 0; i < canvas_width; i += tile_length) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas_height);

        if (i < canvas_height) {
            ctx.moveTo(0, i);
            ctx.lineTo(canvas_width, i);
        }
    }
}

//draw a given tile of a block
function drawTile(colour, x, y) {
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, tile_length, tile_length);

    ctx.strokeStyle = "#7E7E7E";
    ctx.strokeRect(x, y, tile_length, tile_length);
    ctx.strokeStyle = "#000000";
}

//draw a given button
function makeButton(name, x, y, width, length, hover_in_progress) {
    ctx.fillStyle = "#6F6F6F";
    ctx.font = "16px Verdana";
    if (hover_in_progress) {
        ctx.fillRect(x, y, width, length);
        ctx.fillStyle = "white";
    }
    else {
        ctx.strokeRect(x, y, width, length);
        ctx.fillStyle = "black";
    }
    ctx.fillText(name, x + 20, y + 30);
    ctx.fillStyle = "black";
}

//deactivate a block if there is a collision
function deactivateBlocks(cond) {
    var j;
    for (j = 0; j < activeTile.tiles.length; j++) {
        if (hasCollidedAbove(activeTile.tiles[j].x, activeTile.tiles[j].y)) {
            if (deactivate_block) {
                if (activeTile.tiles[j].y < 175) {
                    game_over = true;
                    console.log("over");
                    paused = true;
                }
                tiles.push(activeTile);
                activeTile = tile_to_place;
                tile_to_place = makeBlock(475, 150, false);
            }
            time_elapsed = 1;
            return true;
        }
        if (cond) {
            activeTile.tiles[j].y += tile_length;
        }
    }
    if (cond) {
        activeTile.central_y += tile_length;
    }
    return false;
}

//rotate the active block
function rotateBlock() {
    var j;
    correct_left = 0;
    correct_right = 0;
    for (j = 0; j < activeTile.tiles.length; j++) {
        new_x = (0 - (activeTile.tiles[j].y - activeTile.central_y) - tile_length) + activeTile.central_x;
        new_y = activeTile.tiles[j].x - activeTile.central_x + activeTile.central_y;

        correct_left = Math.max(correct_left, one_fourth - new_x);
        correct_right = Math.max(correct_right, new_x - (three_fourth - tile_length));

        console.log(correct_left);
        console.log(correct_right);

        activeTile.tiles[j] = { x: new_x, y: new_y };
    }

    // if past boundaries, correct
    var j;
    for (j = 0; j < activeTile.tiles.length; j++) {
        activeTile.tiles[j].x = activeTile.tiles[j].x + correct_left - correct_right;
    }
    activeTile.central_x = activeTile.central_x + correct_left - correct_right;
}

//make a block with given coordinates, and if needed type
function makeBlock(x_pos, y_pos, type) {
    if (type == false) {
        type = Math.floor(Math.random() * 7) + 1;
    }

    if (type == YELLOW_BLOCK) {
        return { colour: "#FFFFCF", central_x: x_pos + 25, central_y : y_pos + 25, tiles: [{ x: x_pos, y: y_pos + 25 }, { x: x_pos, y: y_pos }, { x: x_pos + 25, y: y_pos + 25 }, { x: x_pos + 25, y: y_pos }] };
    }
    else if (type == BLUE_BLOCK) {
        return { colour: "#CFCFFF", central_x: x_pos, central_y: y_pos, tiles: [{ x: x_pos, y: y_pos - 25 }, { x: x_pos, y: y_pos - 50 }, { x: x_pos, y: y_pos + 25 }, { x: x_pos, y: y_pos }] };
    }
    else if (type == GREEN_BLOCK) {
        return { colour: "#CFFFCF", central_x: x_pos + 25, central_y: y_pos + 25, tiles: [{ x: x_pos, y: y_pos - 25 }, { x: x_pos, y: y_pos }, { x: x_pos + 25, y: y_pos + 25 }, { x: x_pos + 25, y: y_pos }] };
    }
    else if (type == RED_BLOCK) {
        return { colour: "#FFCFCF", central_x: x_pos + 25, central_y: y_pos + 25, tiles: [{ x: x_pos, y: y_pos + 25 }, { x: x_pos, y: y_pos }, { x: x_pos + 25, y: y_pos - 25 }, { x: x_pos + 25, y: y_pos }] };
    }
    else if (type == PURPLE_BLOCK) {
        return { colour: "#FFCFFF", central_x: x_pos + 12.5, central_y: y_pos + 12.5, tiles: [{ x: x_pos, y: y_pos + 25 }, { x: x_pos, y: y_pos }, { x: x_pos, y: y_pos - 25 }, { x: x_pos + 25, y: y_pos }] };
    }
    else if (type == ORANGE_BLOCK) {
        return { colour: "#FFEFCF", central_x: x_pos + 25, central_y: y_pos, tiles: [{ x: x_pos, y: y_pos + 25 }, { x: x_pos, y: y_pos }, { x: x_pos, y: y_pos - 25 }, { x: x_pos + 25, y: y_pos + 25 }] };
    }
    else if (type == DBLUE_BLOCK) {
        return { colour: "#BFBFEF", central_x: x_pos + 25, central_y: y_pos, tiles: [{ x: x_pos + 25, y: y_pos + 25 }, { x: x_pos + 25, y: y_pos }, { x: x_pos + 25, y: y_pos - 25 }, { x: x_pos, y: y_pos + 25 }] };
    }
    return { colour: "#FFFFFF", central_x: x_pos + 25, central_y: y_pos + 25, tiles: [{ x: x_pos, y: y_pos + 25 }, { x: x_pos, y: y_pos }, { x: x_pos + 25, y: y_pos }, { x: x_pos + 25, y: y_pos + 25 }] };
}

//detect a collision to the bottom surface
function hasCollidedAbove(x, y) {
    if (y + 25 == canvas_height) {
        return true;
    }
    var i;
    for (i = 0; i < tiles.length; i++) {
        var j;
        for (j = 0; j < tiles[i].tiles.length; j++) {
            if (y + 25 == tiles[i].tiles[j].y && x == tiles[i].tiles[j].x) {
                return true;
            }
        }
    }
    return false;
}

//detect a collision to the left surface
function hasCollidedLeft(x, y) {
    if (x == one_fourth) {
        return true;
    }
    var i;
    for (i = 0; i < tiles.length; i++) {
        var j;
        for (j = 0; j < tiles[i].tiles.length; j++) {
            if (y == tiles[i].tiles[j].y && x == tiles[i].tiles[j].x + 25) {
                return true;
            }
        }
    }
    return false;
}

//detect a collision to the right surface
function hasCollidedRight(x, y) {
    if (x == (three_fourth - 25)) {
        return true;
    }
    var i;
    for (i = 0; i < tiles.length; i++) {
        var j;
        for (j = 0; j < tiles[i].tiles.length; j++) {
            if (y == tiles[i].tiles[j].y && x + 25 == tiles[i].tiles[j].x) {
                return true;
            }
        }
    }
    return false;
}

//delete rows of tiles if complete
function deleteCompletedRows() {
    var rows = Array(16);
    var i;
    var deleted_rows = [];
    //initiate array
    for (i = 0; i < rows.length; i++) {
        rows[i] = 0;
    }

    //detect deleted rows
    var i;
    for (i = 0; i < tiles.length; i++) {
        var j;
        for (j = 0; j < tiles[i].tiles.length; j++) {
            pos = Math.floor((tiles[i].tiles[j].y - 200) / 25);
            rows[pos]++;
            if (rows[pos] == 10) {
                deleted_rows.push(pos);
            }
        }
    }

    //delete completed rows
    mass_adjust = 0;
    var i;
    for (i = 0; i < tiles.length; i++) {
        var j;
        for (j = 0; j < tiles[i].tiles.length; j++) {
            pos = Math.floor((tiles[i].tiles[j].y - 200) / 25);
            if (rows[pos] == 10) {
                tiles[i].tiles.splice(j, 1);
                j--;
            }
        }
        mass_adjust++;
    }

    //shift rows according to deletion
    var i;
    for (i = 0; i < tiles.length; i++) {
        var j;
        for (j = 0; j < tiles[i].tiles.length; j++) {

            var k;
            var decrease_lvl = 0;
            for (k = 0; k < deleted_rows.length; k++) {
                if (deleted_rows[k] > Math.floor((tiles[i].tiles[j].y - 200) / 25)) {
                    decrease_lvl += 1;
                }
                console.log(deleted_rows.length);
            }
            tiles[i].tiles[j].y += 25*decrease_lvl;
        }
    }

    score += 100 * (deleted_rows.length);
    
}

//detect key presses
document.addEventListener('keydown', (e) => {
    //detect right press, adjust if not collided
    if (e.code === "ArrowRight" && !paused) {
        var edge_hit = false;
        var j;
        for (j = 0; j < activeTile.tiles.length; j++) {
            if (hasCollidedRight(activeTile.tiles[j].x, activeTile.tiles[j].y) == true) {
                edge_hit = true;
            }
        }

        if (!edge_hit) {
            for (j = 0; j < activeTile.tiles.length; j++) {
                activeTile.tiles[j].x += 25;
            }
            activeTile.central_x += 25;
        }

        deactivate_block = false;
    }

    //detect left press, adjust if not collided
    else if (e.code === "ArrowLeft" && !paused) {
        var edge_hit = false;
        var j;
        for (j = 0; j < activeTile.tiles.length; j++) {
            if (hasCollidedLeft(activeTile.tiles[j].x, activeTile.tiles[j].y) == true) {
                edge_hit = true;
            }
        }

        if (!edge_hit) {
            for (j = 0; j < activeTile.tiles.length; j++) {
                activeTile.tiles[j].x -= 25;
            }
            activeTile.central_x -= 25;
        }

        deactivate_block = false;
    }

    //detect left press, adjust if not collided
    else if (e.code === "ArrowDown" && !paused) {
        var time_arrow = 0;
        while (deactivateBlocks(true)) {
            time_arrow++;
            time_elapsed--;
        }
    }

    //detect space, move block down
    else if (e.code === "Space" && !paused) {
        var time_arrow = 0;
        while (!deactivateBlocks(time_arrow % 2)) {
            time_arrow++;
            time_elapsed--;
        }
    }

    //detect up press, rotate block
    else if (e.code === "ArrowUp" && !paused) {
        rotateBlock();
    }
});


document.addEventListener('keyup', (e) => {
    if (e.code === "ArrowRight") {
        deactivate_block = true;
    }
    if (e.code === "ArrowLeft") {
        deactivate_block = true;
    }
});

//detect pause, restart buttons
canvas.addEventListener('click', (e) => {
    x_pos = e.clientX;
    y_pos = e.clientY;
    if (x_pos >= 25 && x_pos <= 125 && y_pos >= 50 && y_pos <= 100) {
        console.log('(' + x_pos + ", " + y_pos + ')');
        tiles = [];
        activeTile = tile_to_place;
        tile_to_place = makeBlock(475, 150, false);
        score = 0;
        paused = false;
    }
    else if (x_pos >= 325 && x_pos <= 425 && y_pos >= 50 && y_pos <= 100) {
        paused = !paused;
    }
});

//adjust hover buttons
canvas.onmousemove = function (e) {
    x_pos = e.clientX;
    y_pos = e.clientY;
    if (x_pos >= 25 && x_pos <= 125 && y_pos >= 50 && y_pos <= 100) {
        hover_over_restart = true;
    }
    else if (x_pos >= 325 && x_pos <= 425 && y_pos >= 50 && y_pos <= 100) {
        hover_over_pause = true;
    }
    else {
        hover_over_restart = false;
        hover_over_pause = false;
    }
}