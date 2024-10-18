import React, { useReducer, useEffect, useState } from "react";
import { gameReducer, initialState } from "../reducers/gameReducer";
import Scoreboard from "./Scoreboard";
import "../css/TicTacToe.css";

const TicTacToe = ({ isAI, boardSize }) => {
  const [state, dispatch] = useReducer(gameReducer, {
    ...initialState,
    boardSize,
    board: Array(boardSize * boardSize).fill(null),
  });
  const [timer, setTimer] = useState(10); // 10 seconds for each move

  const handleClick = (index) => {
    if (state.board[index] || state.winner || (isAI && !state.isXNext)) return;

    setTimer(10); // Reset timer on player move
    dispatch({ type: "MAKE_MOVE", index });
  };

  const aiMove = () => {
    const emptyIndices = state.board
      .map((value, index) => (value === null ? index : null))
      .filter((value) => value !== null);

    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    dispatch({ type: "MAKE_MOVE", index: randomIndex });
    setTimer(10); // Reset the timer after the AI moves
  };

  useEffect(() => {
    if (isAI && !state.isXNext && !state.winner) {
      const aiTimeout = setTimeout(() => {
        aiMove();
      }, 500); // AI moves after 500ms
      return () => clearTimeout(aiTimeout);
    }
  }, [state.isXNext, state.winner]); 

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000); // Countdown every second
      return () => clearTimeout(countdown);
    } else {
      // Handle timer reaching zero
      if (isAI && !state.isXNext) {
        aiMove(); // AI makes a move if timer runs out
      } else {
        dispatch({ type: "MAKE_MOVE", index: null }); // Handle timeout move or end game
      }
    }
  }, [timer, state.isXNext, state.winner]); 

  useEffect(() => {
    dispatch({ type: "SET_BOARD_SIZE", size: boardSize });
  }, [boardSize]);

  const resetGame = () => {
    dispatch({ type: "RESET_GAME" });
    setTimer(10); // Reset timer on game reset
  };

  const renderSquare = (index) => {
    const squareValue = state.board[index];
    const squareClass = squareValue ? `square ${squareValue}` : "square";
    return (
      <button className={squareClass} onClick={() => handleClick(index)}>
        {squareValue}
      </button>
    );
  };

  return (
    <div className="game">
      <Scoreboard scores={state.scores} />
      <div className="board" style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}>
        {state.board.map((_, index) => renderSquare(index))}
      </div>
      <div className="info">
        {state.winner ? (
          <h2>Winner: {state.winner}</h2>
        ) : state.board.every((square) => square !== null) ? (
          <h2>Draw!</h2>
        ) : (
          <>
            <h2>Player: {state.isXNext ? "X" : "O"}</h2>
            <h2>Time Remaining: {timer} seconds</h2>
          </>
        )}
        <button className="reset" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
