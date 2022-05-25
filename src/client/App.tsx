import { FunctionComponent, useState } from "react";
import { render } from "react-dom";

import TitleCard from "./Titlecard";
import { GameContext, GameStatus, GameStatusState } from "./contexts/GameContext";

const App: FunctionComponent = () => {
  const gameStatus: GameStatusState = useState<GameStatus>({ gameOver: true });

  return (
    <GameContext.Provider value={gameStatus}>
      <div className="game-container">
        <TitleCard />
      </div>
    </GameContext.Provider>
  );
};

render(<App />, document.getElementById("root"));
