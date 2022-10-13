import React, {useState} from 'react';
import {useHotkeys, useMediaQuery} from '@mantine/hooks';
import type {ColorScheme, MantineTheme, MantineThemeOverride} from '@mantine/core';
import {Box} from '@mantine/core';
import {createStyles} from '@mantine/core';
import {MantineProvider, ColorSchemeProvider, Container} from '@mantine/core';
import {CHeader} from './CHeader/CHeader';

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
	const isMobile = useMediaQuery(`(min-width: ${theme.breakpoints.sm}px)`);
	const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
	const toggleColorScheme = (value?: ColorScheme) => {
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
	};

	useHotkeys([
		[
			'mod+J',
			() => {
				toggleColorScheme();
			},
		],
	]);

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
					fontSize: 'calc(3rem + 1.927vw)',
				},
				h2: {
					fontSize: 'calc(2rem + 1.197vw)',
				},
				h3: {
					fontSize: 'calc(1rem + 0.989vw)',
				},
			},
			fontFamily: 'Raleway',
		},
		fontFamily: 'Lato',

		other: {
			globalStyles: {
				body: {
					color: theme.colors.primary,
				},
			},
		},
	};

	return (
		<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider
				theme={{
					globalStyles: (theme: MantineTheme) => ({
						body: {
							color: theme.colors.primary[0],
						},
					}),
					...themeOverride,
					colorScheme,
				}}
				withGlobalStyles
				withNormalizeCSS
			>
				<Container fluid className={classes.wrapper}>
					<CHeader />
					<Box>{children}</Box>
					{/* <CFooter /> */}
				</Container>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}
