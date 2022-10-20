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
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {upperFirst, useDisclosure} from '@mantine/hooks';
import {IconChevronDown} from '@tabler/icons';
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
		[theme.fn.smallerThan('sm')]: {
			marginTop: theme.spacing.lg,
			marginBottom: theme.spacing.sm,
		},
		color: 'white',
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
		margin: '14px 0',
	},

	footerWrapper: {
		padding: '85px 14vw',

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
}));

type FooterProps = {
	allContentfulFooter: {nodes: Array<{badge: TAsset[]; navigationLinks: ContentfulPage[]}>};
	allContentfulResource: {nodes: Array<{id: string; heading: string; relatesTo: {id: string; header: string}}>};
};

const Footer: React.FC<FooterProps> = ({allContentfulFooter, allContentfulResource}) => {
	const {classes} = useStyles();
	// Create form
	const {loaded, formCreated} = useHubspotForm({
		target: '.hubspotForm',
		...{
			region: 'na1',
			portalId: '20880193',
			formId: 'af4535b2-dc53-4b71-b711-a7e546233d81',
		},
	});

	console.log({allContentfulFooter, allContentfulResource});
	const [footer] = allContentfulFooter.nodes;
	const pages = footer.navigationLinks;
	const form = useForm({
		initialValues: {
			email: '',
		},

		validate: {
			email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
		},
	});

	return (
		<>
			<Container fluid className={classes.footerWrapper}>
				<Grid className={classes.footer} gutter={'xl'}>
					{pages.map(page => (
						<Grid.Col span={3}>
							<Box sx={{width: '80%'}}>
								<Link
									to={page.title === 'Home' ? '/' : `/${slugify(page.title, {lower: true, strict: true})}`}
									style={{textDecoration: 'none'}}
								>
									<Text span key={page.id} size={'lg'} className={classes.footLinkHeader}>
										{page.title}
									</Text>
								</Link>
								<Divider my={10} color='dark' />
								{page.sections
									.filter(section => section.header?.length)
									.map(section => (
										<>
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
														<Text className={classes.footerLink}>{section.header}</Text>
													</Link>
												</List.Item>
											</List>
										</>
									))}
							</Box>
						</Grid.Col>
					))}
					<Grid.Col span={3}>
						<Box sx={{width: '80%'}}>
							<div className='hubspotForm'></div>
						</Box>
					</Grid.Col>
				</Grid>

				<Box className={classes.drawer}>
					<Accordion styles={{content: {padding: '0'}}} chevron={<IconChevronDown size={24} />} mb={40}>
						{pages.map(page => (
							<Accordion.Item
								key={page.id + page.title}
								value={page.title}
								style={{padding: 'auto 0px', borderBottom: '1px solid #6A7979'}}
							>
								<Accordion.Control px={0}>
									<Text weight='bold' size={18}>
										{page.title}
									</Text>
								</Accordion.Control>
								<Accordion.Panel>
									{page.sections
										.filter(section => Boolean(section.header?.length))
										.map((section, index) => (
											<Table key={section.id} mb={16}>
												<thead>
													<tr>
														{
															<th style={{paddingLeft: 0, paddingRight: 0, fontWeight: 400}}>
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
																	<Text size={16} color='dark'>
																		{section.header}
																	</Text>
																</Link>
															</th>
														}
													</tr>
												</thead>
											</Table>
										))}
								</Accordion.Panel>
							</Accordion.Item>
						))}
					</Accordion>
					<Box>
						<div className='hubspotForm'></div>
					</Box>
				</Box>
			</Container>
			<Container fluid style={{background: '#00827E'}} py={14}>
				<Center>
					<Text color={'#FFF'}>© Phil, Inc. | Terms of Use | Privacy Policy | HIPAA Notice</Text>
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
						}
						... on ContentfulSection {
							id
							header
						}
					}
				}
				badge {
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
					}
					... on ContentfulSection {
						id
						header
					}
				}
			}
		}
	}
`;

export const CFooter: React.FC = () => <StaticQuery query={query} render={Footer} />;
