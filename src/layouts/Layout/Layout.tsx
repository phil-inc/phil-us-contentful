import React from "react";
import { AppShell } from "@mantine/core";
import { HubspotProvider } from "@aaronhayes/react-use-hubspot-form";
import CFooter from "./CFooter/CFooter";
import LinkedinInsights from "analytics/LinkedinInsights";

// Import css overrides here
import "assets/css/index.css";

import ZoominfoAnalytics from "analytics/ZoominfoAnalytics";

import MegaNav from "layouts/Layout/MegaNav/MegaNav";

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
        <AppShell>
          {isProduction && <ZoominfoAnalytics />}
          {!canHideHeader && <MegaNav minimal={minimal} headerTargetBlank={headerTargetBlank} />}
          <>{children}</>
          <CFooter minimal={minimal} />
        </AppShell>
      </HubspotProvider>
    </>
  );
}
