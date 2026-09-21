import React from 'react';
import type {GatsbyBrowser} from 'gatsby';

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/raleway'; // Defaults to 400
import '@fontsource/raleway/600.css';
import '@fontsource/raleway/700.css';
import '@fontsource/raleway/800.css';
import '@fontsource/raleway/900.css';
import '@fontsource/lato'; // Defaults to 400
import '@fontsource/lato/700.css';
import '@fontsource/lato/900.css';

import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import {MantineProvider} from '@mantine/core';
import {theme} from './src/layouts/Layout/theme';

export const wrapPageElement = ({element}) => {
	return (
		<MantineProvider theme={theme} defaultColorScheme="light" classNamesPrefix="phil">
			{element}
		</MantineProvider>
	);
};

// A paginated listing's pages, e.g. /resources/ and /resources/page/n/;
// group 1 names the listing.
const LISTING_PATH = /^\/(resources|press)(?:\/page\/\d+)?\/?$/;

// Preserve scroll position when only the query string changes on the same page
// (e.g. the Resources page updating ?topic=&type= as filters change), and when
// moving between the pages of one listing, which share one layout. Without
// this, Gatsby's default scroll behavior jumps to the top on every filter
// selection or page change. Real navigations elsewhere still scroll normally.
export const shouldUpdateScroll: GatsbyBrowser['shouldUpdateScroll'] = ({routerProps, prevRouterProps}) => {
	const prevListing = LISTING_PATH.exec(prevRouterProps?.location?.pathname ?? '')?.[1];
	const nextListing = LISTING_PATH.exec(routerProps?.location?.pathname ?? '')?.[1];
	if (prevListing && prevListing === nextListing) {
		return false;
	}

	return true;
};


