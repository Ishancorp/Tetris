import './App.css';
import { useState, useEffect } from 'react';
import TetrisLogic from './game_logic/tetris_logic.js'

function Tile({x, y, color}) {
  return <div className={`block ${y}${x}` + ` c${color}`}></div>
}

Array.prototype.subarray = function(start, end) {
  if (!end) { end = -1; } 
  return this.slice(start, this.length + 1 - (end * -1));
};

function Grid(props) {
  return (
    <div className='app'>
      {props.grid.map((row, y) =>
        <div className='row'>
          {row.map((color, x) => 
            <Tile x={x} y={y} color={color}/>
          )}
        </div>
      )}
    </div>);
}

function App() {
  let [sess] = useState(new TetrisLogic());
  const [grid, setGrid] = useState(sess.getFullGrid().subarray(3, -1));
  let i = false

  const thingy = () => {
    sess.outer_procedure();
    setGrid(sess.getFullGrid());
    console.log(grid);
  }

  useEffect(() => {
    setTimeout(() => {
      thingy();
    }, 10);
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
      <Grid grid={sess.getFullGrid().subarray(3, -1)}/>
    </div>
  );
}

export default App;
