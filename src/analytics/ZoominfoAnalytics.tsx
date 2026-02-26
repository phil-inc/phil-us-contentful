import React from "react";
import { Script } from "gatsby";
import { hasMarketingConsent } from "utils/consent";

const ZoominfoAnalytics: React.FC = () => {
  const [shouldExecute, setShouldExecute] = React.useState(false);

  React.useEffect(() => {
    const hasConsent = hasMarketingConsent();
    if (hasConsent && !window?.zi) {
      setShouldExecute(true);
    }
  }, []);

  return (
    <Script>
      {shouldExecute
        ? `
    window.ZIProjectKey = "${process.env.GATSBY_ZI_PROJECT_KEY ?? ""}"; 
    var zi = document.createElement('script');
    (zi.type = 'text/javascript'),
    (zi.async = true),
    (zi.src = 'https://js.zi-scripts.com/zi-tag.js'),
    document.readyState === 'complete'?
    document.body.appendChild(zi):
    window.addEventListener('load', function(){
    document.body.appendChild(zi)
    });
`
        : undefined}
    </Script>
  );
};

export default ZoominfoAnalytics;
