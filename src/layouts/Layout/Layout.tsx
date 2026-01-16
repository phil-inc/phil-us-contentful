import React, { useContext } from "react";
import { AppShell, Box } from "@mantine/core";
import CHeader, { HEADER_HEIGHT } from "./CHeader/CHeader";
import { HubspotProvider } from "@aaronhayes/react-use-hubspot-form";
import CFooter from "./CFooter/CFooter";
import LinkedinInsights from "analytics/LinkedinInsights";

// Import css overrides here
import "assets/css/index.css";

import ZoominfoAnalytics from "analytics/ZoominfoAnalytics";

import AnnoucementBar from "layouts/Layout/AnnoumentBar/AnnoucementBar";

import PageContext from "contexts/PageContext";

import { HCP_PAGE, PAGES_TITLE, PATIENTS_PAGE } from "constants/page";

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
    const context = useContext(PageContext);
    const skipAnnoucementPageTitle = [PAGES_TITLE.DEMO, HCP_PAGE, PATIENTS_PAGE];
    const canShowAnnoucementBar = !(skipAnnoucementPageTitle.includes(context.title));

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
            {canShowAnnoucementBar && <AnnoucementBar/>}
            {!canHideHeader && <CHeader minimal={minimal} headerTargetBlank={headerTargetBlank} />}
          </div>
          <>{children}</>
          <CFooter minimal={minimal} />
        </AppShell>
      </HubspotProvider>
    </>
  );
}
