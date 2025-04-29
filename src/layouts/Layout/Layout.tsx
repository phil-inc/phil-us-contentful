import React from "react";
import { AppShell, Box } from "@mantine/core";
import CHeader, { HEADER_HEIGHT } from "./CHeader/CHeader";
import { HubspotProvider } from "@aaronhayes/react-use-hubspot-form";
import CFooter from "./CFooter/CFooter";
import LinkedinInsights from "analytics/LinkedinInsights";

// Import css overrides here
import "assets/css/index.css";

import ZoominfoAnalytics from "analytics/ZoominfoAnalytics";

const isProduction = process.env.NODE_ENV === "production";

export const Head: React.FC = () => <>{isProduction && <LinkedinInsights />}</>;

type LayoutProps = {
  children: React.ReactNode;
  minimal?: boolean;
  headerTargetBlank?: boolean;
  canHideHeaderFooter?: boolean;
};

export function Layout({
  children,
  minimal = false,
  headerTargetBlank = false,
  canHideHeaderFooter = false,
}: LayoutProps) {
  return (
    <>
      <HubspotProvider>
        <AppShell
          header={{
            height: HEADER_HEIGHT,
          }}
        >
          {isProduction && <ZoominfoAnalytics />}
          {!canHideHeaderFooter && <CHeader minimal={minimal} headerTargetBlank={headerTargetBlank} />}
          <Box>{children}</Box>
          {!canHideHeaderFooter && <CFooter minimal={minimal} />}
        </AppShell>
      </HubspotProvider>
    </>
  );
}
