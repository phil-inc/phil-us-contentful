import React from 'react';
import {ColorSchemeScript, MantineProvider} from '@mantine/core';
import {theme} from './src/layouts/Layout/theme';

// 1. CookieYes CMP — must load BEFORE GTM so stored consent is restored before any tags fire.
// Without this, returning visitors' analytics_storage stays unknown at GTM init → HubSpot blocked.
const cookieYesScript = (
	<script
		key="cookieyes"
		id="cookieyes"
		type="text/javascript"
		src="https://cdn-cookieyes.com/client_data/2dc47b0a0466a26a3289cf91512a2365/script.js"
	/>
);

// 2. Google Tag Manager (loads after CookieYes so consent state is already applied)
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

// 3. GTM noscript fallback (immediately after <body> for users with JS disabled)
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

const resourceHints = [
	// Full handshake (DNS + TCP + TLS) for domains that serve critical early resources
	<link key="preconnect-ctfassets" rel="preconnect" href="https://images.ctfassets.net" />,
	<link key="preconnect-gtm" rel="preconnect" href="https://www.googletagmanager.com" />,
	<link key="preconnect-cookieyes" rel="preconnect" href="https://cdn-cookieyes.com" />,
	// DNS-only for deferred/analytics scripts
	<link key="dns-hsforms" rel="dns-prefetch" href="//js.hsforms.net" />,
	<link key="dns-trustpilot" rel="dns-prefetch" href="//widget.trustpilot.com" />,
	<link key="dns-linkedin" rel="dns-prefetch" href="//snap.licdn.com" />,
	<link key="dns-zoominfo" rel="dns-prefetch" href="//js.zi-scripts.com" />,
	<link key="dns-ytimg" rel="dns-prefetch" href="//i.ytimg.com" />,
];

export const onPreRenderHTML = ({getHeadComponents, replaceHeadComponents}) => {
	const headComponents = getHeadComponents();
	replaceHeadComponents([
		...resourceHints,
		cookieYesScript,
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
