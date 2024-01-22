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
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import ZoominfoAnalytics from 'analytics/ZoominfoAnalytics';
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
			xs: '40em',
			sm: '48em',
			md: '64em',
			lg: '80em',
			xl: '96em',
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
					fontSize: '60px',
					lineHeight: '1',
				},
				h2: {
					fontSize: '40px',
					lineHeight: '1',
				},
				h3: {
					fontSize: '28px',
					lineHeight: '1',
				},
				h4: {
					fontSize: '20px',
					lineHeight: '1',
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
			fontFamily: 'Raleway, sans-serif',
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
				classNames: {root: classes.root, label: classes.label},
			}),
		},
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
