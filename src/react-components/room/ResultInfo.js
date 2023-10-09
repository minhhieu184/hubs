import React from "react";
import styles from "./ResultInfo.scss";
import PropTypes from "prop-types";
import { Typography } from "../ui-components";
import classNames from "classnames";

export const ResultInfo = ({ question, index, total, className, ...rest }) => {
  return (
    <div className={classNames(styles.resultInfo, className)} {...rest}>
      <Typography style={{ color: "#777777" }}>{`${index} of ${total}`}</Typography>
      {question}
    </div>
  );
};
ResultInfo.propTypes = {
  question: PropTypes.node.isRequired,
  index: PropTypes.number,
  total: PropTypes.number,
  size: PropTypes.number,
  className: PropTypes.string
};
