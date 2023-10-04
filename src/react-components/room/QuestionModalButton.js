import React from "react";
import { ToolbarButton } from "../input/ToolbarButton";
import { ReactComponent as ShareIcon } from "../icons/Share.svg";
import PropTypes from "prop-types";

export const QuestionModalButton = ({ visible, toggle, hubChannel }) => {
  const title = "Quizz";

  const isCreator = hubChannel.canOrWillIfCreator("update_hub");

  if (!isCreator) return null;
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
  hubChannel: PropTypes.object.isRequired,
  toggle: PropTypes.func
};
