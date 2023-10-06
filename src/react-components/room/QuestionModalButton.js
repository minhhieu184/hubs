import React from "react";
import { ToolbarButton } from "../input/ToolbarButton";
import { ReactComponent as PenIcon } from "../icons/Pen.svg";
import PropTypes from "prop-types";

export const QuestionModalButton = ({ visible, toggle }) => {
  const title = "Quizz";

  return (
    <ToolbarButton
      // ref={triggerRef}
      icon={<PenIcon />}
      selected={visible}
      onClick={toggle}
      label={title}
      preset="accent1"
    />
  );
};

QuestionModalButton.propTypes = {
  visible: PropTypes.bool,
  toggle: PropTypes.func
};
