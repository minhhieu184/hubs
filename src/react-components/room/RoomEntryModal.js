import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Modal } from "../modal/Modal";
import { Button } from "../input/Button";
import { ReactComponent as EnterIcon } from "../icons/Enter.svg";
import { ReactComponent as VRIcon } from "../icons/VR.svg";
import { ReactComponent as ShowIcon } from "../icons/Show.svg";
import { ReactComponent as SettingsIcon } from "../icons/Settings.svg";
import styles from "./RoomEntryModal.scss";
import styleUtils from "../styles/style-utils.scss";
import { useCssBreakpoints } from "react-use-css-breakpoints";
import { Column } from "../layout/Column";
import { AppLogo } from "../misc/AppLogo";
import { FormattedMessage } from "react-intl";
import { socket } from "../socket";

export function RoomEntryModal({
  className,
  roomName,
  showJoinRoom,
  onJoinRoom,
  showEnterOnDevice,
  onEnterOnDevice,
  showSpectate,
  onSpectate,
  showOptions,
  onOptions,
  ...rest
}) {
  const breakpoint = useCssBreakpoints();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents(previous => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);

  return (
    <Modal className={classNames(styles.roomEntryModal, className)} disableFullscreen {...rest}>
      <button
        onClick={() => {
          socket.emit("foo", "bar");
        }}
      >
        123123
      </button>
      <Column center className={styles.content}>
        {breakpoint !== "sm" && breakpoint !== "md" && (
          <div className={styles.logoContainer}>
            <AppLogo />
          </div>
        )}
        <div className={styles.roomName}>
          <h5>
            <FormattedMessage id="room-entry-modal.room-name-label" defaultMessage="Room Name" />
          </h5>
          <p>{roomName}</p>
        </div>
        <Column center className={styles.buttons}>
          {showJoinRoom && (
            <Button preset="accent4" onClick={onJoinRoom}>
              <EnterIcon />
              <span>
                <FormattedMessage id="room-entry-modal.join-room-button" defaultMessage="Join Room" />
              </span>
            </Button>
          )}
          {showEnterOnDevice && (
            <Button preset="accent5" onClick={onEnterOnDevice}>
              <VRIcon />
              <span>
                <FormattedMessage id="room-entry-modal.enter-on-device-button" defaultMessage="Enter On Device" />
              </span>
            </Button>
          )}
          {showSpectate && (
            <Button preset="accent2" onClick={onSpectate}>
              <ShowIcon />
              <span>
                <FormattedMessage id="room-entry-modal.spectate-button" defaultMessage="Spectate" />
              </span>
            </Button>
          )}
          {showOptions && breakpoint !== "sm" && (
            <>
              <hr className={styleUtils.showLg} />
              <Button preset="transparent" className={styleUtils.showLg} onClick={onOptions}>
                <SettingsIcon />
                <span>
                  <FormattedMessage id="room-entry-modal.options-button" defaultMessage="Options" />
                </span>
              </Button>
            </>
          )}
        </Column>
      </Column>
    </Modal>
  );
}

RoomEntryModal.propTypes = {
  className: PropTypes.string,
  roomName: PropTypes.string.isRequired,
  showJoinRoom: PropTypes.bool,
  onJoinRoom: PropTypes.func,
  showEnterOnDevice: PropTypes.bool,
  onEnterOnDevice: PropTypes.func,
  showSpectate: PropTypes.bool,
  onSpectate: PropTypes.func,
  showOptions: PropTypes.bool,
  onOptions: PropTypes.func
};

RoomEntryModal.defaultProps = {
  showJoinRoom: true,
  showEnterOnDevice: true,
  showSpectate: true,
  showOptions: true
};
