import React, { useEffect, useState } from "react";
import { hasAnalyticsConsent, hasMarketingConsent } from "utils/consent";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    _hsq?: any[];
  }
}

/**
 * Component to conditionally enable/disable analytics based on consent
 */
const ConditionalAnalytics: React.FC = () => {
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  useEffect(() => {
    setAnalyticsConsent(hasAnalyticsConsent());
    setMarketingConsent(hasMarketingConsent());
  }, []);

  useEffect(() => {
    // Update Google Analytics consent
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: analyticsConsent ? "granted" : "denied",
        ad_storage: marketingConsent ? "granted" : "denied",
      });
    }

    // Update HubSpot tracking
    if (typeof window !== "undefined" && window._hsq) {
      if (!analyticsConsent) {
        window._hsq.push(["doNotTrack"]);
      }
    }
  }, [analyticsConsent, marketingConsent]);

  return null;
};

export default ConditionalAnalytics;
