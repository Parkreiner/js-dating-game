import { FunctionComponent, useState } from "react";
import { render } from "react-dom";

import TitleCard from "./Titlecard";
import { GameContext, GameStatus, GameStatusState } from "./contexts/GameContext";
import Prompter from "./Prompter";

const App: FunctionComponent = () => {
  const gameStatus: GameStatusState = useState<GameStatus>({ gameOver: true });

  return (
    <GameContext.Provider value={gameStatus}>
      <div className="game-container">
        <TitleCard />
        <Prompter />
      </div>
    </GameContext.Provider>
  );
};

render(<App />, document.getElementById("root"));
