import React from "react";
import { Box, Text } from "@mantine/core";

import * as classes from "./Footer.module.css";

// Source: Footer component - Links
function FooterLinks() {
  return (
    <Box className={classes.footerLinks}>
      <p className={classes.footerCopyright}>© Phil, Inc.</p>
      <p className={classes.footerLink}>Terms of Use</p>
      <p className={classes.footerLink}>Privacy Policy</p>
      <p className={classes.footerLink}>HIPAA Policy</p>
    </Box>
  );
}

// Source: Footer1 component - Main footer wrapper
export const Footer: React.FC = () => {
  return (
    <Box className={classes.footer}>
      <Box className={classes.footerContainer}>
        <FooterLinks />
      </Box>
    </Box>
  );
};
