import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import TicTacToe from "./components/TicTacToe";
import HowToPlay from "./components/HowToPlay";

const App = () => {
  const [boardSize, setBoardSize] = useState(3);

  const handleGameModeChange = (size) => {
    setBoardSize(size);
  };

  return (
    <Router>
      <div className="App">
        <Helmet>
          <title>TicTacZone</title>
        </Helmet>
        <Navbar onGameModeChange={handleGameModeChange} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/vs-ai" element={<TicTacToe isAI={true} boardSize={boardSize} />} />
          <Route path="/two-player" element={<TicTacToe isAI={false} boardSize={boardSize} />} />
          <Route path="/how-to-play" element={<HowToPlay />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;