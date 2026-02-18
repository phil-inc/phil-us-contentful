import {
  getConsentPreferences,
  saveConsentPreferences,
  hasAnalyticsConsent,
  hasMarketingConsent,
  clearConsentPreferences,
  ConsentPreferences,
} from "utils/consent";

describe("Consent Management", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("getConsentPreferences", () => {
    it("should return null when no preferences are stored", () => {
      expect(getConsentPreferences()).toBeNull();
    });

    it("should return stored preferences", () => {
      const preferences: ConsentPreferences = {
        necessary: true,
        analytics: true,
        marketing: false,
      };
      saveConsentPreferences(preferences);
      
      const stored = getConsentPreferences();
      expect(stored).toEqual(preferences);
    });

    it("should return null for invalid stored data", () => {
      localStorage.setItem("phil_consent_preferences", "invalid json");
      expect(getConsentPreferences()).toBeNull();
    });
  });

  describe("saveConsentPreferences", () => {
    it("should save preferences to localStorage", () => {
      const preferences: ConsentPreferences = {
        necessary: true,
        analytics: false,
        marketing: true,
      };
      saveConsentPreferences(preferences);
      
      const stored = localStorage.getItem("phil_consent_preferences");
      expect(stored).toBeTruthy();
      
      const parsed = JSON.parse(stored!);
      expect(parsed.necessary).toBe(true);
      expect(parsed.analytics).toBe(false);
      expect(parsed.marketing).toBe(true);
      expect(parsed.version).toBe("1.0");
      expect(parsed.timestamp).toBeTruthy();
    });
  });

  describe("hasAnalyticsConsent", () => {
    it("should return false when no preferences are stored", () => {
      expect(hasAnalyticsConsent()).toBe(false);
    });

    it("should return true when analytics consent is granted", () => {
      saveConsentPreferences({
        necessary: true,
        analytics: true,
        marketing: false,
      });
      expect(hasAnalyticsConsent()).toBe(true);
    });

    it("should return false when analytics consent is denied", () => {
      saveConsentPreferences({
        necessary: true,
        analytics: false,
        marketing: true,
      });
      expect(hasAnalyticsConsent()).toBe(false);
    });
  });

  describe("hasMarketingConsent", () => {
    it("should return false when no preferences are stored", () => {
      expect(hasMarketingConsent()).toBe(false);
    });

    it("should return true when marketing consent is granted", () => {
      saveConsentPreferences({
        necessary: true,
        analytics: false,
        marketing: true,
      });
      expect(hasMarketingConsent()).toBe(true);
    });

    it("should return false when marketing consent is denied", () => {
      saveConsentPreferences({
        necessary: true,
        analytics: true,
        marketing: false,
      });
      expect(hasMarketingConsent()).toBe(false);
    });
  });

  describe("clearConsentPreferences", () => {
    it("should remove stored preferences", () => {
      saveConsentPreferences({
        necessary: true,
        analytics: true,
        marketing: true,
      });
      
      expect(getConsentPreferences()).toBeTruthy();
      
      clearConsentPreferences();
      
      expect(getConsentPreferences()).toBeNull();
    });
  });
});
