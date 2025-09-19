import React, { useContext, useEffect, useMemo, useState } from "react";
import { Modal } from "@mantine/core";
import { SCREEN_SIZES, SHOW_DTP_MODAL } from "constants/global.constant";
import { useViewportSize } from "@mantine/hooks";

import LaunchDtp from "components/LaunchDtp/LaunchDtp";

import PageContext from "contexts/PageContext";

import { ContentfulModal } from "types/modal";
import { HOME } from "constants/page";

type DTPModalProps = {
  contentfulModalNodes: ContentfulModal[];
};

const DTPModal: React.FC<DTPModalProps> = ({ contentfulModalNodes }) => {
  const context = useContext(PageContext);
  const isHomePage = context.title === HOME;
  const [opened, setOpened] = useState(false);

  const { width } = useViewportSize();
  const modalSize = useMemo(() => {
    if (width <= SCREEN_SIZES.MOBILE) {
      return "auto";
    } else if (width <= SCREEN_SIZES.DESKTOP) {
      return "80%";
    } else if (width <= SCREEN_SIZES.LARGE_DESKTOP) {
      return "70%";
    } else {
      return "auto";
    }
  }, [width]);

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
        opened={opened}
        onClose={handleClose}
        withCloseButton={false} // hides close button
        centered
        size={modalSize}
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
