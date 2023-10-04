import React from "react";
import { ToolbarButton } from "../input/ToolbarButton";
import { ReactComponent as HomeIcon } from "../icons/Home.svg";
import PropTypes from "prop-types";

export const BrowserModalButton = ({ visible, toggle }) => {
  const title = "Manabie";

  return (
    <ToolbarButton
      // ref={triggerRef}
      icon={<HomeIcon />}
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
