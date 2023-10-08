import React from "react";
import styles from "./Box.scss";
import PropTypes from "prop-types";
import classNames from "classnames";

export function Box({ children, className, ...rest }) {
  return (
    <div className={classNames(styles.box, className)} {...rest}>
      {children}
    </div>
  );
}

Box.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};
