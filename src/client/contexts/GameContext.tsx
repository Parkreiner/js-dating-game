import { createContext } from "react";

type GameStatus = {
  gameOver: boolean;
};

type GameStatusState = [GameStatus, Function];

const GameContext = createContext<GameStatusState>([{ gameOver: true }, () => {}]);

export { GameContext, GameStatus, GameStatusState };
