import { useState } from "react";


function Square({ value, onSquareClick, winner=false }) {
  let squareClass = `square ${winner ? 'winning-square' : ''}`;
  return (
    <button className={squareClass} onClick={onSquareClick}>
      {value}
    </button>
  );
}


function Board({ squares, xIsNext, onPlay }) {

  function handleClick(i) {
    // check if the square is already filled with 'X' or 'O'
    if (squares[i] || checkWinner(squares)) {
      return;
    }

    // creating shallow copy of the current square array
    const nextSquares = squares.slice()


    // check if this square is already clicked once
    nextSquares[i] = xIsNext === true ? 'X' : 'O';

    onPlay(nextSquares)
  }

  const winning_info = checkWinner(squares);
  const winner = winning_info ? winning_info[0] : null;
  const winning_line = winning_info ? winning_info[1] : [];

  let status;
  if (winner) {
    status = `Winner is: ${winner}`;
  } 
  else {
    // if no element element is null then every square has been clicked
    // but still winner is null means it is a draw 
    const is_game_complete = squares.every(elem => elem !== null)
    if (is_game_complete) {
      status = 'It is draw';
    }
  }

 
  function winning_sqaure(i) {
    return winning_line.includes(i) 
  }


  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} winner={winning_sqaure(0)}/> 
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} winner={winning_sqaure(1)}/> 
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} winner={winning_sqaure(2)}/> 
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} winner={winning_sqaure(3)}/> 
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} winner={winning_sqaure(4)}/> 
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} winner={winning_sqaure(5)}/> 
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} winner={winning_sqaure(6)}/> 
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} winner={winning_sqaure(7)}/> 
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} winner={winning_sqaure(8)}/> 
      </div>
    </>
  );
}

function checkWinner(squares) {
  const winner_lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4,7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < winner_lines.length; i++) {
    const [a, b, c] = winner_lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], winner_lines[i]];
    }
  }
  return null;
}


export default function Game() {

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [ascending, setAscending] = useState(true);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const displayOrder = ascending ? 'ASC' : 'DESC';

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  function toggleDisplayOrder() {
    setAscending(!ascending);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move === 0) {
      description = 'Go to Game Start';
    }
    else if (move === currentMove) {
      description = 'You are at the move #' + move;
    } 
    else {
      description = 'Go to move #' + move;
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}> {description} </button>
      </li>
    );
  });


  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} xIsNext={xIsNext} onPlay={handlePlay} />
      </div>

      <div className="game-info">
        <button onClick={toggleDisplayOrder}>{displayOrder}</button>
        <ol> { ascending ? moves: moves.slice().reverse()} </ol>
      </div>
    </div>
  )
}


