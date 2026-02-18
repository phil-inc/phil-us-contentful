import React, { useContext, useState } from "react";
import { AppShell, Box } from "@mantine/core";
import CHeader, { HEADER_HEIGHT } from "./CHeader/CHeader";
import { HubspotProvider } from "@aaronhayes/react-use-hubspot-form";
import CFooter from "./CFooter/CFooter";
import LinkedinInsights from "analytics/LinkedinInsights";
import { useLocation } from "@reach/router";

// Import css overrides here
import "assets/css/index.css";

import ZoominfoAnalytics from "analytics/ZoominfoAnalytics";
import ConsentBanner from "components/ConsentBanner/ConsentBanner";
import ConditionalAnalytics from "components/ConditionalAnalytics/ConditionalAnalytics";
import ConsentMode from "components/ConsentMode/ConsentMode";

import AnnoucementBar from "layouts/Layout/AnnoumentBar/AnnoucementBar";
import CInfoBar from "layouts/Layout/CInfoBar/CInfoBar";
import { DOM_IDS } from "constants/global.constant";

import PageContext from "contexts/PageContext";

import { HCP_PAGE, PAGES_TITLE, PATIENTS_PAGE } from "constants/page";

const isProduction = process.env.NODE_ENV === "production";

export const Head: React.FC = () => (
  <>
    {isProduction && (
      <>
        <ConsentMode />
        <LinkedinInsights />
      </>
    )}
  </>
);

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

    const location = useLocation();
    const currentLocationSlug = location.pathname.replace(/^\/|\/$/g, "");

    const [consentKey, setConsentKey] = useState(0);

    const handleConsentChange = () => {
      // Force re-render of analytics components when consent changes
      setConsentKey(prev => prev + 1);
    };

  return (
    <>
      <HubspotProvider>
        <AppShell
          header={{
            height: HEADER_HEIGHT,
          }}
          >
          {isProduction && (
            <>
              <ConditionalAnalytics key={`analytics-${consentKey}`} />
              <ZoominfoAnalytics key={`zoominfo-${consentKey}`} />
            </>
          )}
          <div className="sticky-wrapper" id={DOM_IDS.TOP_BAR}>
            {canShowAnnoucementBar && <AnnoucementBar currentLocationSlug={currentLocationSlug}/>}
            {!canHideHeader && <CHeader minimal={minimal} headerTargetBlank={headerTargetBlank} />}
            <CInfoBar currentLocationSlug={currentLocationSlug}/>
          </div>
          <>{children}</>
          <CFooter minimal={minimal} />
          <ConsentBanner onConsentChange={handleConsentChange} />
        </AppShell>
      </HubspotProvider>
    </>
  );
}
