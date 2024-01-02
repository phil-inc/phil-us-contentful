import React from 'react';
import {AppShell, Box, Button, Grid, Group, createTheme} from '@mantine/core';
import {MantineProvider, Container} from '@mantine/core';
import CHeader, {HEADER_HEIGHT} from './CHeader/CHeader';
import {isIndex} from 'hooks/isIndex';
import {HubspotProvider} from '@aaronhayes/react-use-hubspot-form';
import CFooter from './CFooter/CFooter';
import LinkedinInsights from 'analytics/LinkedinInsights';

// Import css overrides here
import 'assets/css/index.css';
import ZoominfoAnalytics from 'analytics/ZoominfoAnalytics';
import '@mantine/core/styles.css';
import * as classes from './layout.module.css';

const isProduction = process.env.NODE_ENV === 'production';

export const Head: React.FC = () => <>{isProduction && <LinkedinInsights />}</>;

type LayoutProps = {
	children: React.ReactNode;
	minimal?: boolean;
	headerTargetBlank?: boolean;
};

export function Layout({children, minimal = false, headerTargetBlank = false}: LayoutProps) {
	const theme = createTheme({
		breakpoints: {
			xs: '500px',
			sm: '800px',
			md: '1275px',
			lg: '1300px',
			xl: '1400px',
		},
		colors: {
			philBranding: [
				'#D5F1F0',
				'#00827E',
				'#0A0A0A',
				'#00827E',
				'#00827E',
				'#00827E',
				'#00827E',
				'#00827E',
				'#00827E',
				'#00201F',
			],
		},
		primaryColor: 'philBranding',
		headings: {
			fontWeight: '700',
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
				h4: {
					fontSize: 'min(30px, calc(1rem + 0.989vw))',
					lineHeight: '1.3',
				},
				h5: {
					fontSize: 'min(24px, calc(1rem + 0.989vw))',
					lineHeight: '1.3',
				},
				h6: {
					fontSize: 'min(18px, calc(1rem + 0.989vw))',
					lineHeight: '1.3',
				},
			},
			fontFamily: 'Raleway',
		},
		fontFamily: 'Lato, sans-serif',

		spacing: {
			xs: '8px',
			sm: '16px',
			md: '32px',
			lg: '64px',
			xl: '128px',
		},

		components: {
			Button: Button.extend({
				classNames: classes,
			}),
		},

		// Components: {
		// 	Button: {
		// 		styles: (theme, params: ButtonStylesParams) => ({
		// 			root: {
		// 				borderRadius: '0',
		// 				padding: '10px 20px',
		// 				...(params.variant === 'filled' && {
		// 					backgroundColor: theme.colors.primary[0],
		// 					color: 'white',
		// 					transition: 'outline 0.15s ease-in-out',
		// 					outlineOffset: -3,
		// 				}),

		// 				...(params.variant === 'default' && {
		// 					backgroundColor: theme.colors.philBranding[9],
		// 					color: 'white',
		// 					border: `1px solid ${theme.colors.philBranding[9]}`,
		// 					outlineOffset: -3,
		// 				}),

		// 				'&:hover': {
		// 					...(params.variant === 'filled' && {
		// 						backgroundColor: 'white',
		// 						color: theme.colors.primary[0],
		// 						outline: `3px solid ${theme.colors.primary[0]}`,
		// 					}),

		// 					...(params.variant === 'default' && {
		// 						backgroundColor: theme.colors.philBranding[2],
		// 						border: `1px solid ${theme.colors.philBranding[2]}`,
		// 					}),

		// 					...(params.variant === 'outline' && {
		// 						backgroundColor: params.color === 'dark' ? undefined : theme.colors.philBranding[9],
		// 						color: params.color === 'dark' ? undefined : 'white',
		// 					}),

		// 					fontWeight: 900,
		// 				},

		// 				'&:focus:not(:focus-visible)': {
		// 					...(params.variant === 'filled' && {
		// 						outline: `3px solid ${theme.colors.primary[0]}`,
		// 						outlineOffset: -3,
		// 						backgroundColor: 'white',
		// 						color: theme.colors.primary[0],
		// 					}),
		// 				},
		// 			},
		// 		}),
		// 	},
		// },
	});

	return (
		<>
			<MantineProvider theme={theme} classNamesPrefix='phil'>
				<HubspotProvider>
					<AppShell
						header={{
							height: HEADER_HEIGHT,
						}}
					>
						{isProduction && <ZoominfoAnalytics />}
						<CHeader minimal={minimal} headerTargetBlank={headerTargetBlank} />
						<Box>{children}</Box>
						<CFooter minimal={minimal} />
					</AppShell>
				</HubspotProvider>
			</MantineProvider>
		</>
	);
}
