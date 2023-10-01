import React from "react";
import { ToolbarButton } from "../input/ToolbarButton";
import { ReactComponent as ShareIcon } from "../icons/Share.svg";
import PropTypes from "prop-types";

export const BrowserModalButton = ({ visible, toggle }) => {
  const title = "Browser";

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

BrowserModalButton.propTypes = {
  visible: PropTypes.bool,
  toggle: PropTypes.func
};
