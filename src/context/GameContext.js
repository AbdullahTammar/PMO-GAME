import React, { createContext, useState } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <GameContext.Provider value={{ currentIndex, setCurrentIndex }}>
      {children}
    </GameContext.Provider>
  );
};
