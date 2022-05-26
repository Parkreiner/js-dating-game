import { FunctionComponent, useContext } from "react";
import { GameContext } from "./contexts/GameContext";

const Titlecard: FunctionComponent = () => {
  const [{ gameOver }, setContext] = useContext(GameContext);
  const imgUrl = "https://i.imgur.com/jlxI41Q.png";

  const updateContext = () => setContext({ gameOver: false });

  return !gameOver ? null : (
    <div className="titlecard-wrapper">
      <div className="titlecard">
        <h1>The JavaScript Dating Game</h1>
        <div className="img-container">
          <img src={imgUrl} alt="JavaScript Dating Game logo" />
        </div>
        <p>
          You&rsquo;re looking for love, and a JavaScript feature might just be what you&rsquo;re
          looking for. Play the game and find out who&rsquo;s right for you!{" "}
        </p>

        <button className="btn btn-game-start" onClick={updateContext} onBlur={updateContext}>
          Start
        </button>
      </div>
    </div>
  );
};

export default Titlecard;
