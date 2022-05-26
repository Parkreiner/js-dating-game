import { createContext } from "react";

type GameStatus = {
  gameOver: boolean;
};

type GameStatusState = [GameStatus, React.Dispatch<React.SetStateAction<GameStatus>>];
const GameContext = createContext<GameStatusState>([{ gameOver: true }, () => {}]);

export { GameContext, GameStatus, GameStatusState };
