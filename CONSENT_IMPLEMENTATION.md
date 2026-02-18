# Consent Management Implementation

## Overview

A complete, privacy-compliant consent management system has been implemented for the Phil.us website. This system ensures compliance with GDPR, CCPA, and other privacy regulations.

## What Was Implemented

### 1. Core Consent Management (`src/utils/consent.ts`)
- Consent preference storage in localStorage
- Helper functions to check consent status
- Three consent categories: Necessary, Analytics, Marketing

### 2. Consent Banner (`src/components/ConsentBanner/`)
- User-facing cookie consent banner
- Accept All / Reject All options
- Appears on first visit only
- Fully accessible (ARIA labels, keyboard navigation)
- Responsive design with smooth animations

### 3. Google Consent Mode v2 (`src/components/ConsentMode/`)
- Sets default consent to "denied" before any tracking loads
- Complies with Google's latest consent requirements
- Integrated into page `<head>` for early execution

### 4. Conditional Analytics Loading
- **ConditionalAnalytics component**: Updates tracking permissions based on consent
- **Updated analytics components**:
  - `LinkedinInsights.tsx` - Only loads with marketing consent
  - `ZoominfoAnalytics.tsx` - Only loads with marketing consent
  - Google Analytics - Uses Consent Mode v2
  - HubSpot - Now respects DNT setting

### 5. Configuration Updates (`gatsby-config.ts`)
- HubSpot: Changed `respectDNT` from `false` to `true`
- Google Analytics: Added IP anonymization
- Both now respect user consent preferences

### 6. Testing (`src/__tests__/utils/consent.test.ts`)
- Comprehensive unit tests for consent utilities
- Tests all consent scenarios
- Updated Jest config to use jsdom for localStorage testing

## How It Works

```
1. Page Load
   ↓
2. ConsentMode sets all tracking to "denied" (default)
   ↓
3. Check localStorage for existing consent
   ↓
4. If no consent found → Show ConsentBanner
   ↓
5. User makes choice (Accept/Reject)
   ↓
6. Save preference to localStorage
   ↓
7. ConditionalAnalytics updates tracking permissions
   ↓
8. Analytics scripts load only if consent granted
```

## Consent Categories

| Category | Always Active | Includes |
|----------|---------------|----------|
| Necessary | ✅ Yes | Essential site functionality |
| Analytics | ❌ No | Google Analytics, HubSpot |
| Marketing | ❌ No | LinkedIn Insights, ZoomInfo, Google Ads |

## Files Created/Modified

### Created:
- `src/utils/consent.ts`
- `src/components/ConsentBanner/ConsentBanner.tsx`
- `src/components/ConsentBanner/ConsentBanner.module.css`
- `src/components/ConsentBanner/README.md`
- `src/components/ConsentMode/ConsentMode.tsx`
- `src/components/ConditionalAnalytics/ConditionalAnalytics.tsx`
- `src/__tests__/utils/consent.test.ts`
- `CONSENT_IMPLEMENTATION.md` (this file)

### Modified:
- `src/layouts/Layout/Layout.tsx` - Added consent banner and conditional analytics
- `src/analytics/LinkedinInsights.tsx` - Added consent check
- `src/analytics/ZoominfoAnalytics.tsx` - Added consent check
- `gatsby-config.ts` - Updated HubSpot and Google Analytics settings
- `jest.config.ts` - Changed to jsdom for localStorage testing

## Testing the Implementation

### Manual Testing:
1. Open browser DevTools → Application → Local Storage
2. Delete `phil_consent_preferences` key
3. Reload the page
4. Consent banner should appear at the bottom
5. Click "Accept All" or "Reject All"
6. Verify preference is saved in localStorage
7. Reload - banner should not appear again

### Verify Analytics Loading:
```javascript
// In browser console after accepting:
console.log(window.gtag); // Should be defined
console.log(window._hsq); // Should be defined

// After rejecting:
console.log(window.gtag); // May be defined but consent denied
```

### Run Unit Tests:
```bash
npm test consent.test.ts
```

## Compliance Features

✅ **GDPR Compliant**
- Explicit consent required before tracking
- Easy opt-out mechanism
- Consent preferences stored locally

✅ **CCPA Compliant**
- Do Not Track respected
- Clear opt-out options
- No tracking without consent

✅ **Google Consent Mode v2**
- Default consent set to "denied"
- Granular consent categories
- IP anonymization enabled

✅ **Accessibility**
- ARIA labels for screen readers
- Keyboard navigation support
- Clear, readable text

## Next Steps (Optional Enhancements)

1. **Add Privacy Policy Page**: Update the link in ConsentBanner to point to your actual privacy policy

2. **Add Customize Options**: Allow users to select individual consent categories instead of just Accept/Reject all

3. **Add Consent Preferences Page**: Create a page where users can change their consent preferences after initial choice

4. **Add Cookie Details**: Show users what specific cookies are used in each category

5. **Add Geolocation**: Show different consent flows based on user location (EU vs non-EU)

6. **Add Consent Expiry**: Auto-expire consent after X months and re-prompt users

## Support

For questions or issues with the consent implementation, refer to:
- `src/components/ConsentBanner/README.md` - Detailed component documentation
- Unit tests in `src/__tests__/utils/consent.test.ts` - Usage examples
