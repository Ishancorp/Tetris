import '../css/Grid.css';

function Tile({x, y, color}) {
  const subtile = color ? <div className={`subtile ${y}${x}` + ` sc${color}`}></div> : '';
  return (
    <div className={`tile ${y}${x}` + ` c${color}`}>
      {subtile}
    </div>);
}

Array.prototype.subarray = function(start, end) {
  if (!end) { end = -1; } 
  return this.slice(start, this.length + 1 - (end * -1));
};

function Grid(props) {
  return (
    <div className='grid'>
      {props.grid.map((row, y) =>
        <div className='row'>
          {row.map((color, x) => 
            <Tile x={x} y={y} color={color}/>
          )}
        </div>
      )}
    </div>);
}

export default Grid;