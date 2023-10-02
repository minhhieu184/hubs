import React from "react";
import { ToolbarButton } from "../input/ToolbarButton";
import { ReactComponent as ShareIcon } from "../icons/Share.svg";
import PropTypes from "prop-types";

export const QuestionModalButton = ({ visible, toggle }) => {
  const title = "Question";

  return (
    <ToolbarButton
      // ref={triggerRef}
      icon={<ShareIcon />}
      selected={visible}
      onClick={toggle}
      label={title}
      preset="accent5"
    />
  );
};

QuestionModalButton.propTypes = {
  visible: PropTypes.bool,
  toggle: PropTypes.func
};
