import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import "../css/Scoreboard.css";

const Scoreboard = ({ scores }) => {
  return (
    <div className="scoreboard">
      <Link to="/" className="sb-button">
        <Button>Back to Home</Button>
      </Link>
      <h2>Scoreboard</h2>
      <p>X Wins: {scores?.X || 0}</p>
      <p>O Wins: {scores?.O || 0}</p>
      <p>Draws: {scores?.Draw || 0}</p>
    </div>
  );
};

export default Scoreboard;