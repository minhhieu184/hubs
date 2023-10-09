import React from "react";
import styles from "./ResultList.scss";
import PropTypes from "prop-types";
import classNames from "classnames";
import { ResultImage, TitleWithClose, QuizzLayout } from "./QuizzLayout";
import { FormattedMessage } from "react-intl";
import { Typography } from "../ui-components";
import { ResultInfo } from "./ResultInfo";
import { QuizzRadioInput } from "../ui-components/QuizzRadioInput";

const ResultListBeforeHeader = () => {
  return <TitleWithClose title={<FormattedMessage id="resultList.title" defaultMessage="Result" />} />;
};

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

export function ResultList({ children, className, ...rest }) {
  const question = (
    <Typography size={18} weight="medium">
      <FormattedMessage id="resultList.question" defaultMessage="What is your name?" />
    </Typography>
  );
  return (
    <QuizzLayout beforeHeader={<ResultListBeforeHeader />} afterHeader={<ResultImage />}>
      <ResultInfo index={1} total={10} question={question} />
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
  children: PropTypes.node,
  className: PropTypes.string
};
