import { FunctionComponent, useContext } from "react";
import { GameContext } from "./contexts/GameContext";

const Titlecard: FunctionComponent = () => {
  const [{ gameOver }] = useContext(GameContext);

  if (!gameOver) {
    return null;
  }

  return (
    <div className="titlecard">
      <h1>The JavaScript Dating Game!</h1>
      <img src="./static/logo.png" alt="JavaScript Dating Game logo" />
      <p>
        You&rsquo;re looking for love, and a JavaScript feature might just be what you&rsquo;re
        looking for. Play the game and find out who&rsquo;s right for you!{" "}
      </p>
    </div>
  );
};

export default Titlecard;
