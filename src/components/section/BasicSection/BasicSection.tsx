import React from 'react';
import {createPortal} from 'react-dom';
import {BLOCKS, INLINES} from '@contentful/rich-text-types';
import {Anchor, Box, Button, Container, createStyles, Divider, Grid, Group, List, Text, Title} from '@mantine/core';
import Asset from 'components/common/Asset/Asset';
import ImageContainer from 'components/common/Container/ImageContainer';
import {Link, Script} from 'gatsby';
import {GatsbyImage, getImage, type ImageDataLike} from 'gatsby-plugin-image';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import slugify from 'slugify';
import type {BackgroundType, ISection} from 'types/section';
import {getLink} from 'utils/getLink';
import {marked} from 'marked';
import {isVideoContent} from 'utils/isVideoContent';
import {handleSpacing} from 'utils/handleSpacing';
import {isProduction} from 'utils/isProduction';
import ContactForm from 'components/ContactPageForm/ContactForm';
import {useViewportSize} from '@mantine/hooks';
import PageContext from 'contexts/PageContext';
import {CONTACT_PAGE} from 'constants/page';
import HubspotForm from 'components/common/HubspotForm/HubspotForm';
import {parseScript} from 'utils/parseScript';

const useStyles = createStyles(
	(
		theme,
		{
			isContact,
			isEmbedFormTemplate,
			index,
			isEmbedFormSection,
		}: {isContact: boolean; isEmbedFormTemplate: boolean; index: number; isEmbedFormSection: boolean},
	) => ({
		title: {
			maxWidth: isEmbedFormTemplate ? (index === 0 ? 500 : '100%') : '100%',
			...(isEmbedFormTemplate && {fontSize: index === 0 ? 52 : 40}),

			[theme.fn.smallerThan('lg')]: {
				maxWidth: '100%',
			},
		},

		portal: {
			[theme.fn.smallerThan('md')]: {
				display: isEmbedFormSection ? 'none' : undefined,
			},
		},

		body: {
			p: {
				marginTop: 0,
			},
			maxWidth: '100%',

			[theme.fn.smallerThan('md')]: {
				...(isEmbedFormSection && {paddingLeft: 0, paddingRight: 0}),
			},

			[theme.fn.smallerThan('sm')]: {
				...(isEmbedFormSection && {paddingLeft: 16, paddingRight: 16}),
			},

			[theme.fn.smallerThan('lg')]: {
				maxWidth: '100%',
			},
		},

		formWrapper: {
			padding: '44px 32px',
			background: '#F4F4F4',

			[theme.fn.smallerThan('sm')]: {
				padding: '44px 38px',
			},
		},

		container: {
			padding: '0 100px',
			[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
				padding: '0 16px',
			},

			[theme.fn.smallerThan('md')]: {
				...(isContact && {marginBottom: 42}),
			},
		},

		section: {
			[`@media (max-width: ${theme.breakpoints.md}px)`]: {
				display: 'none',
			},
		},

		largeSection: {
			[`@media (max-width: ${theme.breakpoints.md}px)`]: {
				display: 'none',
			},
		},

		listItem: {
			fontSize: 18,
			lineHeight: 27,
			marginTop: 14,
			color: theme.colors.primary[0],
		},

		contactSubheader: {
			a: {
				color: '#00827E',
				textDecoration: 'none',
			},
		},

		textGridColumn: {
			[theme.fn.smallerThan('md')]: {
				...(isEmbedFormSection && {paddingBottom: 8}),
			},
		},

		heroGridColumn: {
			[theme.fn.smallerThan('md')]: {
				...(isEmbedFormSection && {paddingLeft: 32, paddingRight: 20}),
			},
			[theme.fn.smallerThan('sm')]: {
				...(isEmbedFormSection && {paddingLeft: 16, paddingRight: 16}),
			},
		},
	}),
);

type BasicSectionProps = {
	section: ISection;
	index: number;
	isEmbedFormTemplate: boolean;
};

/**
 * BasicSection is a Component which has 2 columns; A RichText column and a ImageContainer column
 * @param props : {section, index}
 * @returns BasicSection Component which contains a text column and a image container column
 */
