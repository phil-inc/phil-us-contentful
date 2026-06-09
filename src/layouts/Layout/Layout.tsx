import React from "react";
import { AppShell } from "@mantine/core";
import { HubspotProvider } from "@aaronhayes/react-use-hubspot-form";
import { useLocation } from "@reach/router";
import StaticFooter from "./MegaFooter/megaFooter";
import CInfoBar from "layouts/Layout/CInfoBar/CInfoBar";
// Import css overrides here
import "assets/css/index.css";

import MegaNav from "layouts/Layout/MegaNav/MegaNav";

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
  const location = useLocation();
  const currentLocationSlug = location.pathname.replace(/^\/|\/$/g, "");

  return (
    <>
      <HubspotProvider>
        <AppShell>
          {!canHideHeader && <MegaNav minimal={minimal} headerTargetBlank={headerTargetBlank} />}
          <CInfoBar currentLocationSlug={currentLocationSlug}/>
          <>{children}</>
          <StaticFooter minimal={minimal} />
        </AppShell>
      </HubspotProvider>
    </>
  );
}
