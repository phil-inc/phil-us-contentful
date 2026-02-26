import React from "react";
import { Script } from "gatsby";

/**
 * Sets Google Consent Mode v2 defaults before any tracking scripts load
 * This must be loaded in the <head> before Google Analytics
 */
const ConsentMode: React.FC = () => (
  <Script strategy="off-main-thread">
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      
      // Set default consent to denied for all regions
      gtag('consent', 'default', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied',
        'functionality_storage': 'granted',
        'personalization_storage': 'denied',
        'security_storage': 'granted',
        'wait_for_update': 500
      });
    `}
  </Script>
);

export default ConsentMode;
