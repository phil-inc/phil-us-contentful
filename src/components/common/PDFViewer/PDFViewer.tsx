// Import necessary dependencies
import React, {useRef, useState, forwardRef} from 'react';
import {Document, Page} from 'react-pdf';
import {ActionIcon, Anchor, AspectRatio, Box, Button, Container, Flex, Group, Text, createStyles} from '@mantine/core';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import Expanded from '../Expanded/Expanded';
import {IconArrowBack, IconChevronLeft, IconChevronRight} from '@tabler/icons';

// Define styles for the PDF viewer
const useStyles = createStyles(
	(theme, {pageContainerHeight, pageContainerWidth}: {pageContainerHeight: number; pageContainerWidth: number}) => ({
		container: {
			minHeight: '64.5rem',
			background: '#6A7979',
			margin: '100px -100px',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			padding: '22px 20px',

			[theme.fn.smallerThan('sm')]: {
				margin: 'auto -16px',
				minHeight: '35rem',
			},
		},
		pageContainer: {
			display: 'flex',
			alignItems: 'center',
			columnGap: 70,

			[theme.fn.smallerThan('sm')]: {
				// Padding: 20,
			},
		},
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
			marginTop: 71.5,

			[theme.fn.smallerThan('sm')]: {
				marginTop: 0,
			},
		},
		loadingContainer: {
			height: 742,
			width: '100%',
			maxWidth: 595,
		},
		pageLoadingContainer: {
			height: pageContainerHeight,
			width: pageContainerWidth,
			maxWidth: 595,
		},
		actionButtons: {
			[theme.fn.smallerThan('sm')]: {
				display: 'none',
			},
		},

		actionButtonsMobile: {
			[theme.fn.largerThan('sm')]: {
				display: 'none',
			},
		},
		pageNumber: {
			marginTop: 30,

			[theme.fn.smallerThan('sm')]: {
				marginTop: 20,
			},
		},

		downloadButton: {
			marginTop: 30,

			[theme.fn.smallerThan('sm')]: {
				marginTop: 20,
			},
		},

		buttonText: {
			fontSize: 14,
			fontWeight: 500,
		},
	}),
);

// Define the properties for the PDFViewer component
type PDFViewerProps = {
	url: string;
	width: number;
};

// PDFViewer component
const PDFViewer = forwardRef<HTMLDivElement, PDFViewerProps>(({url, width}, ref) => {
	// Define the state variables for the component
	const [numPages, setNumPages] = useState<number>(0);
	const [pageNumber, setPageNumber] = useState(1);

	const height = ref?.current?.clientHeight as number;
	const {classes} = useStyles({pageContainerHeight: height ?? 500, pageContainerWidth: width ?? 595});

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

	return (
		<div className={classes.container}>
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
				<Box className={classes.pageContainer}>
					<ActionIcon
						className={classes.actionButtons}
						variant='filled'
						color='dark'
						size={75}
						radius={'50%'}
						pr={5}
						onClick={previousPage}
						disabled={pageNumber <= 1}
					>
						<IconChevronLeft size={50} />
					</ActionIcon>
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
					<ActionIcon
						className={classes.actionButtons}
						variant='filled'
						color='dark'
						size={75}
						radius={'50%'}
						pl={5}
						onClick={nextPage}
						disabled={pageNumber >= numPages}
					>
						<IconChevronRight size={50} />
					</ActionIcon>
				</Box>
			</Document>

			<Group position='center' align='center' className={classes.pageNumber} spacing='lg'>
				<ActionIcon
					className={classes.actionButtonsMobile}
					variant='filled'
					color='dark'
					size={36}
					radius={'50%'}
					onClick={previousPage}
					disabled={pageNumber <= 0}
				>
					<IconChevronLeft size={25} />
				</ActionIcon>
				<Text size={24} color='#fff'>
					Page {pageNumber} of {numPages}
				</Text>
				<ActionIcon
					className={classes.actionButtonsMobile}
					variant='filled'
					color='dark'
					size={36}
					radius={'50%'}
					onClick={nextPage}
					disabled={pageNumber >= numPages}
				>
					<IconChevronRight size={25} />
				</ActionIcon>
			</Group>
			<Group position='center' align='center' className={classes.downloadButton}>
				<Anchor variant='text' type='button' href={url} target='_blank'>
					<Button classes={classes.buttonText} px={21} size='md'>
						Download PDF
					</Button>
				</Anchor>
			</Group>
		</div>
	);
});

export default PDFViewer;
