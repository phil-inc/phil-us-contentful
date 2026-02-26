export interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CONSENT_STORAGE_KEY = "phil_consent_preferences";
const CONSENT_VERSION = "1.0";

/**
 * Get stored consent preferences from localStorage
 * Returns null if no preferences are stored
 */
export function getConsentPreferences(): ConsentPreferences | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) {
      return null;
    }

    const parsed = JSON.parse(stored);
    
    // Validate the stored data
    if (
      typeof parsed.necessary === "boolean" &&
      typeof parsed.analytics === "boolean" &&
      typeof parsed.marketing === "boolean"
    ) {
      return parsed;
    }

    return null;
  } catch (error) {
    console.error("Error reading consent preferences:", error);
    return null;
  }
}

/**
 * Save consent preferences to localStorage
 */
export function saveConsentPreferences(preferences: ConsentPreferences): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const data = {
      ...preferences,
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving consent preferences:", error);
  }
}

/**
 * Check if user has given consent for analytics
 */
export function hasAnalyticsConsent(): boolean {
  const preferences = getConsentPreferences();
  return preferences?.analytics ?? false;
}

/**
 * Check if user has given consent for marketing
 */
export function hasMarketingConsent(): boolean {
  const preferences = getConsentPreferences();
  return preferences?.marketing ?? false;
}

/**
 * Clear all consent preferences
 */
export function clearConsentPreferences(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing consent preferences:", error);
  }
}
