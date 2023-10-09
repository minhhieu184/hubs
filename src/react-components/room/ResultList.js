import React from "react";
import styles from "./ResultList.scss";
import PropTypes from "prop-types";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { QuizzLayout, QuizzRadioInput, ResultImage, TitleWithClose, Typography } from "../ui-components";
import { ResultInfo } from "./ResultInfo";

const StudentImage = () => {
  return (
    <div className={styles.studentImg}>
      <div></div>
    </div>
  );
};
const StudentName = () => {
  const students = ["Liam", "Harper", "Ensd"];
  return (
    <>
      {students.map(student => (
        <>
          <span>-</span>
          <Typography>{student}</Typography>
        </>
      ))}
    </>
  );
};

const ResultItem = ({ id, index }) => {
  const t = "I am 10 years old";

  return (
    <div className={styles.resultItem}>
      <QuizzRadioInput disable={true} index={index} id={id} name="r" label={t} />
      <div className="studentList">
        <StudentImage />
        <StudentName />
      </div>
    </div>
  );
};
ResultItem.propTypes = {
  id: PropTypes.string,
  index: PropTypes.number
};

export function ResultList({ question, index, total, onClose }) {
  const questionComponent = (
    <Typography size={18} weight="medium">
      {question.question}
    </Typography>
  );
  const beforeHeader = (
    <TitleWithClose onClose={onClose} title={<FormattedMessage id="resultList.title" defaultMessage="Result" />} />
  );

  return (
    <QuizzLayout beforeHeader={beforeHeader} afterHeader={<ResultImage />}>
      <ResultInfo index={index} total={total} question={questionComponent} />
      <div className={styles.resultList}>
        <ResultItem id="1" index={0} />
        <ResultItem id="2" index={1} />
        <ResultItem id="3" index={2} />
        <ResultItem id="4" index={3} />
      </div>
    </QuizzLayout>
  );
}
ResultList.propTypes = {
  question: PropTypes.object,
  index: PropTypes.number,
  total: PropTypes.number,
  onClose: PropTypes.func
};
