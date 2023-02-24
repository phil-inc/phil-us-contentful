import {BLOCKS} from '@contentful/rich-text-types';
import {
	Anchor,
	Box,
	Button,
	Center,
	Container,
	createStyles,
	Divider,
	Grid,
	Group,
	List,
	Loader,
	Text,
	Title,
} from '@mantine/core';
import {Location} from '@reach/router';
import Asset from 'components/common/Asset/Asset';
import ImageContainer from 'components/common/Container/ImageContainer';
import {graphql, Link, Script, useStaticQuery} from 'gatsby';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import React from 'react';
import slugify from 'slugify';
import type {ISection} from 'types/section';
import {getLink} from 'utils/getLink';
import {marked} from 'marked';
import {useHubspotForm} from '@aaronhayes/react-use-hubspot-form';
import {isVideoContent} from 'utils/isVideoContent';
import {parseScript} from 'utils/parseScript';
import {handleSpacing} from 'utils/handleSpacing';
import {isProduction} from 'utils/isProduction';
import ContactForm from 'components/ContactPageForm/ContactForm';

const useStyles = createStyles(theme => ({
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

	hubspotContactForm: {
		minHeight: 790,

		'&[data-hs-forms-root="true"]': {
			minHeight: 0,

			[theme.fn.largerThan('md')]: {
				minHeight: 790,
			},
		},
	},

	formBody: {
		[theme.fn.largerThan('md')]: {
			minHeight: 790,
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
const BasicSection: React.FC<BasicSectionProps> = ({section, index}) => {
	const HERO_SECTION_INDEX = 0; // Hero section index is always 0
	const NUMBER_OF_COLUMNS = 2; // Basic section will always have 2 columns
	const ORDER_FIRST = 1;
	const ORDER_SECOND = 2;
	const HEADING_FIRST = 1;
	const HEADING_SECOND = 2;

	const [hasRendered, setHasRendered] = React.useState<boolean>(false);
	const {classes, theme} = useStyles();
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
				const image = getImage(imageData.image);
				return (
					<GatsbyImage
						style={{marginBottom: `${handleSpacing(theme, theme.spacing.md)}px`}}
						image={image}
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

	const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
	const [isListenerAdded, setIsListenerAdded] = React.useState<boolean>(false);
	const textColumnOrder = index % NUMBER_OF_COLUMNS ? ORDER_SECOND : ORDER_FIRST;
	const imageColumnOrder = index % NUMBER_OF_COLUMNS ? ORDER_FIRST : ORDER_SECOND;

	const isHeroSection = index === HERO_SECTION_INDEX;
	const titleOrdering = isHeroSection ? HEADING_FIRST : HEADING_SECOND;

	// Create form if section has hubspot form
	if (section.isHubspotEmbed) {
		const object: any = parseScript(section.body);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const [formProps] = object;

		// Create form
		const {loaded, formCreated} = useHubspotForm({
			target: '#hubspotContactForm',
			...formProps,
		});

		// Handle loader
		if (loaded && formCreated && !hasRendered) {
			setHasRendered(true);
		}
	}

	// Scroll to top on hubspot form submit
	React.useEffect(() => {
		const parentDiv = document.getElementById('hubspotContactForm');

		if (window.location.pathname === '/contact/') {
			if (!isListenerAdded) {
				let observer: MutationObserver;

				// eslint-disable-next-line prefer-const
				observer = new MutationObserver(mutations => {
					mutations.forEach(mutation => {
						// Check if the added or removed nodes belong to a HubSpot form
						const addedNodes = Array.from(mutation.addedNodes);

						const isHubSpotFormAdded = addedNodes.some((node: Element) => {
							if (node.className) {
								return node.className.includes('hs-form') || node.id.includes('hs-form');
							}

							return false;
						});

						if (isHubSpotFormAdded) {
							// Get the form element and the submit button element
							const form = (mutation.target as Element).querySelector('form.hs-form');

							const submitButton = form?.querySelector('input[type="submit"]');
							if (submitButton) {
								submitButton.addEventListener('click', () => {
									observer.disconnect();
									setIsSubmitted(true);
									window.scrollTo({top: 0, behavior: 'smooth'});
								});
								setIsListenerAdded(true);
							}
						}
					});
				});

				// Configure the observer to watch for changes in the parent of the button you want to find
				const observerConfig = {
					childList: true,
					subtree: true,
				};

				if (parentDiv) {
					observer.observe(parentDiv.parentNode, observerConfig);
				}

				return () => {
					observer.disconnect();
				};
			}
		}
	}, [hasRendered]);

	return (
		<Location>
			{({location}) => (
				<Container
					id={slugify(section.header, {lower: true, strict: true})}
					fluid
					className={classes.container}
					my={92}
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
										{Boolean(section.subHeader?.subHeader.length) && location.pathname !== '/contact/' && (
											<Title order={3} mt={handleSpacing(theme, theme.spacing.md)}>
												{section.subHeader.subHeader}
											</Title>
										)}
										{location.pathname === '/contact/' && (
											<>
												<Title order={3} mt={handleSpacing(theme, theme.spacing.md)}>
													Start a conversation
												</Title>
												{Boolean(section.subHeader?.subHeader.length) && (
													<div
														className={classes.contactSubheader}
														dangerouslySetInnerHTML={{
															__html: marked(section.subHeader?.subHeader, {
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
										<Box className={classes.formBody}>
											<ContactForm />
											{/* {hasRendered ? (
												<div className={classes.hubspotContactForm} id='hubspotContactForm'></div>
											) : (
												<Center>
													<Loader mt={handleSpacing(theme, theme.spacing.xl)} size='lg' />
												</Center>
											)} */}
										</Box>
									</>
								) : (
									<>
										<Title order={titleOrdering}>{section.header}</Title>
										{Boolean(section.subHeader?.subHeader.length) && (
											<Text size={18} weight='bold' mt={handleSpacing(theme, theme.spacing.sm)}>
												{section.subHeader.subHeader}
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
							<Grid.Col orderMd={imageColumnOrder} orderSm={2} lg={6} md={6} sm={12}>
								<ImageContainer
									fluid
									background={isVideoContent(section.asset.file.contentType) ? 'white' : null}
									expanded={location.pathname === '/contact/'}
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
			)}
		</Location>
	);
};

export default React.memo(BasicSection);
