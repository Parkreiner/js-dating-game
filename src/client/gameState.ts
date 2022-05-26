/**
 * Represents a contestant currently active in the game.
 *
 * If the contestant has not been loaded into the game yet, their value of state.index will be -1.
 */
type Contestant = {
  api: {
    id: number;
    name: string;
    datingBio: string;
    imgUrl: string | null;
    techBio: string | null;
  };

  state: {
    answers: string[];
    votes: number;
    index: number;
  };
};

type GameState = {
  questions: string[];
  currentQuestion: number;
  contestants: Contestant[];
};

function resetGameState(state: GameState): GameState {
  const newGameState: GameState = {
    questions: [...state.questions],
    currentQuestion: 0,
    contestants: state.contestants.map(resetContestant),
  };

  // Shuffle contestants and then update their indices for display purposes
  shuffle(newGameState.contestants);
  for (let i = 0; i < newGameState.contestants.length; i++) {
    const contestant = newGameState.contestants[i];
    if (!contestant) throw new Error("Grabbed contestant at wrong index.");

    contestant.state.index = i + 1;
  }

  shuffleQuestionsAnswers(newGameState);
  return newGameState;
}

function resetContestant(con: Contestant): Contestant {
  const newContestantState = {
    answers: [...con.state.answers],
    votes: 0,
    index: -1,
  };

  return { ...con, state: newContestantState };
}

/**
 * Shuffles the questions for a GameState object, while also updating the order of each Contestant's
 * answers, so that questions and answers stay in sync.
 */
function shuffleQuestionsAnswers(state: GameState): GameState {
  const shuffledIndices = shuffle(state.questions.map((_, index) => index));

  state.questions = shuffledIndices.map((i) => {
    const newQuestion = state.questions[i];
    if (newQuestion == null) throw new RangeError("Went out of bounds for questions.");
    return newQuestion;
  });

  for (const contestant of state.contestants) {
    contestant.state.answers = shuffledIndices.map((i) => {
      const newAnswer = contestant.state.answers[i];
      if (newAnswer == null) throw new RangeError("Went out of bounds for contestants.");

      return newAnswer;
    });
  }

  return state;
}

/**
 * Shuffles any kind of array in place.
 */
function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.round(Math.random() * i);

    const temp = array[i] as T;
    array[i] = array[randomIndex] as T;
    array[randomIndex] = temp;
  }

  return array;
}

export { Contestant, GameState, resetGameState };
