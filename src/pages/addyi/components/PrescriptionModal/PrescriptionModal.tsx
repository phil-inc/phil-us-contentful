import React, { useEffect } from "react";
import { Box } from "@mantine/core";
import addyiLogoWhite from "@addyi/assets/logos/addyi-logo-white.svg";
import poweredByIcon from "@addyi/assets/logos/powered-by-icon.svg";
import closeIcon from "@addyi/assets/icons/close-icon.svg";

import * as classes from "./PrescriptionModal.module.css";

interface PrescriptionModalProps {
  opened: boolean;
  onClose: () => void;
}

export const PrescriptionModal: React.FC<PrescriptionModalProps> = ({
  opened,
  onClose,
}) => {
  useEffect(() => {
    if (opened) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
      
      // Handle ESC key press
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      
      document.addEventListener("keydown", handleEscape);
      
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [opened, onClose]);

  if (!opened) return null;

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Overlay */}
      <Box className={classes.overlay} onClick={onClose} />
      
      {/* Modal */}
      <Box className={classes.modal} onClick={handleModalClick}>
        {/* Header */}
        <Box className={classes.header}>
          <Box className={classes.headerLeft}>
            <img
              src={addyiLogoWhite}
              alt="Addyi Logo"
              className={classes.logo}
            />
            <img
              src={poweredByIcon}
              alt="Powered by PHIL, Inc."
              className={classes.poweredByIcon}
            />
          </Box>
          <Box className={classes.headerRight}>
            <Box className={classes.headerContent}>
              <h2 className={classes.headerTitle}>
                HAVE AN ADDYI® PRESCRIPTION?
              </h2>
              <p className={classes.headerDescription}>
                Skip the extra steps. PhilRx delivers your Addyi® prescription straight to your door.
              </p>
            </Box>
          <button className={classes.closeButton} onClick={onClose} aria-label="Close modal">
            <img src={closeIcon} alt="Close" className={classes.closeIcon} />
          </button>
            </Box>
        </Box>

        {/* Body */}
        <Box className={classes.body}>
          <h3 className={classes.bodyTitle}>
            ARE YOU A PATIENT WITH AN ADDYI® PRESCRIPTION? TRANSFER IT TO PHILRX PHARMACY TODAY
          </h3>
          <p className={classes.bodyText}>
            To receive the lowest price for your Addyi® prescription, call{" "}
            <a href="tel:855-522-3244" className={classes.phoneLink}>
              855-522-3244
            </a>
            , and a Customer Support Rep will connect you with PhilRx Pharmacy to complete your request.
          </p>
        </Box>

        {/* Footer */}
        <Box className={classes.footer}>
          <button className={classes.closeFooterButton} onClick={onClose}>
            Close
          </button>
        </Box>
      </Box>
    </>
  );
};
