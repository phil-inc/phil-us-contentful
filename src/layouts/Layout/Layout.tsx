import React, {useState} from 'react';
import {useHotkeys} from '@mantine/hooks';
import type {ColorScheme, MantineThemeOverride} from '@mantine/core';
import {createStyles} from '@mantine/core';
import {MantineProvider, ColorSchemeProvider, Container} from '@mantine/core';
import {CHeader} from './CHeader/CHeader';
import {CFooter} from './CFooter/CFooter';
import {isIndex} from 'hooks/isIndex';

const useStyles = createStyles(theme => ({
	wrapper: {
		width: '100vw',
	},

	innerWrapper: {
		width: '100vw',
		padding: '0 100px',

		// Dynamic media queries, define breakpoints in theme, use anywhere
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
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

	const footerLinks = [
		{label: 'Terms of Use', link: '#'},
		{label: 'Privacy Policy', link: '#'},
		{label: 'HIPAA Notice', link: '#'},
	];

	const theme: MantineThemeOverride = {
		colors: {
			brand: ['#00201F'],
		},
		headings: {
			fontWeight: 700,
			sizes: {
				h1: {
					fontSize: isIndex() ? 82 : 55,
				},
				h2: {
					fontSize: 52,
				},
				h3: {
					fontSize: 35,
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
					<Container fluid className={classes.innerWrapper}>
						{children}
					</Container>
					<CFooter links={footerLinks} />
				</Container>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}
