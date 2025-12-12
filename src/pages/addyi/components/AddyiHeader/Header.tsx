import React, { useEffect, useState } from "react";
import { Box } from "@mantine/core";
import addyiLogoWhite from "@addyi/assets/logos/addyi-logo-white.svg";
import addyiLogoPink from "@addyi/assets/logos/addyi-logo-pink.svg";

import * as classes from "./Header.module.css";
import { PrescriptionModal } from "../PrescriptionModal";
import { ADDYI_URLS } from "../../constants/urls";

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

  const handleNeedPrescriptionClick = () => {
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
              alt="Addyi Logo"
              className={classes.logo}
            />
              </Box>
            <Box className={classes.poweredByContainer}>
          <span className={classes.poweredByText}>Powered by PHIL, Inc.</span>
        </Box>
          </Box>

          <Box className={classes.buttonsContainer}>
            <button 
              className={classes.button}
              onClick={() => setIsModalOpen(true)}
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

