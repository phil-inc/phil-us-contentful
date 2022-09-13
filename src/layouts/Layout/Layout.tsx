import React, {useState} from 'react';
import {useHotkeys} from '@mantine/hooks';
import type {ColorScheme} from '@mantine/core';
import {MantineProvider, ColorSchemeProvider, Container} from '@mantine/core';
import {CHeader} from './CHeader/CHeader';
import {CFooter} from './CFooter/CFooter';

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

	return (
		<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider theme={{colorScheme}} withGlobalStyles withNormalizeCSS>
				<CHeader links={links} />
				<Container>{children}</Container>
				<CFooter links={footerLinks} />
			</MantineProvider>
		</ColorSchemeProvider>
	);
}
