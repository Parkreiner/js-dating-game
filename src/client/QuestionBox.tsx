import { FunctionComponent } from "react";

type QuestionBoxProps = {
  questionNumber: number;
  question: string;
};

const QuestionBox: FunctionComponent<QuestionBoxProps> = ({ questionNumber, question }) => {
  return (
    <div className="prompter-box questions-box">
      <h2>Question No. {questionNumber}</h2>
      <p>{question}</p>
    </div>
  );
};

export default QuestionBox;
