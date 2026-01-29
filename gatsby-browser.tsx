import React from 'react';

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

import {pdfjs} from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

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

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();
