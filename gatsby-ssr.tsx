import React from 'react';
import {ColorSchemeScript, MantineProvider} from '@mantine/core';
import {theme} from './src/layouts/Layout/theme';

// 1. Google Consent Mode default state (must be VERY first — before any tags)
// Default denied for ad/analytics; wait_for_update gives CookieYes time to apply geo rules and push consent.
const gcmDefaultScript = (
	<script
		key="gcm-default"
		dangerouslySetInnerHTML={{
			__html: `
				window.dataLayer = window.dataLayer || [];
				window.dataLayer.push({ platform: 'gatsby', cms: 'cookieyes' });
				function gtag(){dataLayer.push(arguments);}
				gtag('consent', 'default', {
					'ad_storage': 'denied',
					'ad_user_data': 'denied',
					'ad_personalization': 'denied',
					'analytics_storage': 'denied',
					'functionality_storage': 'denied',
					'security_storage': 'granted',
					'wait_for_update': 500
				});
			`,
		}}
	/>
);

// 2. CookieYes SDK (loads after GCM so it can update consent; do not fire Analytics/Advertising tags until it has run)
const cookieYesScript = (
	<script
		key="cookieyes-sdk"
		id="cookieyes-script"
		type="text/javascript"
		src="https://cdn-cookieyes.com/client_data/2dc47b0a0466a26a3289cf91512a2365/script.js"
	/>
);

// 3. Google Tag Manager (loads after consent default + CookieYes)
const gtmScript = (
	<script
		key="gtm-script"
		dangerouslySetInnerHTML={{
			__html: `
				(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
				new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
				j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
				'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
				})(window,document,'script','dataLayer','GTM-P8P2538M');
			`,
		}}
	/>
);

export const onPreRenderHTML = ({getHeadComponents, replaceHeadComponents}) => {
	const headComponents = getHeadComponents();
	replaceHeadComponents([
		gcmDefaultScript,
		cookieYesScript,
		gtmScript,
		...headComponents,
		<ColorSchemeScript key="color-scheme-script" />,
	]);
};

export const wrapPageElement = ({element}) => {
	return <MantineProvider theme={theme} defaultColorScheme='light' classNamesPrefix='phil'>{element}</MantineProvider>;
};

export const onRenderBody = ({setHtmlAttributes}) => {
	setHtmlAttributes({lang: 'en'});
};
