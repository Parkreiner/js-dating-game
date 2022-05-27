import { Contestant, GameState, resetGameState } from "../gameState";
import { mockData } from "../data/mockData";

type GameStateAction = { type: "VOTE"; payload: { contestantIndex: number } } | { type: "RESET" };

function reduceGameState(state: GameState = mockData, action: GameStateAction): GameState {
  switch (action.type) {
    case "VOTE": {
      // Contestant should only be null if index somehow goes out of bounds
      const contestant = state.contestants[action.payload.contestantIndex];
      if (contestant == null) return state;

      const contestantsCopy = [...state.contestants];
      contestantsCopy[action.payload.contestantIndex] = {
        ...contestant,
        state: {
          answers: contestant.state.answers,
          index: contestant.state.index,
          votes: contestant.state.votes + 1,
        },
      };

      return {
        ...state,
        currentQuestion: (state.currentQuestion + 1) % state.questions.length,
        contestants: contestantsCopy,
      };
    }

    case "RESET":
      return resetGameState(state);
    default:
      return state;
  }
}

export { reduceGameState, GameStateAction };
