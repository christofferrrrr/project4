import React, { useState } from "react";
import "../css/Navbar.css";

const Navbar = ({ onGameModeChange, onDifficultyChange }) => {
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);

  const handleBurgerClick = () => {
    setBurgerMenuOpen(!isBurgerMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">TicTacZone</div>
      <div className="nav-items">
        <div className="burger-menu">
          <button className="burger-icon" onClick={handleBurgerClick}>
            &#9776;
          </button>
          {isBurgerMenuOpen && (
            <div className="burger-content">
              <div className="dropdown">
                <a href="#!" className="dropbtn">Board Size</a>
                <div className="dropdown-content">
                  <a href="#!" onClick={() => onGameModeChange(3)}>3x3</a>
                  <a href="#!" onClick={() => onGameModeChange(4)}>4x4</a>
                  <a href="#!" onClick={() => onGameModeChange(5)}>5x5</a>
                </div>
              </div>
              <div className="dropdown">
                <a href="#!" className="dropbtn">Difficulty</a>
                <div className="dropdown-content">
                  <a href="#!" onClick={() => onDifficultyChange("easy")}>Easy</a>
                  <a href="#!" onClick={() => onDifficultyChange("medium")}>Medium</a>
                  <a href="#!" onClick={() => onDifficultyChange("hard")}>Hard</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;