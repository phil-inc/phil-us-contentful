# Consent Management System

This directory contains the consent management implementation for GDPR, CCPA, and other privacy regulation compliance.

## Components

### ConsentBanner
The main UI component that displays the cookie consent banner to users on their first visit.

**Features:**
- Appears on first visit (checks localStorage)
- Accept All / Reject All options
- Accessible (ARIA labels, keyboard navigation)
- Responsive design
- Smooth slide-up animation

### ConsentMode
Sets Google Consent Mode v2 defaults before any tracking scripts load. This ensures compliance by defaulting to "denied" for all tracking until user consent is obtained.

### ConditionalAnalytics
Manages the state of analytics scripts based on user consent preferences. Updates Google Analytics and HubSpot tracking settings when consent changes.

## Utilities

### consent.ts
Core consent management utilities:

- `getConsentPreferences()` - Retrieves stored consent from localStorage
- `saveConsentPreferences(preferences)` - Saves consent choices
- `hasAnalyticsConsent()` - Check if analytics is allowed
- `hasMarketingConsent()` - Check if marketing is allowed
- `clearConsentPreferences()` - Remove stored consent

## How It Works

1. **Initial Load**: ConsentMode sets all tracking to "denied" by default
2. **Banner Display**: ConsentBanner shows if no preferences are stored
3. **User Choice**: User accepts or rejects cookies
4. **Preference Storage**: Choice is saved to localStorage
5. **Script Loading**: Analytics scripts check consent before loading
6. **Consent Update**: ConditionalAnalytics updates tracking permissions

## Consent Categories

- **Necessary**: Always enabled (required for site functionality)
- **Analytics**: Google Analytics, HubSpot tracking
- **Marketing**: LinkedIn Insights, ZoomInfo, Google Ads

## Integration

The consent system is integrated into:
- `src/layouts/Layout/Layout.tsx` - Main layout with banner
- `src/analytics/LinkedinInsights.tsx` - Respects marketing consent
- `src/analytics/ZoominfoAnalytics.tsx` - Respects marketing consent
- `gatsby-config.ts` - Google Analytics with consent mode

## Customization

To customize the banner:
1. Edit `ConsentBanner.tsx` for functionality
2. Edit `ConsentBanner.module.css` for styling
3. Update the privacy policy link in the banner text

## Testing

To test the consent flow:
1. Clear localStorage: `localStorage.removeItem('phil_consent_preferences')`
2. Reload the page
3. Banner should appear
4. Accept/Reject and verify analytics load accordingly

## Compliance Notes

- Uses Google Consent Mode v2 for Google services
- Respects Do Not Track (DNT) browser setting for HubSpot
- Stores minimal data (only consent preferences)
- No tracking before consent is given
- IP anonymization enabled for Google Analytics
