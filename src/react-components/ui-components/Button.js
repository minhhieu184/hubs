import React from "react";
import styles from "./Button.scss";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Typography } from "./Typography";

export function Button({
  content,
  className,
  variant = "primary",
  state = "default",
  icon: Icon,
  iconPosition = "before",
  isCompact,
  ...rest
}) {
  const _className = classNames(
    styles.button,
    {
      [styles[`${variant}-${state}`]]: true,
      [styles.iconButton]: !!Icon
    },
    className
  );
  return (
    <button className={_className} {...rest}>
      {iconPosition === "before" && Icon ? <Icon /> : null}
      <Typography weight="medium">{content}</Typography>
      {iconPosition === "after" && Icon ? <Icon /> : null}
    </button>
  );
}

Button.propTypes = {
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary", "success", "warning", "safe", "danger", "tertiary"]),
  state: PropTypes.oneOf(["default", "secondary", "hover", "active", "selected", "disabled"]),
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["before", "after"]),
  isCompact: PropTypes.bool
};
