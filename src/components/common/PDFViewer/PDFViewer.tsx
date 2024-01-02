import React, {useState, forwardRef} from 'react';
import {Document, Page} from 'react-pdf';
import {ActionIcon, Anchor, Box, Button, Container, Group, Text, useMantineTheme} from '@mantine/core';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import {IconChevronLeft, IconChevronRight} from '@tabler/icons';
import {useViewportSize} from '@mantine/hooks';

import * as classes from './pdfViewer.module.css';

const PADDING = 20;
const MAX_PAGE_WIDTH = 595;



// Define the properties for the PDFViewer component
type PDFViewerProps = {
	url: string;
	pageContainerWidth: number;
};

// PDFViewer component
const PDFViewer = forwardRef<HTMLDivElement, PDFViewerProps>(({url, pageContainerWidth}, ref) => {
	const wrapperRef = React.useRef();

	const [numPages, setNumPages] = useState<number>(0);
	const [pdfPageWidth, setPdfPageWidth] = useState<number>(MAX_PAGE_WIDTH);
	const [pageNumber, setPageNumber] = useState(1);
	const theme = useMantineTheme();
	const {width} = useViewportSize();

	// TODO: handle mobile view
	const isMobileView = false;

	React.useEffect(() => {
		if (pdfPageWidth > MAX_PAGE_WIDTH || !isMobileView) {
			setPdfPageWidth(MAX_PAGE_WIDTH);
			return;
		}

		setPdfPageWidth(wrapperRef.current?.clientWidth ? wrapperRef.current.clientWidth - PADDING * 2 : 0);
	}, [width]);

	const height = ref?.current?.clientHeight as number;
	// const {classes} = useStyles({
	// 	pageContainerHeight: height ?? 500,
	// 	pageContainerWidth: pageContainerWidth ?? MAX_PAGE_WIDTH,
	// 	padding: PADDING,
	// });

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
		<div ref={wrapperRef} className={classes.container}>
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
				externalLinkTarget='_blank'
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
						width={pdfPageWidth}
						loading={
							<Container className={classes.pageLoadingContainer}>
								<LoadingIndicator size='xl' />
							</Container>
						}
						className={classes.pdfPage}
						pageNumber={pageNumber}
						renderMode='canvas'
						renderTextLayer={false}
						renderAnnotationLayer={true}
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
					disabled={pageNumber <= 1}
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
					<Button className={classes.buttonText} px={21} size='md'>
						Download PDF
					</Button>
				</Anchor>
			</Group>
		</div>
	);
});

export default PDFViewer;
