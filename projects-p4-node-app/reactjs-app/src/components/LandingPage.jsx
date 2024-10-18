import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/LandingPage.css";
import LandingPageLogo from "./LandingPageLogo"; // Import the new component

const LandingPage = () => {
  const navigate = useNavigate();

  const handleVsAI = () => {
    navigate("/vs-ai");
  };

  const handleTwoPlayer = () => {
    navigate("/two-player");
  };

  const handleHowToPlay = () => {
    navigate("/how-to-play");
  };

  return (
    <div className="landing-page">
      <LandingPageLogo /> {/* Use the new component */}
      
      <button className="how-to-play-button" onClick={handleHowToPlay}>
        How to Play
      </button>

      <div className="buttons">
        <button className="mode-button" onClick={handleVsAI}>
          VS AI
        </button>
        <button className="mode-button" onClick={handleTwoPlayer}>
          2 Player
        </button>
      </div>
      <footer className="footer">
        
      </footer>
    </div>
  );
};

export default LandingPage;