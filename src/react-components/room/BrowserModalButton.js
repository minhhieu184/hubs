import React from "react";
import { ToolbarButton } from "../input/ToolbarButton";
import { ReactComponent as ManabieIcon } from "../icons/Manabie.svg";
import PropTypes from "prop-types";

export const BrowserModalButton = ({ visible, toggle }) => {
  const title = "Manabie";

  return (
    <ToolbarButton
      // ref={triggerRef}
      icon={<ManabieIcon />}
      selected={visible}
      onClick={toggle}
      label={title}
      preset="accent1"
    />
  );
};

BrowserModalButton.propTypes = {
  visible: PropTypes.bool,
  toggle: PropTypes.func
};
