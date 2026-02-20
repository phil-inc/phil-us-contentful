import React from 'react';
import {ColorSchemeScript, MantineProvider} from '@mantine/core';
import {theme} from './src/layouts/Layout/theme';

export const onPreRenderHTML = ({getHeadComponents, replaceHeadComponents}) => {
	const headComponents = getHeadComponents();
	
	// Add CookieYes script at the beginning of head
	const cookieYesScript = (
		<script
			key="cookieyes"
			id="cookieyes"
			type="text/javascript"
			src="https://cdn-cookieyes.com/client_data/23e55f35b7c77040a59ea329f3a2fd8f/script.js"
		/>
	);
	
	replaceHeadComponents([cookieYesScript, ...headComponents, <ColorSchemeScript key="color-scheme-script" />]);
};

export const wrapPageElement = ({element}) => {
	return <MantineProvider theme={theme} defaultColorScheme='light' classNamesPrefix='phil'>{element}</MantineProvider>;
};

export const onRenderBody = ({setHtmlAttributes}) => {
	setHtmlAttributes({lang: 'en'});
};
