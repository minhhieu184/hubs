import React from "react";
import { Modal } from "../modal/Modal";
import styles from "./BrowserModal.scss";
import PropTypes from "prop-types";
import classNames from "classnames";

export const BrowserModal = ({ visible }) => {
  return (
    <Modal className={classNames(styles.browserModal, visible || styles.hide)}>
      <iframe
        name="manabie"
        style={{ height: "100%", width: "100%" }}
        src={"https://learner.manabie.net/"}
        title="manabie"
      ></iframe>
    </Modal>
  );
};

BrowserModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func
};
