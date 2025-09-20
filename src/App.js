import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import "./App.css";
import { GameProvider } from "./context/GameContext";

function App() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.body.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.body.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div dir="rtl">
      <GameProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<GamePage />} />
          </Routes>
        </Router>
      </GameProvider>
    </div>
  );
}

export default App;
