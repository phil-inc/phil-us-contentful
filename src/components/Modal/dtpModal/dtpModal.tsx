import React, { useContext, useEffect, useState } from "react";
import { Modal } from "@mantine/core";
import { SHOW_DTP_MODAL } from "constants/global.constant";

import * as classes from "./dtpModal.module.css";

import { ContentfulModal } from "types/modal";
import { useIsLaptop } from "hooks/useIsLaptop";

import LaunchDtp from "components/LaunchDtp/LaunchDtp";

import PageContext from "contexts/PageContext";

type DTPModalProps = {
  contentfulModalNodes: ContentfulModal[];
};

const DTPModal: React.FC<DTPModalProps> = ({ contentfulModalNodes }) => {
  const context = useContext(PageContext);
  const isHomePage = context.title === "Home";
  const isLaptopScreen = useIsLaptop();
  const [opened, setOpened] = useState(false);

  const modalData = contentfulModalNodes[0];

  useEffect(() => {
    // Check if modal has already been shown in this session
    const modalShown = sessionStorage.getItem(SHOW_DTP_MODAL);
    if (!modalShown) {
      setOpened(true);
    }
  }, []);

  const handleClose = () => {
    setOpened(false);
    sessionStorage.setItem(SHOW_DTP_MODAL, "true"); // set flag so it won't reopen
  };

  if (contentfulModalNodes.length === 0 || !isHomePage) {
    return null;
  }

  return (
    <>
      <Modal
        className={classes.modal}
        opened={opened}
        onClose={handleClose}
        withCloseButton={false} // hides close button
        centered
        size={isLaptopScreen ? "80%" : "auto"}
        padding={0}
        radius={"md"}
        overlayProps={{
          backgroundOpacity: 0.5,
          blur: 2,
        }}
      >
        <LaunchDtp modalData={modalData} closeModal={handleClose} />
      </Modal>
    </>
  );
};

export default DTPModal;
