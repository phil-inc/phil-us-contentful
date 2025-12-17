import React, { useEffect, useState } from "react";
import { Box } from "@mantine/core";

import addyiLogoWhite from "@addyi/assets/logos/addyi-logo-white.svg";
import addyiLogoPink from "@addyi/assets/logos/addyi-logo-pink.svg";
import poweredByIconWhite from "@addyi/assets/logos/powered-by-icon-white.svg";
import poweredByIconPink from "@addyi/assets/logos/powered-by-icon-pink.svg";

import { PrescriptionModal } from "@addyi/components/PrescriptionModal";
import { ADDYI_URLS } from "@addyi/constants/urls";

import { trackGaEvent } from "utils/analytics";
import {
  GA_EVENT_ACTION,
  GA_EVENT_CATEGORY,
} from "constants/analytics";

import * as classes from "@addyi/components/AddyiHeader/Header.module.css";

export const AddyiHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHavePrescriptionClick = () => {
    trackGaEvent(
      GA_EVENT_ACTION.CLICK_HAVE_PRESCRIPTION,
      GA_EVENT_CATEGORY.ADDYI_CTA,
    );
    setIsModalOpen(true);
  };

  const handleNeedPrescriptionClick = () => {
    trackGaEvent(
      GA_EVENT_ACTION.CLICK_NEED_PRESCRIPTION,
      GA_EVENT_CATEGORY.ADDYI_CTA,
    );
    window.open(ADDYI_URLS.NEED_PRESCRIPTION, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Box className={`${classes.header} ${isScrolled ? classes.scrolled : ""}`}>
        <Box className={classes.headerContent}>
          <Box className={classes.logoContainer}>
              <Box className={classes.logoImageContainer}>    
            <img
              src={isScrolled ? addyiLogoPink : addyiLogoWhite}
              alt="addyi"
              className={classes.logo}
            />
              </Box>
            <Box className={classes.poweredByContainer}>
          <span className={classes.poweredByText}>Powered by PHIL, Inc.</span>
          <img
            src={isScrolled ? poweredByIconPink : poweredByIconWhite}
            alt="Powered by PHIL, Inc."
            className={classes.poweredByIcon}
          />
        </Box>
          </Box>

          <Box className={classes.buttonsContainer}>
            <button 
              className={classes.button}
              onClick={handleHavePrescriptionClick}
            >
              HAVE AN ADDYI® PRESCRIPTION
            </button>
            <button 
              className={classes.button}
              onClick={handleNeedPrescriptionClick}
            >
              NEED AN ADDYI® PRESCRIPTION
            </button>
          </Box>
        </Box>
      </Box>
      <PrescriptionModal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

