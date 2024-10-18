export const initialState = {
  board: Array(9).fill(null), // Default is 3x3
  isXNext: true,
  scores: { X: 0, O: 0, Draw: 0 },
  winner: null,
  boardSize: 3, // Default board size
  timeLeft: 10, // Time limit in seconds for each move
  isDraw: false, // New property to track if the game ended in a draw
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case "MAKE_MOVE":
      if (state.board[action.index] || state.winner) return state;

      const newBoard = state.board.slice();
      newBoard[action.index] = state.isXNext ? "X" : "O";

      const winner = calculateWinner(newBoard, state.boardSize);
      const isBoardFull = newBoard.every((square) => square !== null);

      let updatedScores = { ...state.scores };
      if (winner) {
        updatedScores[winner] += 1;
      } else if (isBoardFull && !state.winner && state.board.includes(null)) {
        updatedScores.Draw += 1;
      }

      return {
        ...state,
        board: newBoard,
        isXNext: !state.isXNext,
        winner,
        scores: updatedScores,
      };

    case "RESET_GAME":
      return {
        ...state,
        board: Array(state.boardSize * state.boardSize).fill(null),
        isXNext: true,
        winner: null,
      };

    case "SET_BOARD_SIZE":
      return {
        ...state,
        boardSize: action.size,
        board: Array(action.size * action.size).fill(null),
        isXNext: true,
        winner: null,
      };

    default:
      return state;
  }
};

const calculateWinner = (squares, boardSize) => {
  const lines = [];
  for (let i = 0; i < boardSize; i++) {
    lines.push(Array(boardSize).fill().map((_, j) => i * boardSize + j));
  }
  for (let i = 0; i < boardSize; i++) {
    lines.push(Array(boardSize).fill().map((_, j) => i + j * boardSize));
  }
  lines.push(Array(boardSize).fill().map((_, i) => i * (boardSize + 1)));
  lines.push(Array(boardSize).fill().map((_, i) => (i + 1) * (boardSize - 1)));

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, ...rest] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && rest.every(index => squares[a] === squares[index])) {
      return squares[a];
    }
  }

  return null;
};