import React from "react";
import { Box } from "@mantine/core";
import { Link } from "gatsby";

import * as classes from "@addyi/components/Footer/Footer.module.css";

// Source: Footer component - Links
function FooterLinks() {
  return (
    <Box className={classes.footerLinks}>
      <p className={classes.footerCopyright}>© Phil, Inc.</p>
      <Link to="/terms" className={classes.footerLink}>Terms of Use</Link>
      <Link to="/privacy" className={classes.footerLink}>Privacy Policy</Link>
      <Link to="/hipaa" className={classes.footerLink}>HIPAA Notice</Link>
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
