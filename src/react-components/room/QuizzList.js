import React, { useState } from "react";
import styles from "./QuizzList.scss";
import PropTypes from "prop-types";
// import classNames from "classnames";
import { TitleWithClose, QuizzLayout, QuestionImage } from "../ui-components";
import { FormattedMessage } from "react-intl";
import { Typography } from "../ui-components";
import { Button } from "../ui-components/Button";
import { ResultList } from "./ResultList";

const QuizzListBeforeHeader = ({ onClose }) => {
  return (
    <TitleWithClose onClose={onClose} title={<FormattedMessage id="quizzList.title" defaultMessage="Question" />} />
  );
};
QuizzListBeforeHeader.propTypes = {
  onClose: PropTypes.func
};

const List = ({ children }) => {
  return <ul className={styles.list}>{children}</ul>;
};
List.propTypes = {
  children: PropTypes.node
};

const QuizzItem = ({ index, question, showResult }) => {
  return (
    <li className={styles.quizzItem}>
      <Typography size={18}>{`${index + 1}. ${question.question}`}</Typography>
      <div className="buttons">
        <Button type="success" state="secondary" content="Start" />
        <Button type="danger" state="secondary" content="Stop" />
        <Button type="safe" state="secondary" content="Result" onClick={showResult} />
      </div>
    </li>
  );
};
QuizzItem.propTypes = {
  question: PropTypes.object,
  index: PropTypes.number,
  showResult: PropTypes.func
};

export function QuizzList({ roomId, questions, onClose }) {
  const [selectedResult, setSelectedResult] = useState(-1);

  const deselectResult = () => {
    console.log("sdkfjb");
    setSelectedResult(-1);
  };

  if (selectedResult !== -1) {
    return (
      <ResultList
        index={selectedResult}
        total={questions.length}
        question={questions[selectedResult]}
        onClose={deselectResult}
      />
    );
  }

  const beforeHeader = (
    <TitleWithClose onClose={onClose} title={<FormattedMessage id="quizzList.title" defaultMessage="Question" />} />
  );

  return (
    <QuizzLayout beforeHeader={beforeHeader} afterHeader={<QuestionImage />}>
      <List>
        {questions.map((question, index) => (
          <QuizzItem key={question.id} index={index} question={question} showResult={() => setSelectedResult(index)} />
        ))}
      </List>
    </QuizzLayout>
  );
}
QuizzList.propTypes = {
  roomId: PropTypes.string,
  questions: PropTypes.array,
  onClose: PropTypes.func
};
