import React, { useRef } from "react";
import { Modal } from "../modal/Modal";
import styles from "./BrowserModal.scss";
import PropTypes from "prop-types";
import classNames from "classnames";
import { CloseButton } from "../input/CloseButton";
import { TextInput } from "../input/TextInput";
import { useId } from "../input/useId";
import { Button } from "../input/Button";

const AddressBar = () => {
  const id = useId();
  const ref = useRef();

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        console.log("BrowserModalButton ~ ref", ref.current.value);
        const url = ref.current.value;
        const res = window.open(url, "browserFrame");
        console.log("AddressBar ~ res:", res);
      }}
    >
      <TextInput id={id} ref={ref} placeholder="123" />
    </form>
  );
};

export const BrowserModal = ({ visible, onClose }) => {
  return (
    <Modal
      titleNode={<AddressBar />}
      beforeTitle={<CloseButton onClick={onClose} />}
      afterTitle={
        <Button
          onClick={() => {
            window.open("https://learner.manabie.net/", "browserFrame");
          }}
        >
          1Go to Manabie
        </Button>
      }
      className={classNames(styles.browserModal, visible || styles.hide)}
    >
      <iframe
        name="browserFrame"
        style={{ height: "800px", width: "100%" }}
        src="https://learner.manabie.net/"
        title="Browser"
      ></iframe>
    </Modal>
  );
};

BrowserModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func
};
