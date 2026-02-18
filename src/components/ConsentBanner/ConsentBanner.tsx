import React, { useState, useEffect } from "react";
import * as classes from "./ConsentBanner.module.css";
import { getConsentPreferences, saveConsentPreferences } from "utils/consent";

interface ConsentBannerProps {
  onConsentChange?: (preferences: ConsentPreferences) => void;
}

export interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const ConsentBanner: React.FC<ConsentBannerProps> = ({ onConsentChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const preferences = getConsentPreferences();
    if (preferences === null) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const preferences: ConsentPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    saveConsentPreferences(preferences);
    setIsVisible(false);
    onConsentChange?.(preferences);
  };

  const handleRejectAll = () => {
    const preferences: ConsentPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    saveConsentPreferences(preferences);
    setIsVisible(false);
    onConsentChange?.(preferences);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={classes.banner} role="dialog" aria-label="Cookie consent banner">
      <div className={classes.content}>
        <div className={classes.text}>
          <h2 className={classes.title}>We value your privacy</h2>
          <p className={classes.description}>
            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
            By clicking "Accept All", you consent to our use of cookies.{" "}
            {/* Update this link to your actual privacy policy page */}
            <a href="/privacy-policy/" target="_blank" rel="noopener noreferrer">
              Learn more
            </a>
          </p>
        </div>
        <div className={classes.actions}>
          <button
            className={`${classes.button} ${classes.rejectButton}`}
            onClick={handleRejectAll}
            aria-label="Reject all cookies"
          >
            Reject All
          </button>
          <button
            className={`${classes.button} ${classes.acceptButton}`}
            onClick={handleAcceptAll}
            aria-label="Accept all cookies"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
