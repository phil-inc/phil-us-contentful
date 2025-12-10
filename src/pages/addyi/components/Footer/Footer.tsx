import React from "react";
import { Box, Text } from "@mantine/core";

import * as classes from "./Footer.module.css";

// Source: Footer component - Links
function FooterLinks() {
  return (
    <Box className={classes.footerLinks}>
      <Text className={classes.footerCopyright}>© Phil, Inc.</Text>
      <Text component="a" href="/terms" className={classes.footerLink}>
        Terms of Use
      </Text>
      <Text component="a" href="/privacy" className={classes.footerLink}>
        Privacy Policy
      </Text>
      <Text component="a" href="/hipaa" className={classes.footerLink}>
        HIPAA Policy
      </Text>
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
