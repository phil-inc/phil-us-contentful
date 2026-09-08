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

const resourceHints = [
	// Full handshake (DNS + TCP + TLS) for domains that serve critical early resources
	<link key="preconnect-ctfassets" rel="preconnect" href="https://images.ctfassets.net" />,
	<link key="preconnect-gtm" rel="preconnect" href="https://www.googletagmanager.com" />,
	// DNS-only for deferred/analytics scripts
	<link key="dns-hsforms" rel="dns-prefetch" href="//js.hsforms.net" />,
	<link key="dns-trustpilot" rel="dns-prefetch" href="//widget.trustpilot.com" />,
	<link key="dns-ytimg" rel="dns-prefetch" href="//i.ytimg.com" />,
];

// 3. Organization entity (sitewide) — identifies PHIL to search engines and AI agents.
// Emitted here rather than per-template so every page carries it, and so other
// schema blocks can reference the company via its @id instead of restating it.
const organizationSchema = (
	<script
		key="organization-schema"
		type="application/ld+json"
		dangerouslySetInnerHTML={{
			__html: JSON.stringify({
				'@context': 'https://schema.org',
				'@type': 'Organization',
				'@id': 'https://phil.us/#organization',
				name: 'PHIL',
				legalName: 'Phil, Inc.',
				url: 'https://phil.us',
				logo: {
					'@type': 'ImageObject',
					url: 'https://phil.us/icons/icon-512x512.png',
					width: 512,
					height: 512,
				},
				description:
					'PHIL simplifies the prescription journey for patients and providers — solving medication access and GTN challenges for pharma brands.',
				address: {
					'@type': 'PostalAddress',
					streetAddress: '14500 N Northsight Blvd, Suite 307',
					addressLocality: 'Scottsdale',
					addressRegion: 'AZ',
					postalCode: '85260',
					addressCountry: 'US',
				},
				sameAs: ['https://www.linkedin.com/company/phil-inc-'],
			}),
		}}
	/>
);

export const onPreRenderHTML = ({getHeadComponents, replaceHeadComponents}) => {
	const headComponents = getHeadComponents();
	replaceHeadComponents([
		...resourceHints,
		gtmScript,
		...headComponents,
		organizationSchema,
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
