import React, {useState} from 'react';
import {useHotkeys, useMediaQuery} from '@mantine/hooks';
import type {ButtonStylesParams, ColorScheme, MantineTheme, MantineThemeOverride} from '@mantine/core';
import {Box} from '@mantine/core';
import {createStyles} from '@mantine/core';
import {MantineProvider, ColorSchemeProvider, Container} from '@mantine/core';
import {CHeader} from './CHeader/CHeader';
import {isIndex} from 'hooks/isIndex';
import {HubspotProvider} from '@aaronhayes/react-use-hubspot-form';
import {CFooter} from './CFooter/CFooter';

// Import css overrides here
import 'assets/css/index.css';

const useStyles = createStyles(theme => ({
	wrapper: {
		width: 1920,
		padding: 0,
	},

	innerWrapper: {
		width: '100%',
		padding: 100,

		// Dynamic media queries, define breakpoints in theme, use anywhere
		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			padding: '0 16px',
		},
	},
}));

type LayoutProps = {
	children: React.ReactNode;
};

export function Layout({children}: LayoutProps) {
	const {classes, theme} = useStyles();

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
				},
			},
			fontFamily: 'Raleway',
		},
		fontFamily: 'Lato',

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
					},
				}),
			},
		},
	};

	return (
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
					<CHeader />
					<Box>{children}</Box>
					<CFooter />
				</Container>
			</HubspotProvider>
		</MantineProvider>
	);
}
