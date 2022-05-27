import { FunctionComponent, useContext, useEffect, useReducer, useState } from "react";
import QuestionBox from "./QuestionBox";
import ContestantsBox from "./ContestantBox";
import { GameContext } from "./contexts/GameContext";

import { mockData } from "./data/mockData";
import { resetGameState, GameState, Contestant } from "./gameState";
import { reduceGameState } from "./reducers/gameStateReducer";

type Loadable<T> = { loaded: true; value: T } | { loaded: false; value: null };

const Prompter: FunctionComponent = () => {
  const [{ gameOver }] = useContext(GameContext);
  const [gameState, dispatch] = useReducer(reduceGameState, mockData);

  useEffect(() => {
    // If I had more time, I would populate this with data from a real API call
    dispatch({ type: "RESET" });
  }, []);

  if (gameOver) {
    return null;
  }

  const { questions, contestants, currentQuestion } = gameState;
  const currentQuestionText = questions[currentQuestion] ?? "Whoops. That's an error.";

  return (
    <div className="prompter-container">
      <div className="prompter">
        <div className="img-container prompter-img">
          <img src="https://i.imgur.com/jlxI41Q.png" alt="JS Dating Game logo" />
        </div>

        <QuestionBox question={currentQuestionText} questionNumber={currentQuestion + 1} />

        <div className="contestants-container">{contestants.map(toContestantsBox)}</div>
      </div>
      <div className="prompter-spacer"></div>
    </div>
  );

  ////////// Start of internal helpers

  // Relies on closure
  function toContestantsBox(con: Contestant, arrayIndex: number) {
    const answer = con.state.answers[currentQuestion];
    if (answer == null) throw new TypeError("Went out of bounds.");

    const voteDispatch = () => {
      dispatch({ type: "VOTE", payload: { contestantIndex: con.state.index - 1 } });
    };

    return (
      <ContestantsBox
        tabIndex={arrayIndex}
        key={con.api.id}
        answer={answer}
        contestantNum={con.state.index}
        vote={voteDispatch}
      />
    );
  }
};

export default Prompter;
