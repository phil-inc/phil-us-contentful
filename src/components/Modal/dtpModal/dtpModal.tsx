import React, { useContext, useEffect, useMemo, useState } from "react";
import { Modal } from "@mantine/core";
import {
  DTP_RESOURCES_EMAIL_SUBMITTED,
  ROI_EMAIL_SUBMITTED,
  SHOW_DTP_MODAL,
} from "constants/global.constant";

import LaunchDtp from "components/LaunchDtp/LaunchDtp";
import SessionModal, {
  SessionModalRef,
} from "components/SessionModal/SessionModal";
import AccessDtpResource from "components/Modal/AccessDtpResource/AccessDtpResource";

import PageContext from "contexts/PageContext";

import { ContentfulModal } from "types/modal";
import { HOME, PAGES_TITLE } from "constants/page";
import { useModalSize } from "hooks/useModalSize";

type DTPModalProps = {
  contentfulModalNodes: ContentfulModal[];
};

const DTPModal: React.FC<DTPModalProps> = ({ contentfulModalNodes }) => {
  const context = useContext(PageContext);
  const isHomePage = context.title === HOME;
  const [opened, setOpened] = useState(false);
  const { wideModalSize, normalModalSize } = useModalSize();

  const homeData = contentfulModalNodes.find(
    (node) =>
      node.canDisplayModal === true && node?.pageToDisplay?.title === HOME,
  );
  const dtpResourceData = contentfulModalNodes.find(
    (node) =>
      node.canDisplayModal === true &&
      node?.pageToDisplay?.title === PAGES_TITLE.DTP_RESOURCES,
  );
  const roiData = contentfulModalNodes.find(
    (node) =>
      node.canDisplayModal === true &&
      node?.pageToDisplay?.title === PAGES_TITLE.ROI,
  );

  const isHomePageModal = isHomePage && homeData?.canDisplayModal;
  const isDtpResourcePageModal =
    context.title === PAGES_TITLE.DTP_RESOURCES &&
    dtpResourceData?.canDisplayModal;
  const isRoiPageModal = context.title === PAGES_TITLE.ROI && roiData;

  const modelRef = {
    dtpResource: React.useRef<SessionModalRef>(null),
    roi: React.useRef<SessionModalRef>(null),
  };

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

  if (contentfulModalNodes.length === 0) {
    return null;
  }

  return (
    <>
      {homeData && isHomePageModal && (
        <Modal
          opened={opened}
          onClose={handleClose}
          withCloseButton={false} // hides close button
          centered
          size={wideModalSize}
          padding={0}
          radius={"md"}
          overlayProps={{
            backgroundOpacity: 0.5,
            blur: 2,
          }}
        >
          <LaunchDtp modalData={homeData} closeModal={handleClose} />
        </Modal>
      )}

      {dtpResourceData && isDtpResourcePageModal && (
        <SessionModal
          ref={modelRef.dtpResource}
          sessionKey={DTP_RESOURCES_EMAIL_SUBMITTED}
          autoOpen
          closeOnClickOutside={false}
          modalSize={normalModalSize}
        >
          <div>
            <AccessDtpResource
              modalRef={modelRef.dtpResource}
              modalData={dtpResourceData}
            />
          </div>
        </SessionModal>
      )}
      {roiData && isRoiPageModal && (
        <SessionModal
          ref={modelRef.roi}
          sessionKey={ROI_EMAIL_SUBMITTED}
          autoOpen
          closeOnClickOutside={false}
          modalSize={normalModalSize}
        >
          <div>
            <AccessDtpResource modalRef={modelRef.roi} modalData={roiData} />
          </div>
        </SessionModal>
      )}
    </>
  );
};

export default DTPModal;
