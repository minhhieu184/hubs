import React from "react";
import styles from "./QuizzList.scss";
import PropTypes from "prop-types";
// import classNames from "classnames";
import { TitleWithClose, QuizzLayout, QuestionImage } from "./QuizzLayout";
import { FormattedMessage } from "react-intl";
import { Typography } from "../ui-components";
import { Button } from "../ui-components/Button";

const QuizzListBeforeHeader = () => {
  return <TitleWithClose title={<FormattedMessage id="quizzList.title" defaultMessage="Question" />} />;
};

const List = ({ children }) => {
  return <ul className={styles.list}>{children}</ul>;
};

const QuizzItem = () => {
  return (
    <li className={styles.quizzItem}>
      <Typography size={18}>1. What is your name? </Typography>
      <div className="buttons">
        <Button type="success" state="secondary" content="Start" />
        <Button type="danger" state="secondary" content="Stop" />
        <Button type="safe" state="secondary" content="Result" />
      </div>
    </li>
  );
};

List.propTypes = {
  children: PropTypes.node
};

export function QuizzList() {
  return (
    <QuizzLayout beforeHeader={<QuizzListBeforeHeader />} afterHeader={<QuestionImage />}>
      <List>
        <QuizzItem />
        <QuizzItem />
        <QuizzItem />
        <QuizzItem />
      </List>
    </QuizzLayout>
  );
}
QuizzList.propTypes = {
  children: PropTypes.node,
  beforeHeader: PropTypes.node,
  centerHeader: PropTypes.node,
  afterHeader: PropTypes.node
};
