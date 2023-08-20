document.addEventListener('keydown', (e) => {
    if (e.code === "ArrowLeft") {
        sess.blockLeft();
    }
    else if (e.code === "ArrowRight") {
        sess.blockRight();
    }
    else if (e.code === "ArrowUp"){
        sess.rotateBlocks();
    }
    else if (e.code === "ArrowDown"){
        sess.blockDown();
    }
    sess.render();
});