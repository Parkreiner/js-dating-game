import { FunctionComponent, useContext, useEffect, useReducer, useState } from "react";
import QuestionBox from "./QuestionBox";
import ContestantsBox from "./ContestantBox";
import { GameContext } from "./contexts/GameContext";

import { mockData } from "./data/mockData";
import { resetGameState, GameState, Contestant } from "./gameState";

type Deferred<T> = { loaded: true; value: T } | { loaded: false };

const Prompter: FunctionComponent = () => {
  const [deferred, setDeferred] = useState<Deferred<GameState>>({ loaded: false });
  const [{ gameOver }] = useContext(GameContext);

  useEffect(() => {
    // If I had more time, I would populate this with data from a real API call
    setDeferred({ loaded: true, value: resetGameState(mockData) });
  }, []);

  if (gameOver) {
    return null;
  }

  if (!deferred.loaded) {
    return (
      <div>
        <p>Loading data. One moment, please...</p>
      </div>
    );
  }

  const { questions, contestants, currentQuestion } = deferred.value;
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
  function toContestantsBox(con: Contestant) {
    const answer = con.state.answers[currentQuestion];
    if (answer == null) throw new TypeError("Went out of bounds.");

    return <ContestantsBox key={con.api.id} answer={answer} contestantNum={con.state.index} />;
  }
};

export default Prompter;
