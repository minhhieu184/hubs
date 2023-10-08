import React from "react";
import styles from "./QuizzList.scss";
import PropTypes from "prop-types";
// import classNames from "classnames";
import { QuizzLayout } from "./QuizzLayout";
import { FormattedMessage } from "react-intl";
import { ReactComponent as CloseIcon } from "../icons/Close.svg";
import { Typography } from "./Typography";

const BeforeHeader = () => {
  return (
    <div className={styles.beforeHeader}>
      <CloseIcon />
      <Typography className="title" size={24} weight="semiBold">
        <FormattedMessage id="1Question" defaultMessage="Question" />
      </Typography>
    </div>
  );
};

const CenterHeader = () => {
  return (
    <div className={styles.centerHeader}>
      <div></div>
    </div>
  );
};

const AfterHeader = () => {
  return (
    <div className={styles.afterHeader}>
      <div></div>
    </div>
  );
};

export function QuizzList() {
  return (
    <>
      <QuizzLayout beforeHeader={<BeforeHeader />} centerHeader={<CenterHeader />} afterHeader={<AfterHeader />}>
        123
      </QuizzLayout>
      <QuizzLayout centerHeader={<CenterHeader />} afterHeader={<AfterHeader />}>
        123
      </QuizzLayout>
      <QuizzLayout afterHeader={<AfterHeader />}>123</QuizzLayout>
      <QuizzLayout beforeHeader={<BeforeHeader />} afterHeader={<AfterHeader />}>
        123
      </QuizzLayout>
      <QuizzLayout centerHeader={<CenterHeader />} afterHeader={<AfterHeader />}>
        123
      </QuizzLayout>
      <QuizzLayout centerHeader={<CenterHeader />}>123</QuizzLayout>
    </>
  );
}
QuizzList.propTypes = {
  children: PropTypes.node,
  beforeHeader: PropTypes.node,
  centerHeader: PropTypes.node,
  afterHeader: PropTypes.node
};
