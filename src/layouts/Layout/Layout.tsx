import React from "react";
import { AppShell, Box } from "@mantine/core";
import CHeader, { HEADER_HEIGHT } from "./CHeader/CHeader";
import { HubspotProvider } from "@aaronhayes/react-use-hubspot-form";
import CFooter from "./CFooter/CFooter";
import LinkedinInsights from "analytics/LinkedinInsights";

// Import css overrides here
import "assets/css/index.css";

import ZoominfoAnalytics from "analytics/ZoominfoAnalytics";

import AnnoucementBar from "layouts/Layout/AnnoumentBar/AnnoucementBar";

const isProduction = process.env.NODE_ENV === "production";

export const Head: React.FC = () => <>{isProduction && <LinkedinInsights />}</>;

type LayoutProps = {
  children: React.ReactNode;
  minimal?: boolean;
  headerTargetBlank?: boolean;
  canHideHeader?: boolean;
};

export function Layout({
  children,
  minimal = false,
  headerTargetBlank = false,
  canHideHeader = false,
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
          <div className="sticky-wrapper">
            <AnnoucementBar/>
            {!canHideHeader && <CHeader minimal={minimal} headerTargetBlank={headerTargetBlank} />}
          </div>
          <Box>{children}</Box>
          <CFooter minimal={minimal} />
        </AppShell>
      </HubspotProvider>
    </>
  );
}
