import {useHubspotForm} from '@aaronhayes/react-use-hubspot-form';
import {
	createStyles,
	Anchor,
	Group,
	Grid,
	Text,
	Divider,
	List,
	Container,
	Navbar,
	Button,
	TextInput,
	Box,
	Accordion,
	Burger,
	Drawer,
	Table,
	Center,
	Avatar,
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {upperFirst, useDisclosure} from '@mantine/hooks';
import {IconBrandLinkedin, IconBrandTwitter, IconChevronDown} from '@tabler/icons';
import Asset from 'components/common/Asset/Asset';
import ImageContainer from 'components/common/Container/ImageContainer';
import {graphql, Link, StaticQuery} from 'gatsby';
import {GatsbyImage} from 'gatsby-plugin-image';
import React from 'react';
import slugify from 'slugify';
import type {TAsset} from 'types/asset';
import type {ContentfulPage} from 'types/page';
import {navigateToPage} from 'utils/navigateToPage';

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
		fontSize: 14,
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

		[theme.fn.smallerThan('lg')]: {
			padding: '40px ',
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
};

const Footer: React.FC<FooterProps> = ({allContentfulFooter, allContentfulResource}) => {
	const {classes} = useStyles();
	// Create form
	const newsletterForm = useHubspotForm({
		target: '#hubspotForm',
		...{
			region: 'na1',
			portalId: '20880193',
			formId: 'af4535b2-dc53-4b71-b711-a7e546233d81',
		},
	});

	const newsletterFormMobile = useHubspotForm({
		target: '#hubspotFormMobile',
		...{
			region: 'na1',
			portalId: '20880193',
			formId: 'af4535b2-dc53-4b71-b711-a7e546233d81',
		},
	});

	const [footer] = allContentfulFooter.nodes;
	const pages = footer.navigationLinks;

	return (
		<>
			<Container fluid className={classes.footerWrapper}>
				{/* Desktop View */}
				<Grid className={classes.footer} gutter={'xl'}>
					{pages.map(page => (
						<Grid.Col key={page.id} span={3}>
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
									.map(section => (
										<>
											<List key={page.id + section.id} listStyleType='none'>
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
														<Text className={classes.footerLink}>{section.header.replace(':', '')}</Text>
													</Link>
												</List.Item>
											</List>
											{page.title === 'Contact' && (
												<Group mt={18}>
													<Anchor href='https://www.linkedin.com/company/phil-inc-' target='_blank'>
														<div>
															<img src='../images/linkedin.svg' />
														</div>
													</Anchor>
												</Group>
											)}
										</>
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
							<div id='hubspotForm'></div>
							<Grid mt={60} align={'center'} justify='center'>
								{footer.badge.map(badge => (
									<Grid.Col key={badge.title} span={6}>
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
							<Accordion.Item key={page.id + page.title} value={page.title}>
								<Accordion.Control px={0}>
									<Text weight='bold' size={18}>
										{page.title}
									</Text>
								</Accordion.Control>
								<Accordion.Panel>
									<List mb={16} listStyleType={'none'}>
										{page.sections
											.filter(section => Boolean(section.header?.length && !section.isHidden))
											.map(section => (
												<List.Item key={section.id}>
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
														<Text className={classes.footerLink}>{section.header.replace(':', '')}</Text>
													</Link>
												</List.Item>
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
						<div id='hubspotFormMobile'></div>
						<Grid mt={60} align={'center'} justify='center'>
							{footer.badge.map(badge => (
								<Grid.Col key={badge.title} span={2}>
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

export const CFooter: React.FC = () => <StaticQuery query={query} render={Footer} />;
