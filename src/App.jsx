import Grid from './components/Grid'
import { useState, useEffect } from 'react';
import TetrisLogic from './game_logic/tetris_logic.js'
import './css/App.css'

Array.prototype.subarray = function(start, end) {
  if (!end) { end = -1; } 
  return this.slice(start, this.length + 1 - (end * -1));
};

function App() {
  let [sess] = useState(new TetrisLogic());
  const [grid, setGrid] = useState(sess.getFullGrid().subarray(3, -1));
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(1);
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  let i = false;

  const updateState = () => {
    const curState = sess.getState()
    setGrid(curState.grid);
    setScore(curState.score);
    setRows(curState.rows);
    setLevel(curState.level);
    setPaused(curState.paused);
    setGameOver(curState.game_over);
  }

  useEffect(() => {
    setTimeout(() => {
      if (gameOver) console.log('Game over');
      else{
        sess.outer_procedure();
        updateState();
        console.log(grid);
      }
    }, 5);
  });

  useEffect(() => {
    window.addEventListener('keydown', event => {
      if (event.code === "ArrowLeft" && i) {
        sess.blockLeft();
      }
      else if (event.code === "ArrowRight" && i) {
          sess.blockRight();
      }
      else if (event.code === "ArrowUp" && i){
          sess.rotateBlocks();
      }
      else if (event.code === "ArrowDown" && i){
          sess.blockDown();
      }
      i = !i
    });
  }, [sess]);

  return (
    <div className='app'>
      <p>Score: {score}</p>
      <p>Rows: {rows}</p>
      <p>Level {level}</p>
      <Grid grid={grid.subarray(3, -1)}/>
      <button onClick={()=>sess.setPause()} disabled={gameOver}>{paused? "Continue" : "Pause"} Game</button>
      <button onClick={()=>{sess.newSesh(); updateState()}}>New Game</button>
    </div>
  );
}

export default App;
