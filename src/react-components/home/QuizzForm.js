import React from "react";
import styles from "./QuizzForm.scss";
import PropTypes from "prop-types";
import classNames from "classnames";
import { QuestionImage, QuizzLayout } from "./QuizzLayout";
import { Typography } from "../ui-components";
import { FormattedMessage } from "react-intl";
import { ResultInfo } from "./ResultInfo";
import { QuizzRadioInput } from "../ui-components/QuizzRadioInput";

export const QuizzForm = () => {
  const question = (
    <Typography size={24} weight="semiBold">
      <FormattedMessage id="resultList.question" defaultMessage="What is your name?" />
    </Typography>
  );
  const t = "I am 10 years old";
  return (
    <QuizzLayout centerHeader={<QuestionImage />}>
      <ResultInfo index={1} total={10} question={question} className={styles.resultInfo} />
      <form className={styles.quizzForm}>
        <QuizzRadioInput active={true} index={0} id="1" name="r" label={t} />
        <QuizzRadioInput index={1} id="2" name="r" label={t} />
        <QuizzRadioInput index={2} id="3" name="r" label={t} />
        <QuizzRadioInput index={3} id="4" name="r" label={t} />
      </form>
    </QuizzLayout>
  );
};

QuizzForm.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};