// eslint-disable-next-line complexity
const BasicSection: React.FC<BasicSectionProps> = ({section, index, isEmbedFormTemplate}) => {
	const HERO_SECTION_INDEX = 0; // Hero section index is always 0
	const NUMBER_OF_COLUMNS = 2; // Basic section will always have 2 columns
	const ORDER_FIRST = 1;
	const ORDER_SECOND = 2;
	const HEADING_FIRST = 1;
	const HEADING_SECOND = 2;
	const context = React.useContext(PageContext);

	const {classes, theme} = useStyles({
		isContact: context.title === CONTACT_PAGE,
		isEmbedFormTemplate,
		index,
		isEmbedFormSection: Boolean(section.embedForm),
	});

	const {link, isExternal} = getLink(section);

	const richTextImages: Record<string, any> = {};

	// eslint-disable-next-line array-callback-return
	section.body.references.map((reference: any) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		richTextImages[reference.contentful_id] = {image: reference.gatsbyImageData, alt: reference.title};
	});

	const options = {
		renderNode: {
			[BLOCKS.EMBEDDED_ASSET](node) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const imageData = richTextImages[node.data.target.sys.id];
				const image = getImage(imageData.image as ImageDataLike);
				return (
					<GatsbyImage
						style={{marginBottom: `${handleSpacing(theme, theme.spacing.md)}px`}}
						image={image!}
						alt={''}
					/>
				);
			},
			[BLOCKS.PARAGRAPH](node, children) {
				return <Text>{children}</Text>;
			},
			[BLOCKS.UL_LIST](node, children) {
				return (
					<List type='unordered' mb={20} pl={8}>
						{children}
					</List>
				);
			},
			[BLOCKS.OL_LIST](node, children) {
				return (
					<List type='ordered' mb={20} pl={8}>
						{children}
					</List>
				);
			},
			[BLOCKS.LIST_ITEM](node, children) {
				return (
					<List.Item>
						<Text className={classes.listItem}>{children}</Text>
					</List.Item>
				);
			},
			[INLINES.HYPERLINK](node, children) {
				return (
					<Anchor href={node.data.uri as string} target='_blank'>
						{children}
					</Anchor>
				);
			},
		},
	};

	const heroRef = React.useRef(null);

	// Determine if the index is an even column
	const isEvenColumn = index % NUMBER_OF_COLUMNS === 0;
	let textColumnOrder = isEvenColumn ? ORDER_FIRST : ORDER_SECOND;
	let imageColumnOrder = isEvenColumn ? ORDER_SECOND : ORDER_FIRST;

	if (!section.automaticOrder) {
		textColumnOrder = ORDER_FIRST;
		imageColumnOrder = ORDER_SECOND;
	}

	const isHeroSection = index === HERO_SECTION_INDEX;
	const titleOrdering = isHeroSection ? HEADING_FIRST : HEADING_SECOND;
	const ref = React.useRef();
	const {width} = useViewportSize();
	const [height, setHeight] = React.useState<number>(790);

	const isMobileView = theme.breakpoints.md > width;

	let formId = '';
	let portalId = '';

	if (section.embedForm) {
		const [formProps] = parseScript(section.embedForm);

		formId = formProps.formId;
		portalId = formProps.portalId;
	}

	React.useEffect(() => {
		if (ref.current) {
			setHeight(ref.current.clientWidth as number);
		}
	}, [ref.current, width]);

	const sectionBackground = (background: BackgroundType) => {
		switch (background) {
			case 'Grey':
				return '#f4f4f4';

			default:
				return 'transparent';
		}
	};

	return (
		<Container
			id={slugify(section.header, {lower: true, strict: true})}
			fluid
			className={classes.container}
			my={context.title === CONTACT_PAGE ? 0 : isMobileView ? 32 : isEmbedFormTemplate ? 152 : 92}
			sx={{background: sectionBackground(section.background)}}
		>
			<>
				<Grid
					gutter={isEmbedFormTemplate ? 105 : handleSpacing(theme, theme.spacing.lg)}
					align={section.isHubspotEmbed || section.embedForm ? 'flex-start' : 'center'}
				>
					{/* Text Grid Column */}
					<Grid.Col
						className={classes.textGridColumn}
						order={textColumnOrder}
						lg={section.embedForm || isEmbedFormTemplate ? 7 : 6}
						md={6}
						sm={12}
					>
						{section.isHubspotEmbed ? (
							<>
								<Title order={titleOrdering}>{section.header}</Title>
								{Boolean(section.subHeader?.subHeader.length) && context.title !== CONTACT_PAGE && (
									<Title order={3} mt={handleSpacing(theme, theme.spacing.md)}>
										{section.subHeader?.subHeader}
									</Title>
								)}
								{context.title === CONTACT_PAGE && (
									<>
										<Title order={3} mt={handleSpacing(theme, theme.spacing.md)}>
											Start a conversation
										</Title>
										{Boolean(section.subHeader?.subHeader.length) && (
											<div
												className={classes.contactSubheader}
												dangerouslySetInnerHTML={{
													__html: marked(section.subHeader!.subHeader, {
														renderer: new marked.Renderer(),
													}),
												}}
											/>
										)}
									</>
								)}
								<Divider
									size={1}
									variant='dashed'
									mt={handleSpacing(theme, theme.spacing.sm)}
									mb={handleSpacing(theme, theme.spacing.md)}
								/>
								<Box>
									<ContactForm section={section} />
								</Box>
							</>
						) : (
							<>
								<Title className={classes.title} order={titleOrdering}>
									{section.header}
								</Title>
								{Boolean(section.subHeader?.subHeader.length) && (
									<Text size={18} weight='bold' mt={handleSpacing(theme, theme.spacing.sm)}>
										{section.subHeader?.subHeader}
									</Text>
								)}
								{Boolean(section.body) && (
									<Box className={classes.portal}>
										{heroRef.current && isMobileView && section.embedForm ? (
											createPortal(
												<Text
													size={18}
													className={classes.body}
													mt={handleSpacing(theme, theme.spacing.sm)}
												>
													{renderRichText(section.body, options)}
												</Text>,
												heroRef.current,
											)
										) : (
											<Text size={18} className={classes.body} mt={handleSpacing(theme, theme.spacing.sm)}>
												{renderRichText(section.body, options)}
											</Text>
										)}
									</Box>
								)}
								{Boolean(section.buttonText?.length) && (
									<Group mt={handleSpacing(theme, theme.spacing.md)}>
										{isExternal ? (
											<Anchor href={link} target='_blank'>
												<Button style={{paddingBottom: '2px', paddingTop: '2px'}}>
													{section.buttonText}
												</Button>
											</Anchor>
										) : (
											<Link to={link}>
												<Button>{section.buttonText}</Button>
											</Link>
										)}
									</Group>
								)}
							</>
						)}
					</Grid.Col>

					{/* Hero Grid Column */}
					<Grid.Col
						className={classes.heroGridColumn}
						ref={heroRef}
						order={imageColumnOrder}
						lg={section.embedForm || isEmbedFormTemplate ? 5 : 6}
						md={6}
						sm={12}
						sx={{height: context.title === CONTACT_PAGE ? height : undefined}}
					>
						{section.embedForm ? (
							<Box className={classes.formWrapper}>
								<HubspotForm formId={formId} portalId={portalId} />
							</Box>
						) : (
							<ImageContainer
								containerRef={ref}
								fluid
								ratio={section?.youtubeVideoUrl ? 16 / 9 : undefined}
								background={
									isVideoContent(section.asset.file.contentType) || Boolean(section?.youtubeVideoUrl)
										? 'transparent'
										: undefined
								}
								expanded={context.title === CONTACT_PAGE}
								isVideo={isVideoContent(section.asset.file.contentType) || Boolean(section?.youtubeVideoUrl)}
							>
								<Asset asset={section.asset} youtubeVideoURL={section?.youtubeVideoUrl} />
							</ImageContainer>
						)}
					</Grid.Col>
				</Grid>
				{section.isHubspotEmbed
				&& section.isInsertSnippet
				&& section.codeSnippet
				&& Boolean(section.codeSnippet.codeSnippet.length)
				&& isProduction ? (
						<Script defer async>
							{section.codeSnippet.codeSnippet.trim().replace('<script>', '').replace('</script>', '')}
						</Script>
					) : null}
			</>
		</Container>
	);
};

export default React.memo(BasicSection);