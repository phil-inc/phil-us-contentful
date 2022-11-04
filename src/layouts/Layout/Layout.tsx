import React from 'react';
import type {ButtonStylesParams, MantineTheme, MantineThemeOverride} from '@mantine/core';
import {Box} from '@mantine/core';
import {createStyles} from '@mantine/core';
import {MantineProvider, Container} from '@mantine/core';
import {CHeader} from './CHeader/CHeader';
import {isIndex} from 'hooks/isIndex';
import {HubspotProvider} from '@aaronhayes/react-use-hubspot-form';
import {CFooter} from './CFooter/CFooter';

// Import css overrides here
import 'assets/css/index.css';
import {Script} from 'gatsby';

const isProduction = process.env.NODE_ENV === 'production';

export const Head: React.FC = () => (
	<>
		{/* ZoomInfo Pixel */}
		{isProduction && (
			<Script>
				{`
		(function() {
			var _bU1 = document.createElement("script"),
				_of = (function(_eTK, _S1) {
					var _j0 = "";
					for (var _yY = 0; _yY < _eTK.length; _yY++) {
						var _pg = _eTK[_yY].charCodeAt();
						_pg -= _S1;
						_pg += 61;
						_j0 == _j0;
						_pg != _yY;
						_pg %= 94;
						_S1 > 9;
						_pg += 33;
						_j0 += String.fromCharCode(_pg)
					}
					return _j0
				})(atob("diQkfiNIPT0nIzwqfX17d3x0fTxxfXs9fncoc3o9REFDR0BwckZvPnFBcURCP0B0QEZBckBv"), 14);
		
			function _J6() {};
			_bU1 != "1";
			_bU1.referrerPolicy = "unsafe-url";
			_bU1.type = "text/javascript";
			9 > 4;
			_bU1.async = !0;
			_bU1.src = _of;
			var _oLM = document.getElementsByTagName("script")[0];
			_oLM.parentNode.insertBefore(_bU1, _oLM)
		})();
		`}
			</Script>
		)}

		{/* Linkedin Insights */}
		{isProduction && (
			<Script>
				{`
			_linkedin_partner_id = "3195924";
			window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
			window._linkedin_data_partner_ids.push(_linkedin_partner_id);
			(function(l) {
				if (!l) {
					window.lintrk = function(a, b) {
						window.lintrk.q.push([a, b])
					};
					window.lintrk.q = []
				}
				var s = document.getElementsByTagName("script")[0];
				var b = document.createElement("script");
				b.type = "text/javascript";
				b.async = true;
				b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
				s.parentNode.insertBefore(b, s);
			})(window.lintrk);
			`}
			</Script>
		)}
	</>
);

const useStyles = createStyles(theme => ({
	wrapper: {
		width: '100%',
		overflow: 'hidden',
		padding: 0,
	},

	innerWrapper: {
		width: '100%',
		padding: 100,

		// Dynamic media queries, define breakpoints in theme, use anywhere
		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			padding: `0 ${theme.spacing.sm}px`,
		},
	},
}));

type LayoutProps = {
	children: React.ReactNode;
};

export function Layout({children}: LayoutProps) {
	const {classes} = useStyles();

	const themeOverride: MantineThemeOverride = {
		breakpoints: {
			md: 1275,
		},
		colors: {
			primary: ['#00201F', '#031A19', '#051515', '#061211', '#060F0F', '#060D0C', '#060B0B'],
		},
		headings: {
			fontWeight: 700,
			sizes: {
				h1: {
					fontSize: isIndex() ? 'min(85px, calc(3rem + 1.927vw))' : 'min(calc(2rem + 1.197vw), 85px)',
				},
				h2: {
					fontSize: 'min(55px, calc(2rem + 1.197vw))',
				},
				h3: {
					fontSize: 'min(35px, calc(1rem + 0.989vw))',
					lineHeight: '1.3',
				},
			},
			fontFamily: 'Raleway',
		},
		fontFamily: 'Lato',

		spacing: {
			xs: 8,
			sm: 16,
			md: 32,
			lg: 64,
			xl: 128,
		},

		components: {
			Button: {
				styles: (theme, params: ButtonStylesParams) => ({
					root: {
						borderRadius: '0',
						padding: '10px 20px',
						backgroundColor: params.variant === 'filled' ? theme.colors.primary[0] : undefined,
						transition: 'outline 0.2s ease-out',

						'&:hover': {
							backgroundColor: params.variant === 'filled' ? 'transparent' : undefined,
							color: theme.colors.primary[0],
							fontWeight: 900,
							outline: `3px solid ${theme.colors.primary[0]}`,
						},

						'&:focus:not(:focus-visible)': {
							outline: `3px solid ${theme.colors.primary[0]}`,
						},
					},
				}),
			},
		},
	};

	return (
		<>
			<MantineProvider
				theme={{
					globalStyles: (theme: MantineTheme) => ({
						body: {
							color: theme.colors.primary[0],
						},
					}),
					...themeOverride,
				}}
				withGlobalStyles
				withNormalizeCSS
			>
				<HubspotProvider>
					<Container fluid className={classes.wrapper}>
						{/* Tracking Pixel */}
						{isProduction && (
							<Script>
								{`
		(function (options) {
			var s = document.createElement("script");
			s.async = true;
			s.src = "https://metadata-static-files.sfo2.cdn.digitaloceanspaces.com/pixel/lp.js";
			s.onload = function () {
			window.Metadata.pixel.init(options);
			};
			document.head.appendChild(s);
			})({
			primaryKey: "name",
			onReady: function () {
			var minutes = 30;
			var setCookie = function (name, value) {
			var expires = new Date(Date.now() + minutes * 60 * 1000).toUTCString();
			document.cookie = name + "=" + encodeURIComponent(value) + "; path=/; domain=phil.us; expires=" + expires;
			};
			var cid = new URLSearchParams(window.location.search).get("metadata_cid");
			
			if (cid) {
			setCookie("metadata_cid", cid);
			}
			},
			adjustDataBeforeSend: function (data) {
			var getCookie = function (name) {
			var value = "; " + document.cookie;
			var parts = value.split("; " + name + "=");
			if (parts.length === 2) return parts.pop().split(";").shift();
			};
			
			return Object.assign(data, {
			metadata_cid: getCookie("metadata_cid"),
			});
			},
			});			
		`}
							</Script>
						)}
						<CHeader />
						<Box>{children}</Box>
						<CFooter />
					</Container>
				</HubspotProvider>
			</MantineProvider>
		</>
	);
}
