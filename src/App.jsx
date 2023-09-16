import Grid from './components/Grid'
import { useState, useEffect } from 'react';
import TetrisLogic from './game_logic/tetris_logic.js'
import './css/App.css'
import { pauseShift, pauseReset, gameOverShift, gameOverReset, selectCont } from './app/reducer/contSlice'
import { gridShift, gridReset, selectGrid } from './app/reducer/gridSlice'
import { scoreShift, scoreReset, rowsShift, rowsReset, levelShift, levelReset, selectStats } from './app/reducer/statsSlice'
import { useSelector, useDispatch } from 'react-redux'

Array.prototype.subarray = function(start, end) {
  if (!end) { end = -1; } 
  return this.slice(start, this.length + 1 - (end * -1));
};

function App() {
  let [sess] = useState(new TetrisLogic());
  const [gameOover, setGameOver] = useState(false);
  let i = false;
  const { score, rows, level } = useSelector(selectStats);
  const { pause, gameOver } = useSelector(selectCont);
  const { grid } = useSelector(selectGrid);
  const dispatch = useDispatch();

  const updateState = () => {
    const curState = sess.getState();
    dispatch(scoreShift(curState.score));
    dispatch(rowsShift(curState.rows));
    dispatch(levelShift(curState.level));
    dispatch(pauseShift(curState.paused));
    dispatch(gridShift(curState.grid));
    dispatch(gameOverShift(curState.game_over));
  }

  useEffect(() => {
    setTimeout(() => {
      if (gameOver) console.log('Game over');
      else{
        sess.outer_procedure();
        updateState();
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
      <Grid grid={grid.grid.subarray(5, -1)}/>
      <button onClick={()=>sess.setPause()} disabled={gameOver}>{pause? "Continue" : "Pause"} Game</button>
      <button onClick={()=>{sess.newSesh(); updateState()}}>New Game</button>
    </div>
  );
}

export default App;
