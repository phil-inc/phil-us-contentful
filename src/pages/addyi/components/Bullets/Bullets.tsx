import React from "react";
import { Box, Text } from "@mantine/core";

import checkmarkIcon from "@addyi/assets/icons/checkmark-bullet.svg";

import * as classes from "./Bullets.module.css";

// Source: Bullets component
export const Bullets: React.FC = () => {
  return (
    <Box className={classes.bulletsSection}>
      <Box className={classes.bulletsContainer}>
        <Box className={classes.bulletItem}>
          <Box className={classes.bulletIcon}>
            <img src={checkmarkIcon} alt="Checkmark" width="18" height="14" />
          </Box>
          <Box className={classes.bulletContent}>
            <Text className={classes.bulletTitle}>Free home delivery</Text>
            <Text className={classes.bulletDescription}>
              (Most convenient way to get Addyi®)
            </Text>
          </Box>
        </Box>

        <Box className={classes.bulletItem}>
          <Box className={classes.bulletIcon}>
            <img src={checkmarkIcon} alt="Checkmark" width="18" height="14" />
          </Box>
          <Box className={classes.bulletContent}>
            <Text className={classes.bulletTitle}>Refills made simple</Text>
            <Text className={classes.bulletDescription}>
              (For the best pharmacy experience)
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
