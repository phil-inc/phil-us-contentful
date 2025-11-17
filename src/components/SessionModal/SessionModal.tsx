import React, { forwardRef, useImperativeHandle } from "react";
import { Modal } from "@mantine/core";

import { useSessionModal } from "hooks/useSessionModal";

type SessionModalProps = {
  sessionKey: string;
  children: React.ReactElement<{ closeModal?: () => void }>;
  withCloseButton?: boolean;
  autoOpen?: boolean;
  closeOnClickOutside?: boolean;
  modalSize: string;
};

export type SessionModalRef = {
  openModal: () => void;
  closeModal: () => void;
};

const SessionModal = forwardRef<SessionModalRef, SessionModalProps>(
  (
    {
      sessionKey,
      children,
      withCloseButton = false,
      autoOpen = false,
      closeOnClickOutside = true,
      modalSize,
    },
    ref,
  ) => {
    const { opened, handleClose, openModal } = useSessionModal(
      sessionKey,
      {
        autoOpen,
      },
    );

    // Expose open/close controls to parent
    useImperativeHandle(ref, () => ({
      openModal,
      closeModal: handleClose,
    }));

    return (
      <Modal
        opened={opened}
        onClose={handleClose}
        withCloseButton={withCloseButton}
        centered
        size={modalSize}
        padding={0}
        radius="md"
        overlayProps={{
          backgroundOpacity: 0.5,
          blur: 2,
        }}
        closeOnClickOutside={closeOnClickOutside}
      >
        {React.cloneElement(children, { closeModal: handleClose })}
      </Modal>
    );
  },
);

export default SessionModal;
