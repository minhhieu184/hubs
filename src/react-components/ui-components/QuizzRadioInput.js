import React from "react";
import styles from "./QuizzRadioInput.scss";
import PropTypes from "prop-types";
import classNames from "classnames";
import { ReactComponent as RadioActive } from "../icons/RadioActive.svg";
import { Typography } from "./Typography";

const answerNames = ["A", "B", "C", "D"];

export const QuizzRadioInput = ({ index, id, label, active, disable = false, className, ...rest }) => {
  return (
    <div className={classNames(styles.quizzRadioInput, className)} {...rest}>
      <input id={id} type="radio" {...rest} />
      <label htmlFor={id}>
        {disable ? null : active ? <RadioActive /> : <div className="inActive" />}
        <Typography>{answerNames[index]}</Typography>
        <Typography>{label}</Typography>
      </label>
    </div>
  );
};
QuizzRadioInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  index: PropTypes.number,
  active: PropTypes.bool,
  disable: PropTypes.bool,
  className: PropTypes.string
};
