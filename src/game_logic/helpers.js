const types = {
    EMPTY_BLOCK: 0,
    YELLOW_BLOCK: 1,
    BLUE_BLOCK: 2,
    GREEN_BLOCK: 3,
    RED_BLOCK: 4,
    DBLUE_BLOCK: 5,
    ORANGE_BLOCK: 6,
    PURPLE_BLOCK: 7,
    COMPLETED_BLOCK: 8,
    PSEUD_EMPTY_BLOCK: 9
}

const blocks = {
    1: [[types.YELLOW_BLOCK, types.YELLOW_BLOCK], [types.YELLOW_BLOCK, types.YELLOW_BLOCK]],
    2: [[0, 0, types.BLUE_BLOCK, 0],[0, 0, types.BLUE_BLOCK, 0],[0, 0, types.BLUE_BLOCK, 0],[0, 0, types.BLUE_BLOCK, 0]],
    3: [[0, types.GREEN_BLOCK, 0], [0, types.GREEN_BLOCK, types.GREEN_BLOCK], [0, 0, types.GREEN_BLOCK]],
    4: [[0, 0, types.RED_BLOCK], [0, types.RED_BLOCK, types.RED_BLOCK], [0, types.RED_BLOCK, 0]],
    5: [[0, types.DBLUE_BLOCK, types.DBLUE_BLOCK], [0, types.DBLUE_BLOCK], [0, types.DBLUE_BLOCK, 0]],
    6: [[0, types.ORANGE_BLOCK, 0], [0, types.ORANGE_BLOCK, 0], [0, types.ORANGE_BLOCK, types.ORANGE_BLOCK]],
    7: [[0, types.PURPLE_BLOCK, 0], [0, types.PURPLE_BLOCK, types.PURPLE_BLOCK], [0, types.PURPLE_BLOCK, 0]]
}

function generateMiniBoard(size){
    if(size == 4){
        return [[0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]];
    }
    else if(size == 3){
        return [[0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]];
    }
    else if(size == 2){
        return [[0, 0],
        [0, 0]];
    }
    return [[0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]];
}

function generateEmptyBoard(){
    return [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
}

export {types, blocks, generateEmptyBoard, generateMiniBoard};