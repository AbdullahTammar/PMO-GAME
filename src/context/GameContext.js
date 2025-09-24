import React, { createContext, useState } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(-1);

  return (
    <GameContext.Provider value={{ currentIndex, setCurrentIndex }}>
      {children}
    </GameContext.Provider>
  );
};
