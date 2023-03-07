import React from 'react';
import {BLOCKS} from '@contentful/rich-text-types';
import {Anchor, Box, Button, Container, createStyles, Divider, Grid, Group, List, Text, Title} from '@mantine/core';
import Asset from 'components/common/Asset/Asset';
import ImageContainer from 'components/common/Container/ImageContainer';
import {Link, Script} from 'gatsby';
import {GatsbyImage, getImage, type ImageDataLike} from 'gatsby-plugin-image';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import slugify from 'slugify';
import type {ISection} from 'types/section';
import {getLink} from 'utils/getLink';
import {marked} from 'marked';
import {isVideoContent} from 'utils/isVideoContent';
import {handleSpacing} from 'utils/handleSpacing';
import {isProduction} from 'utils/isProduction';
import ContactForm from 'components/ContactPageForm/ContactForm';
import {useViewportSize} from '@mantine/hooks';
import PageContext from 'contexts/PageContext';
import {CONTACT_PAGE} from 'constants/page';

const useStyles = createStyles((theme, {isContact}: {isContact: boolean}) => ({
	body: {
		p: {
			marginTop: 0,
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
}));

type BasicSectionProps = {
	section: ISection;
	index: number;
};

/**
 * BasicSection is a Component which has 2 columns; A RichText column and a ImageContainer column
 * @param props : {section, index}
 * @returns BasicSection Component which contains a text column and a image container column
 */
// eslint-disable-next-line complexity
const BasicSection: React.FC<BasicSectionProps> = ({section, index}) => {
	const HERO_SECTION_INDEX = 0; // Hero section index is always 0
	const NUMBER_OF_COLUMNS = 2; // Basic section will always have 2 columns
	const ORDER_FIRST = 1;
	const ORDER_SECOND = 2;
	const HEADING_FIRST = 1;
	const HEADING_SECOND = 2;
	const context = React.useContext(PageContext);

	const {classes, theme} = useStyles({isContact: context.title === CONTACT_PAGE});
	const {link, isExternal} = getLink(section);

	const richTextImages = {};

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
				return <List type='unordered'>{children}</List>;
			},
			[BLOCKS.OL_LIST](node, children) {
				return <List type='ordered'>{children}</List>;
			},
			[BLOCKS.LIST_ITEM](node, children) {
				return (
					<List.Item>
						<Text className={classes.listItem}>{children}</Text>
					</List.Item>
				);
			},
		},
	};

	const textColumnOrder = index % NUMBER_OF_COLUMNS ? ORDER_SECOND : ORDER_FIRST;
	const imageColumnOrder = index % NUMBER_OF_COLUMNS ? ORDER_FIRST : ORDER_SECOND;

	const isHeroSection = index === HERO_SECTION_INDEX;
	const titleOrdering = isHeroSection ? HEADING_FIRST : HEADING_SECOND;
	const ref = React.useRef();
	const {width} = useViewportSize();
	const [height, setHeight] = React.useState<number>(790);

	React.useEffect(() => {
		if (ref.current) {
			setHeight(ref.current.clientWidth as number);
		}
	}, [ref.current, width]);

	return (
		<Container
			id={slugify(section.header, {lower: true, strict: true})}
			fluid
			className={classes.container}
			my={context.title === CONTACT_PAGE ? 0 : 92}
		>
			<>
				<Grid
					gutter={handleSpacing(theme, theme.spacing.lg)}
					align={section.isHubspotEmbed ? 'flex-start' : 'center'}
				>
					<Grid.Col orderMd={textColumnOrder} orderSm={1} lg={6} md={6} sm={12}>
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
								<Title order={titleOrdering}>{section.header}</Title>
								{Boolean(section.subHeader?.subHeader.length) && (
									<Text size={18} weight='bold' mt={handleSpacing(theme, theme.spacing.sm)}>
										{section.subHeader?.subHeader}
									</Text>
								)}
								{Boolean(section.body) && (
									<Text size={18} className={classes.body} mt={handleSpacing(theme, theme.spacing.sm)}>
										{renderRichText(section.body, options)}
									</Text>
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
					<Grid.Col
						orderMd={imageColumnOrder}
						orderSm={2}
						lg={6}
						md={6}
						sm={12}
						sx={{height: context.title === CONTACT_PAGE ? height : undefined}}
					>
						<ImageContainer
							containerRef={ref}
							fluid
							background={isVideoContent(section.asset.file.contentType) ? 'white' : undefined}
							expanded={context.title === CONTACT_PAGE}
						>
							<Asset asset={section.asset} youtubeVideoURL={section?.youtubeVideoUrl} />
						</ImageContainer>
					</Grid.Col>
				</Grid>
				{section.isHubspotEmbed
				&& section.isInsertSnippet
				&& section.codeSnippet
				&& Boolean(section.codeSnippet.codeSnippet.length)
				&& isProduction ? (
						<Script>
							{section.codeSnippet.codeSnippet.trim().replace('<script>', '').replace('</script>', '')}
						</Script>
					) : null}
			</>
		</Container>
	);
};

export default React.memo(BasicSection);
