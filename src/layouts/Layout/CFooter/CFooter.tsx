import React from 'react';
import {createStyles, Anchor, Group, Grid, Text, Divider, List, Container, Box, Accordion, Center} from '@mantine/core';
import {IconChevronDown} from '@tabler/icons';
import {footerBackground} from 'assets/images';
import Asset from 'components/common/Asset/Asset';
import ImageContainer from 'components/common/Container/ImageContainer';
import HubSpotNewsletter from 'components/common/HubspotForm/HubspotNewsletter';
import {graphql, Link, StaticQuery} from 'gatsby';
import {StaticImage} from 'gatsby-plugin-image';
import slugify from 'slugify';
import type {TAsset} from 'types/asset';
import type {ContentfulPage} from 'types/page';
import {CONTACT_PAGE} from 'constants/page';

const useStyles = createStyles(theme => ({
	footer: {
		[theme.fn.smallerThan('md')]: {
			display: 'none',
		},
	},

	inner: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

		[theme.fn.smallerThan('sm')]: {
			flexDirection: 'column',
		},
	},

	links: {
		color: 'white',
		fontSize: 12,
	},

	footLinkHeader: {
		fontFamily: 'Lato',
		fontWeight: 700,
		margin: '10px 0',
		textDecoration: 'none',
		color: '#00201F',
	},

	footerLink: {
		textDecoration: 'none',
		color: '#00201F',
		fontSize: '14px',
		lineHeight: '40px',
	},

	footerWrapper: {
		padding: '85px 175px',
		backgroundImage: `url("${footerBackground as string}")`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'bottom -420px right -220px',

		[theme.fn.smallerThan('lg')]: {
			padding: '40px ',
			backgroundPosition: 'bottom -522px right -561px',
		},
	},
	burger: {
		[theme.fn.largerThan('md')]: {
			display: 'none !important',
		},
	},
	drawer: {
		[theme.fn.largerThan('md')]: {
			display: 'none',
		},
	},

	drawerTitle: {
		width: '100%',
		margin: 0,
	},

	textDecorationNone: {
		textDecoration: 'none',
		color: 'white',
	},
}));

type FooterProps = {
	allContentfulFooter: {nodes: Array<{badge: TAsset[]; navigationLinks: ContentfulPage[]}>};
	allContentfulResource: {nodes: Array<{id: string; heading: string; relatesTo: {id: string; header: string}}>};
	minimal: boolean;
};

