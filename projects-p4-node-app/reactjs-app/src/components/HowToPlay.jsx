import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/HowToPlay.css";

const HowToPlay = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="how-to-play-page">
      <h1>How to Play Tic-Tac-Toe</h1>
      <div className="instructions">
        <h2>Objective</h2>
        <p>The objective of Tic-Tac-Toe is to be the first player to complete a line of consecutive marks (X or O) on the board.</p>

        <h2>Rules</h2>
        <ul>
          <li>The game can be played on different grid sizes: 3x3, 4x4, or 5x5.</li>
          <li>Players take turns putting their marks (X or O) in empty squares.</li>
          <li>
            The number of consecutive marks required to win depends on the board size:
            <ul>
              <li>3x3: 3 consecutive marks in a row (horizontally, vertically, or diagonally).</li>
              <li>4x4: 4 consecutive marks in a row (horizontally, vertically, or diagonally).</li>
              <li>5x5: 5 consecutive marks in a row (horizontally, vertically, or diagonally).</li>
            </ul>
          </li>
          <li>If all squares are filled and no player has the required number of consecutive marks, the game is a draw.</li>
        </ul>
      </div>
      <button className="back-button" onClick={handleBack}>
        Back to Home
      </button>
    </div>
  );
};

export default HowToPlay;