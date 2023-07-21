// Import necessary dependencies
import React, {useRef, useState} from 'react';
import {Document, Page} from 'react-pdf';
import {AspectRatio, Box, Button, Container, Group, Text, createStyles} from '@mantine/core';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

// Define styles for the PDF viewer
const useStyles = createStyles((theme, {pageContainerHeight}: {pageContainerHeight: number}) => ({
	pdfPage: {
		'>canvas': {
			maxWidth: '100%',
			height: 'auto !important',
		},
	},
	pdfDocument: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	loadingContainer: {
		height: 500,
	},
	pageLoadingContainer: {
		height: pageContainerHeight,
	},
}));

// Define the properties for the PDFViewer component
type PDFViewerProps = {
	url: string;
	width: number;
};

// PDFViewer component
const PDFViewer: React.FC<PDFViewerProps> = ({url, width}) => {
	// Define the state variables for the component
	const [numPages, setNumPages] = useState<number>(0);
	const [pageNumber, setPageNumber] = useState(1);

	const ref = useRef(null);

	const height = ref?.current?.clientHeight as number;
	const {classes} = useStyles({pageContainerHeight: height ?? 500});

	// Function to handle the successful loading of a document
	const onDocumentLoadSuccess = ({numPages}: {numPages: number}) => {
		setNumPages(numPages);
	};

	// Function to change the current page
	const changePage = (offset: number) => {
		setPageNumber(prevPageNumber => prevPageNumber + offset);
	};

	// Function to go to the previous page
	const previousPage = () => {
		changePage(-1);
	};

	// Function to go to the next page
	const nextPage = () => {
		changePage(1);
	};

	console.log(ref);

	return (
		<div>
			<Document
				className={classes.pdfDocument}
				file={url}
				loading={
					<Container className={classes.loadingContainer}>
						<LoadingIndicator size='xl' />
					</Container>
				}
				onLoadSuccess={onDocumentLoadSuccess}
				onLoadError={error => {
					console.error('Error while loading document: ', error);
				}}
			>
				<Page
					canvasRef={ref}
					width={width}
					loading={
						<Container className={classes.pageLoadingContainer}>
							<LoadingIndicator size='xl' />
						</Container>
					}
					className={classes.pdfPage}
					pageNumber={pageNumber}
					renderMode='canvas'
					renderTextLayer={false}
					renderAnnotationLayer={false}
					renderForms={false}
				/>
			</Document>
			<Group position='center' align='center' mt={16}>
				<Button type='button' disabled={pageNumber <= 1} onClick={previousPage}>
					Previous
				</Button>
				<Text>
					Page {pageNumber} of {numPages}
				</Text>
				<Button type='button' disabled={pageNumber >= numPages} onClick={nextPage}>
					Next
				</Button>
			</Group>
		</div>
	);
};

export default PDFViewer;
