import React from "react";
import PropTypes from "prop-types";
import styles from "./Typography.scss";
import classNames from "classnames";

export const Typography = ({
  className: _className,
  as: As = "p",
  size = 18,
  weight = "regular",
  lineHeight = "regular",
  children,
  ...rest
}) => {
  console.log("styles:", styles);
  const className = classNames(
    styles.typography,
    {
      [styles[`${size}Size`]]: true,
      [styles[`${weight}Weight`]]: true,
      [styles[`${lineHeight}LineHeight`]]: true
    },
    _className
  );

  return (
    <As className={className} {...rest}>
      {children}
    </As>
  );
};

Typography.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  as: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6", "p"]),
  size: PropTypes.oneOf([42, 38, 28, 24, 20, 18, 16, 14, 12, 10]),
  weight: PropTypes.oneOf(["bold", "semiBold", "medium", "regular"]),
  lineHeight: PropTypes.oneOf(["height", "medium", "regular"])
};
