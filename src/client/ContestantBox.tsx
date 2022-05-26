import { FunctionComponent } from "react";
import { Contestant } from "./gameState";

type ContestantsBoxProps = {
  answer: string;
  contestantNum: number;
};

const ContestantsBox: FunctionComponent<ContestantsBoxProps> = ({ answer, contestantNum }) => {
  return (
    <div className="prompter-box contestant-box">
      <h2>Contestant No. {contestantNum}</h2>
      <p>{answer}</p>
    </div>
  );
};

export default ContestantsBox;
