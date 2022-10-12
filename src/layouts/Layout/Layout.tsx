import React, {useState} from 'react';
import {useHotkeys, useMediaQuery, useViewportSize} from '@mantine/hooks';
import type {ColorScheme, MantineThemeOverride} from '@mantine/core';
import {Box} from '@mantine/core';
import {createStyles} from '@mantine/core';
import {MantineProvider, ColorSchemeProvider, Container} from '@mantine/core';
import {CHeader} from './CHeader/CHeader';
import {CFooter} from './CFooter/CFooter';
import {isIndex} from 'hooks/isIndex';

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
	const {classes} = useStyles();
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

	const theme: MantineThemeOverride = {
		breakpoints: {
			md: 1275,
		},
		colors: {
			brand: ['#00201F'],
		},
		headings: {
			fontWeight: 700,
			sizes: {
				h1: {
					fontSize: isIndex() ? '5.313rem' : '3.438rem',
				},
				h2: {
					fontSize: '3.438rem',
				},
				h3: {
					fontSize: '2.188rem',
				},
			},
			fontFamily: 'Raleway',
		},
		fontFamily: 'Lato',
	};

	return (
		<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider theme={{...theme, colorScheme}} withGlobalStyles withNormalizeCSS>
				<Container fluid className={classes.wrapper}>
					<CHeader />
					<Box>{children}</Box>
					{/* <CFooter /> */}
				</Container>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}
