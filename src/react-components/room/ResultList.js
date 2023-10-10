import React, { Fragment } from "react";
import styles from "./ResultList.scss";
import PropTypes from "prop-types";
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

const ResultItem = ({ id, index, label, students }) => {
  return (
    <div className={styles.resultItem}>
      <QuizzRadioInput disable={true} index={index} id={id} name="r" label={label} />
      <div className="studentList">
        <StudentImage />
        {students?.map(student => (
          <Fragment key={student}>
            <span>-</span>
            <Typography>{student}</Typography>
          </Fragment>
        )) || null}
      </div>
    </div>
  );
};
ResultItem.propTypes = {
  id: PropTypes.string,
  index: PropTypes.number,
  label: PropTypes.string,
  students: PropTypes.array
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

  const students = {};
  for (const student in question.answers) {
    const answer = question.answers[student];
    if (!students[answer]) students[answer] = [student];
    else students[answer].push(student);
  }
  console.log("ResultList ~ students:", students);

  return (
    <QuizzLayout beforeHeader={beforeHeader} afterHeader={<ResultImage />}>
      <ResultInfo index={index} total={total} question={questionComponent} />
      <div className={styles.resultList}>
        {question.options.map((option, index) => (
          <ResultItem key={option} id={option} index={index} label={option} students={students[index]} />
        ))}
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
