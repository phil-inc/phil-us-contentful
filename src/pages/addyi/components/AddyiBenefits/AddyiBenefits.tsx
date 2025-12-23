import React from "react";
import { Box } from "@mantine/core";

import checkmarkIcon from "@addyi/assets/icons/checkmark-bullet.svg";

import * as classes from "@addyi/components/AddyiBenefits/AddyiBenefits.module.css";

export const AddyiBenefitsSection: React.FC = () => {
  return (
    <Box className={classes.bulletsSection}>
      <Box className={classes.bulletsContainer}>
        <Box className={classes.bulletItem}>
          <Box className={classes.bulletIcon}>
            <img src={checkmarkIcon} alt="Checkmark" width="18" height="14" />
          </Box>
          <Box className={classes.bulletContent}>
            <p className={classes.bulletTitle}>Free home delivery</p>
            <p className={classes.bulletDescription}>
              (Most convenient way to get Addyi®)
            </p>
          </Box>
        </Box>

        <Box className={classes.bulletItem}>
          <Box className={classes.bulletIcon}>
            <img src={checkmarkIcon} alt="Checkmark" width="18" height="14" />
          </Box>
          <Box className={classes.bulletContent}>
            <p className={classes.bulletTitle}>Refills made simple</p>
            <p className={classes.bulletDescription}>
              (For the best pharmacy experience)
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
