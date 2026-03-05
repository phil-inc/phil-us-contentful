import React from 'react';
import {ColorSchemeScript, MantineProvider} from '@mantine/core';
import {theme} from './src/layouts/Layout/theme';

// 1. Google Tag Manager (loads after consent default)
const gtmScript = (
	<script
		key="gtm-script"
		dangerouslySetInnerHTML={{
			__html: `
				(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
				new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
				j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
				'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
				})(window,document,'script','dataLayer','${process.env.GATSBY_GTM_ID}');
			`,
		}}
	/>
);

// 2. GTM noscript fallback (immediately after <body> for users with JS disabled)
const gtmNoscript = (
	<noscript key="gtm-noscript">
		<iframe
			title="GTM"
			src={`https://www.googletagmanager.com/ns.html?id=${process.env.GATSBY_GTM_ID}`}
			height="0"
			width="0"
			style={{ display: 'none', visibility: 'hidden' }}
		/>
	</noscript>
);

// HubSpot / CookieYes integration
// https://www.cookieyes.com/documentation/integrating-hubspot-consent-api-with-cookieyes/
const hubSpotCookieYes = (
	<script>
		// Disable HubSpot's default cookie banner
		window.disableHubSpotCookieBanner = true;
		window._hsp = window._hsp || [];
		// Updates HubSpot consent settings
		const setHubSpotConsent = (consentDetails) => {
			window._hsp.push(["setHubSpotConsent", consentDetails]);
		};
		// Maps CookieYes categories to HubSpot's consent format
		const getConsentDetails = ({ analytics, advertisement, functional }) => ({
			analytics: !!analytics,
			advertisement: !!advertisement,
			functionality: !!functional,
		});
		// Event listener for CookieYes banner load
		document.addEventListener("cookieyes_banner_load", ({ detail }) => {
			if (!detail || !detail.categories) {
			console.error("Invalid detail object:", detail);
			return;
			}
			setHubSpotConsent(
			getConsentDetails({
				analytics: detail.categories.analytics,
				advertisement: detail.categories.advertisement,
				functional: detail.categories.functional,
			})
			);
		});
		// Event listener for CookieYes consent update
		document.addEventListener("cookieyes_consent_update", ({ detail }) => {
			if (!detail || !detail.accepted) {
			console.error("Invalid detail object:", detail);
			return;
			}
			const acceptedCategories = new Set(detail.accepted);
			const consentDetails = {
			analytics: acceptedCategories.has("analytics"),
			advertisement: acceptedCategories.has("advertisement"),
			functionality: acceptedCategories.has("functional"),
			};
			setHubSpotConsent(consentDetails);
		});
	</script>
)

export const onPreRenderHTML = ({getHeadComponents, replaceHeadComponents}) => {
	const headComponents = getHeadComponents();
	replaceHeadComponents([
		hubSpotCookieYes,
		gtmScript,
		...headComponents,
		<ColorSchemeScript key="color-scheme-script" />,
	]);
};

export const wrapPageElement = ({element}) => {
	return <MantineProvider theme={theme} defaultColorScheme='light' classNamesPrefix='phil'>{element}</MantineProvider>;
};

export const onRenderBody = ({ setHtmlAttributes, setPreBodyComponents }) => {
	setHtmlAttributes({ lang: 'en' });
	setPreBodyComponents([gtmNoscript]);
};
