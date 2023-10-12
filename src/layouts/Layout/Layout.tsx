import React from 'react';
import type {ButtonStylesParams, MantineTheme, MantineThemeOverride} from '@mantine/core';
import {Box} from '@mantine/core';
import {createStyles} from '@mantine/core';
import {MantineProvider, Container} from '@mantine/core';
import CHeader from './CHeader/CHeader';
import {isIndex} from 'hooks/isIndex';
import {HubspotProvider} from '@aaronhayes/react-use-hubspot-form';
import CFooter from './CFooter/CFooter';
import LinkedinInsights from 'analytics/LinkedinInsights';

// Import css overrides here
import 'assets/css/index.css';
import ZoominfoAnalytics from 'analytics/ZoominfoAnalytics';

const isProduction = process.env.NODE_ENV === 'production';

export const Head: React.FC = () => <>{isProduction && <LinkedinInsights />}</>;

const useStyles = createStyles(theme => ({
	wrapper: {
		width: '100vw',
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
	minimal?: boolean;
	headerTargetBlank?: boolean;
};

export function Layout({children, minimal = false, headerTargetBlank = false}: LayoutProps) {
	const {classes} = useStyles();

	const themeOverride: MantineThemeOverride = {
		breakpoints: {
			md: 1275,
		},
		colors: {
			primary: ['#00201F', '#031A19', '#051515', '#061211', '#060F0F', '#060D0C', '#060B0B'],
			philBranding: [
				'#D5F1F0',
				'#00827E',
				'#00827E',
				'#00827E',
				'#00827E',
				'#00827E',
				'#00827E',
				'#00827E',
				'#00827E',
				'#00827E',
			],
		},
		primaryColor: 'philBranding',
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
						...(params.variant === 'filled' && {
							backgroundColor: theme.colors.primary[0],
							color: 'white',
							transition: 'outline 0.15s ease-in-out',
							outlineOffset: -3,
						}),

						...(params.variant === 'default' && {
							backgroundColor: theme.colors.philBranding[9],
							color: 'white',
							border: `1px solid ${theme.colors.philBranding[9]}`,
							outlineOffset: -3,
						}),

						'&:hover': {
							...(params.variant === 'filled' && {
								backgroundColor: 'white',
								color: theme.colors.primary[0],
								outline: `3px solid ${theme.colors.primary[0]}`,
							}),

							...(params.variant === 'default' && {
								backgroundColor: 'white',
								color: theme.colors.philBranding[9],
							}),

							...(params.variant === 'outline' && {
								backgroundColor: theme.colors.philBranding[9],
								color: 'white',
							}),

							fontWeight: 900,
						},

						'&:focus:not(:focus-visible)': {
							...(params.variant === 'filled' && {
								outline: `3px solid ${theme.colors.primary[0]}`,
								outlineOffset: -3,
								backgroundColor: 'white',
								color: theme.colors.primary[0],
							}),
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
						{isProduction && <ZoominfoAnalytics />}
						<CHeader minimal={minimal} headerTargetBlank={headerTargetBlank} />
						<Box>{children}</Box>
						<CFooter minimal={minimal} />
					</Container>
				</HubspotProvider>
			</MantineProvider>
		</>
	);
}
