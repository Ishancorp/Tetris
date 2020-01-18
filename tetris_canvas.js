var canvas = document.getElementById("tetris_canvas");
var ctx = canvas.getContext("2d");
let canvas_width = canvas.getAttribute("width");
let canvas_height = canvas.getAttribute("height");
var time_elapsed = 0
setInterval(render, 5);
drawGrid();
var tiles = [];
let YELLOW_BLOCK = 1;
let BLUE_BLOCK = 2;
let GREEN_BLOCK = 3;
let RED_BLOCK = 4;
let DBLUE_BLOCK = 5;
let ORANGE_BLOCK = 6;
let PURPLE_BLOCK = 7;
var activeTile = makeBlock(475, 150);
var mass_adjust = 0;
var deactivate_block = true;
var score = 0;
var hover_over_restart = false;
var hover_over_pause = false;
var paused = false;

function render() {
    time_elapsed += 1;
    ctx.fillStyle = "#AFAFAF";
    ctx.fillRect(0, 0, canvas_width, canvas_height);

    if (!paused) {
        deactivateBlocks((time_elapsed % 200) == 0);
    }

    deleteCompletedRows();

    var i;
    for (i = 0; i < tiles.length; i++) {
        var j;
        for (j = 0; j < tiles[i].tiles.length; j++) {
            drawTile(tiles[i].colour, tiles[i].tiles[j].x, tiles[i].tiles[j].y);
        }
    }
    var j;
    for (j = 0; j < activeTile.tiles.length; j++) {
        drawTile(activeTile.colour, activeTile.tiles[j].x, activeTile.tiles[j].y);
    }

    ctx.globalAlpha = 0.2;
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.fillStyle = "#CFCFCF";
    ctx.fillRect(0, 0, 250, canvas_height);
    ctx.fillRect(750, 0, canvas_width, canvas_height);
    ctx.fillRect(250, 0, 750, 200);

    makeButton("Restart", 25, 50, hover_over_restart);

    ctx.fillText("Score: " + score, 200, 80);

    makeButton(" Pause", 325, 50, hover_over_pause);

    if (paused) {
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas_width, canvas_height);
        ctx.globalAlpha = 1;
    }
}

function drawGrid() {
    var i;
  
    for (i = 0; i < canvas_width; i+=25) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas_height);

        if (i < canvas_height) {
            ctx.moveTo(0, i);
            ctx.lineTo(canvas_width, i);
        }
    }
}

function drawTile(colour, x, y) {
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, 25, 25);
}

function makeButton(name, x, y, hover_in_progress) {
    ctx.fillStyle = "#AFAFAF";
    ctx.font = "16px Verdana";
    if (hover_in_progress) {
        ctx.fillRect(x, y, 100, 50);
        ctx.fillStyle = "white";
    }
    else {
        ctx.strokeRect(x, y, 100, 50);
        ctx.fillStyle = "black";
    }
    ctx.fillText(name, x + 20, y + 30);
    ctx.fillStyle = "black";
}

function deactivateBlocks(cond) {
    var j;
    for (j = 0; j < activeTile.tiles.length; j++) {
        if (hasCollidedAbove(activeTile.tiles[j].x, activeTile.tiles[j].y)) { //replace with collision detector
            if (deactivate_block) {
                tiles.push(activeTile);
                activeTile = makeBlock(475, 125);
            }
            time_elapsed = 1;
            return true;
        }
        if (cond) {
            activeTile.tiles[j].y += 25;
        }
    }
    if (cond) {
        activeTile.central_y += 25;
    }
    return false;
}

function rotateBlock() {
    var j;
    correct_left = 0;
    correct_right = 0;
    for (j = 0; j < activeTile.tiles.length; j++) {
        new_x = (0 - (activeTile.tiles[j].y - activeTile.central_y) - 25) + activeTile.central_x;
        new_y = activeTile.tiles[j].x - activeTile.central_x + activeTile.central_y;

        correct_left = Math.max(correct_left, 250 - new_x);
        correct_right = Math.max(correct_right, new_x - 725);

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

function makeBlock(x_pos, y_pos) {
    type = Math.floor(Math.random() * 7) + 1;
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

function hasCollidedLeft(x, y) {
    if (x == 250) {
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

function hasCollidedRight(x, y) {
    if (x == 725) {
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

function deleteCompletedRows() {
    var rows = Array(16);
    var i;
    var deleted_rows = [];
    for (i = 0; i < rows.length; i++) {
        rows[i] = 0;
    }

    var i;
    for (i = 0; i < tiles.length; i++) {
        var j;
        for (j = 0; j < tiles[i].tiles.length; j++) {
            pos = Math.floor((tiles[i].tiles[j].y - 200) / 25);
            rows[pos]++;
            if (rows[pos] == 20) {
                deleted_rows.push(pos);
            }
        }
    }

    mass_adjust = 0;
    var i;
    for (i = 0; i < tiles.length; i++) {
        var j;
        for (j = 0; j < tiles[i].tiles.length; j++) {
            pos = Math.floor((tiles[i].tiles[j].y - 200) / 25);
            if (rows[pos] == 20) {
                tiles[i].tiles.splice(j, 1);
                j--;
            }
        }
        mass_adjust++;
    }
    
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


document.addEventListener('keydown', (e) => {
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
    else if (e.code === "ArrowDown" && !paused) {
        var time_arrow = 0;
        while (deactivateBlocks(true)) {
            time_arrow++;
            time_elapsed--;
        }
    }
    else if (e.code === "ArrowUp" && !paused) {
        var time_arrow = 0;
        while (!deactivateBlocks(time_arrow % 2)) {
            time_arrow++;
            time_elapsed--;
        }
    }
    else if (e.code === "Space" && !paused) {
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

canvas.addEventListener('click', (e) => {
    x_pos = e.clientX;
    y_pos = e.clientY;
    if (x_pos >= 25 && x_pos <= 125 && y_pos >= 50 && y_pos <= 100) {
        console.log('(' + x_pos + ", " + y_pos + ')');
        tiles = [];
        activeTile = makeBlock(475, 150);
        score = 0;
    }
    else if (x_pos >= 325 && x_pos <= 425 && y_pos >= 50 && y_pos <= 100) {
        paused = !paused;
    }
});

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