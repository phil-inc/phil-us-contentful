import React from "react";
import { Box } from "@mantine/core";
import { Link } from "gatsby";

import * as classes from "@addyi/components/Footer/Footer.module.css";

// Source: Footer component - Links
function FooterLinks() {
  return (
    <Box className={classes.footerLinks}>
      <p className={classes.footerCopyright}>© PHIL, Inc.</p>
      <Link to="/terms" className={classes.footerLink}>Terms of Use</Link>
      <Link to="/privacy" className={classes.footerLink}>Privacy Policy</Link>
      <Link to="/hipaa" className={classes.footerLink}>HIPAA Notice</Link>
    </Box>
  );
}

// Source: Footer1 component - Main footer wrapper
export const Footer: React.FC = () => {
  return (
    // data-llms-skip: site chrome, left out of the generated llms-full.txt
    <Box className={classes.footer} data-llms-skip="true">
      <Box className={classes.footerContainer}>
        <FooterLinks />
      </Box>
    </Box>
  );
};