const Footer: React.FC<FooterProps> = ({allContentfulFooter, minimal}) => {
	const {classes} = useStyles();

	const [footer] = allContentfulFooter.nodes;
	const pages = footer.navigationLinks;

	return (
		<>
			{!minimal && (
				<Container fluid className={classes.footerWrapper}>
					{/* Desktop View */}
					<Grid className={classes.footer} gutter={'xl'}>
						{pages.map(page => (
							<Grid.Col key={page.id + 'mapFooterPages'} span={3}>
								<Box sx={{width: '80%'}}>
									<Link
										to={page.title === 'Home' ? '/' : `/${slugify(page.title, {lower: true, strict: true})}`}
										style={{textDecoration: 'none'}}
									>
										<Text span size={'lg'} className={classes.footLinkHeader}>
											{page.title}
										</Text>
									</Link>
									<Divider my={10} color='#6A7979' />
									{page.sections
										.filter(section => Boolean(section.header?.length && !section.isHidden))
										.map((section, index, array) => (
											<React.Fragment key={section.id + 'mapFooterSections'}>
												<List listStyleType='none'>
													<List.Item>
														<Link
															to={
																(page.title === 'Home'
																	? ''
																	: `/${slugify(page.title, {lower: true, strict: true})}`)
																+ `/#${slugify(section.header, {
																	lower: true,
																	strict: true,
																})}`
															}
															style={{textDecoration: 'none'}}
														>
															<Text className={classes.footerLink}>
																{section.header.replace(':', '')}
															</Text>
														</Link>
													</List.Item>
												</List>
												{/* Patients section mapping extra elements */}
												{page.title === 'Patients' && index === array.length - 1 && (
													<List listStyleType='none'>
														<List.Item>
															<Anchor
																href='https://my.phil.us/'
																target='_blank'
																style={{textDecoration: 'none'}}
															>
																<Text className={classes.footerLink}>Patient Log In</Text>
															</Anchor>
														</List.Item>
													</List>
												)}
												{/* Contact section mapping extra elements */}
												{page.title === 'Contact' && (
													<Group mt={18}>
														<Anchor href='https://www.linkedin.com/company/phil-inc-' target='_blank'>
															<div>
																<StaticImage
																	src='../../../assets/images/linkedin.svg'
																	alt='LinkedIn Icon'
																/>
															</div>
														</Anchor>
													</Group>
												)}
											</React.Fragment>
										))}
								</Box>
							</Grid.Col>
						))}
						<Grid.Col span={3}>
							<Box sx={{width: '80%'}}>
								<Text size={'lg'} mt={0} className={classes.footLinkHeader}>
									Newsletter
								</Text>
								<Divider my={10} color='#6A7979' />
								<HubSpotNewsletter />
								<Grid mt={60} align={'center'} justify='center'>
									{footer.badge.map(badge => (
										<Grid.Col key={badge.file.url + 'mapBadge'} span={6}>
											<Box sx={{maxWidth: 120}}>
												<ImageContainer background='transparent' fluid>
													<Asset asset={badge} />
												</ImageContainer>
											</Box>
										</Grid.Col>
									))}
								</Grid>
							</Box>
						</Grid.Col>
					</Grid>

					{/* Mobile View */}
					<Box className={classes.drawer}>
						<Accordion styles={{content: {padding: 0}}} chevron={<IconChevronDown size={24} />} mb={15}>
							{pages.map(page => (
								<Accordion.Item key={page.id + 'mapFooterPagesMobile'} value={page.title}>
									<Accordion.Control px={0}>
										<Text weight='bold' size={18}>
											{page.title}
										</Text>
									</Accordion.Control>
									<Accordion.Panel>
										<List mb={16} listStyleType={'none'}>
											{page.sections
												.filter(section => Boolean(section.header?.length && !section.isHidden))
												.map((section, index) => (
													<React.Fragment key={section.id + 'mapFooterSectionsMobile'}>
														<List.Item>
															<Link
																to={
																	(page.title === 'Home'
																		? ''
																		: `/${slugify(page.title, {lower: true, strict: true})}`)
																	+ `/#${slugify(section.header, {
																		lower: true,
																		strict: true,
																	})}`
																}
																style={{textDecoration: 'none'}}
															>
																<Text className={classes.footerLink}>
																	{section.header.replace(':', '')}
																</Text>
															</Link>
														</List.Item>

														{/* Patient login on accordian on patients page */}
														{page.title === 'Patients' && index === page.sections.length - 1 && (
															<List.Item>
																<Anchor
																	href='https://my.phil.us/'
																	target='_blank'
																	style={{textDecoration: 'none'}}
																>
																	<Text className={classes.footerLink}>Patient Log In</Text>
																</Anchor>
															</List.Item>
														)}

														{/* Socials on contact accordian on mobile */}
														{page.title === 'Contact' && index === page.sections.length - 1 && (
															<List.Item>
																<Group>
																	<Anchor
																		href='https://www.linkedin.com/company/phil-inc-'
																		target='_blank'
																	>
																		<div>
																			<StaticImage
																				src='../../../assets/images/linkedin.svg'
																				alt='LinkedIn Icon'
																			/>
																		</div>
																	</Anchor>
																</Group>
															</List.Item>
														)}
													</React.Fragment>
												))}
										</List>
									</Accordion.Panel>
								</Accordion.Item>
							))}
						</Accordion>
						<Box>
							<Text size={'lg'} className={classes.footLinkHeader}>
								Newsletter
							</Text>
							<Divider my={10} color='#6A7979' />
							<HubSpotNewsletter />
							<Grid mt={60} align={'center'} justify='center'>
								{footer.badge.map(badge => (
									<Grid.Col key={badge.file.url + 'mapBadgeMobile'} span={4}>
										<Box sx={{maxWidth: 120}}>
											<ImageContainer background='transparent' fluid>
												<Asset asset={badge} />
											</ImageContainer>
										</Box>
									</Grid.Col>
								))}
							</Grid>
						</Box>
					</Box>
				</Container>
			)}

			{/* Bottom Footer */}
			<Container fluid style={{background: '#00827E'}} py={14}>
				<Center>
					<Text className={classes.links}>
						© Phil, Inc. |{' '}
						<Link to='/terms' className={classes.textDecorationNone}>
							Terms of Use
						</Link>{' '}
						|{' '}
						<Link to='/privacy' className={classes.textDecorationNone}>
							Privacy Policy
						</Link>{' '}
						|{' '}
						<Link to='/hipaa' className={classes.textDecorationNone}>
							HIPAA Notice
						</Link>
					</Text>
				</Center>
			</Container>
		</>
	);
};

const query = graphql`
	{
		allContentfulFooter(filter: {node_locale: {eq: "en-US"}}) {
			nodes {
				id
				title
				navigationLinks {
					id
					title
					sys {
						contentType {
							sys {
								id
								type
							}
						}
					}
					sections {
						... on ContentfulReferencedSection {
							id
							header
							isHidden
						}
						... on ContentfulSection {
							id
							header
							isHidden
						}
					}
				}
				badge {
					file {
						contentType
						url
						details {
							size
						}
					}
					gatsbyImageData(resizingBehavior: FILL, placeholder: BLURRED, layout: CONSTRAINED)
				}
			}
		}
		allContentfulResource(filter: {node_locale: {eq: "en-US"}}) {
			nodes {
				id
				heading
				relatesTo {
					... on ContentfulReferencedSection {
						id
						header
						isHidden
					}
					... on ContentfulSection {
						id
						header
						isHidden
					}
				}
			}
		}
	}
`;

const CFooter: React.FC<{minimal: boolean}> = ({minimal = false}) => (
	<StaticQuery query={query} render={props => <Footer minimal={minimal} {...props} />} />
);

export default React.memo(CFooter);
