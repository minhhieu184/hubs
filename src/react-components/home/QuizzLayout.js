import React from "react";
import styles from "./QuizzLayout.scss";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Box } from "../ui-components/Box";
import { Typography } from "../ui-components";
import { ReactComponent as CloseIcon } from "../icons/Close.svg";

export function QuizzLayout({ children, beforeHeader, centerHeader, afterHeader, className, ...rest }) {
  return (
    <Box className={classNames(styles.quizzLayout, className)} {...rest}>
      <QuizzHeader beforeHeader={beforeHeader} centerHeader={centerHeader} afterHeader={afterHeader} />
      {children}
    </Box>
  );
}

const QuizzHeader = ({ beforeHeader, centerHeader, afterHeader, className, ...rest }) => {
  const _className = classNames(styles.quizzHeader, !centerHeader && styles.quizzHeaderNoCenter, className);

  return (
    <div className={_className} {...rest}>
      <div>{beforeHeader}</div>
      <div>{centerHeader}</div>
      <div>{afterHeader}</div>
    </div>
  );
};

QuizzHeader.propTypes = {
  beforeHeader: PropTypes.node,
  centerHeader: PropTypes.node,
  afterHeader: PropTypes.node,
  className: PropTypes.string
};

QuizzLayout.propTypes = {
  children: PropTypes.node,
  beforeHeader: PropTypes.node,
  centerHeader: PropTypes.node,
  afterHeader: PropTypes.node,
  className: PropTypes.string
};

export const TitleWithClose = ({ title }) => {
  return (
    <div className={styles.titleWithClose}>
      <CloseIcon />
      <Typography className="title" size={24} weight="semiBold">
        {title}
      </Typography>
    </div>
  );
};
TitleWithClose.propTypes = {
  title: PropTypes.node
};

export const QuestionImage = () => {
  return (
    <div className={styles.questionImg}>
      <div></div>
    </div>
  );
};

export const ResultImage = () => {
  return (
    <div className={styles.resultImg}>
      <div></div>
    </div>
  );
};
