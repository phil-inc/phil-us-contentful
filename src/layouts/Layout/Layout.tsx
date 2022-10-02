import React, {useState} from 'react';
import {useHotkeys} from '@mantine/hooks';
import type {ColorScheme, MantineThemeOverride} from '@mantine/core';
import {MantineProvider, ColorSchemeProvider, Container} from '@mantine/core';
import {CHeader} from './CHeader/CHeader';
import {CFooter} from './CFooter/CFooter';
import {isIndex} from 'hooks/isIndex';

type LayoutProps = {
	children: React.ReactNode;
};

export function Layout({children}: LayoutProps) {
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

	const links = [
		{label: 'Life sciences', link: '#'},

		{label: 'Healthcare providers', link: '#'},
		{label: 'Patients', link: '#'},
		{
			label: 'Resources',
			link: '#',
			links: [
				{label: 'Terms of Use', link: '#'},
				{label: 'Privacy Policy', link: '#'},
				{label: 'HIPAA Notice', link: '#'},
			],
		},
		{
			label: 'Company',
			link: '#',
			links: [
				{label: 'Terms of Use', link: '#'},
				{label: 'Privacy Policy', link: '#'},
				{label: 'HIPAA Notice', link: '#'},
			],
		},
		{
			label: 'Contact',
			link: '#',
			links: [
				{label: 'Terms of Use', link: '#'},
				{label: 'Privacy Policy', link: '#'},
				{label: 'HIPAA Notice', link: '#'},
			],
		},
	];

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
				<Container size={1920}>
					<CHeader links={links} />
					<Container fluid px={100}>
						{children}
					</Container>
					<CFooter links={footerLinks} />
				</Container>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}
