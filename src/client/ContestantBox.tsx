import { FunctionComponent } from "react";
import { Contestant } from "./gameState";

type ContestantsBoxProps = {
  answer: string;
  contestantNum: number;
  tabIndex: number;
  vote: () => void;
};

const ContestantsBox: FunctionComponent<ContestantsBoxProps> = ({
  answer,
  contestantNum,
  tabIndex,
  vote,
}) => {
  return (
    <div
      className="prompter-box contestant-box"
      onClick={vote}
      onKeyUp={vote}
      role="button"
      tabIndex={tabIndex}
    >
      <h2>Contestant No. {contestantNum}</h2>
      <p>{answer}</p>
    </div>
  );
};

export default ContestantsBox;
