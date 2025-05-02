import React, { useEffect } from "react";

const TrustpilotWidget: React.FC = () => {
  const trustPilotWidgetLink =
    "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initializeWidgets = () => {
      const widgets =
        document.querySelectorAll<HTMLElement>(".trustpilot-widget");
      widgets.forEach((widget) => {
        if (!widget.dataset.initialized && window.Trustpilot) {
          window.Trustpilot.loadFromElement(widget);
          widget.dataset.initialized = "true";
        }
      });
    };

    if (window.Trustpilot) {
      initializeWidgets();
    } else {
      const script = document.createElement("script");
      script.src = trustPilotWidgetLink;
      script.async = true;
      script.onload = initializeWidgets;
      document.body.appendChild(script);
    }

    // Set up mutation observer to handle dynamically added widgets
    const observer = new MutationObserver(initializeWidgets);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
};

export default TrustpilotWidget;
