import {
	createStyles,
	Header,
	Container,
	Group,
	Collapse,
	Text,
	SimpleGrid,
	Divider,
	List,
	Burger,
	useMantineTheme,
	Drawer,
	Box,
	Accordion,
	Table,
	Grid,
} from '@mantine/core';
import {useDisclosure, useMediaQuery, useToggle} from '@mantine/hooks';
import classNames from 'classnames';
import {graphql, Link} from 'gatsby';
import {GatsbyImage, getImage, StaticImage} from 'gatsby-plugin-image';
import React, {useState} from 'react';
import {StaticQuery} from 'gatsby';

import type {ContentfulPage} from 'types/page';
import slugify from 'slugify';
import {navigateToPage} from 'utils/navigateToPage';
import type {TAsset} from 'types/asset';
import {IconChevronDown} from '@tabler/icons';

const HEADER_HEIGHT = 90;

type CHeaderProps = {
	allContentfulHeader: {nodes: Array<{logo: TAsset; navigationLinks: ContentfulPage[]}>};
	allContentfulResource: {nodes: Array<{id: string; heading: string; relatesTo: {id: string; header: string}}>};
};

const Navbar: React.FC<CHeaderProps> = ({allContentfulHeader, allContentfulResource}) => {
	const useStyles = createStyles((theme, _params, getRef) => ({
		inner: {
			padding: '0 100px',
			height: HEADER_HEIGHT,
			display: 'flex',
			alignItems: 'center',

			[theme.fn.smallerThan('sm')]: {
				padding: '0 16px',
			},
		},

		burger: {
			[theme.fn.largerThan('md')]: {
				display: 'none !important',
			},
		},

		collapse: {
			position: 'absolute',
			top: 90,
			left: 0,
			zIndex: 300,
			opacity: 1,
		},

		container: {
			width: '100vw',
			background: '#00827E',
			marginTop: 8,
		},

		navbar: {
			position: 'relative',
			height: '90px',
			width: '100vw',
			background: '#fff',
			display: 'flex',
			alignItems: 'center',
			overflow: 'hidden',

			ul: {
				position: 'relative',
				display: 'flex',

				li: {
					position: 'relative',
					listStyleType: 'none',
					height: '120px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					textDecoration: 'none',
				},
			},
		},

		indicator: {
			position: 'absolute',
			bottom: '-5px',
			left: '25px',
			width: '0px',
			height: '0px',
			borderLeft: '20px solid transparent',
			borderRight: '20px solid transparent',
			borderBottom: '20px solid #00827e',
			transition: 'transform 0.5s',
		},

		navLinksWrapper: {
			[theme.fn.smallerThan('md')]: {
				display: 'none !important',
			},
		},

		navLink: {
			position: 'relative',
			marginRight: '5.313rem',
			cursor: 'pointer',
			textDecoration: 'none',

			'&:last-child': {
				marginRight: '0px',
			},
		},

		listHeading: {
			color: 'white',
			fontSize: '16px',
			letterSpacing: '0.4px',
			lineHeight: '27px',
			marginBottom: '11px',
			fontFamily: 'Lato',
			fontWeight: 700,
			textDecoration: 'none',
		},
		listItems: {
			color: 'white',
			fontSize: '12px',
			letterSpacing: 0,
			lineHeight: '35px',
			margin: '8px 0',
			fontFamily: 'Lato',
			fontWeight: 400,
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

		accordionControl: {
			paddingLeft: 0,
			paddingRight: 0,
		},

		accordionContent: {
			paddingLeft: 0,
			paddingRight: 0,
		},
	}));

	const [header] = allContentfulHeader.nodes;
	const pages = header.navigationLinks;
	const pathToImage = getImage(header.logo);

	const {classes} = useStyles();

	const [opened, {toggle, open}] = useDisclosure(false, {
		onClose() {
			setTarget('');
		},
	});

	const [isDrawer, toggleDrawer] = useToggle();
	const theme = useMantineTheme();
	const isBreak = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

	const [target, setTarget] = useState<string>('');

	const onNavLinkClick = event => {
		if (event.target.textContent === target) {
			toggle();
		} else {
			open();
			setTarget(event.target.textContent);
		}
	};

	React.useEffect(() => {
		const navBar = document.querySelector('.navbar');
		const allLi = navBar.querySelectorAll('li');
		const INDICATOR_SIZE = 20;
		const INITIAL_OFFSET = 25;

		let previousEl;

		allLi.forEach((li, index) => {
			li.addEventListener('click', e => {
				e.preventDefault(); // Preventing from submitting
				const indicator: HTMLElement = document.querySelector(`.${classes.indicator}`);
				if (previousEl === li && navBar.querySelector('.active')) {
					navBar.querySelector('.active').classList.remove('active');
					indicator.style.transform = '';
				} else {
					previousEl = li;
					if (navBar.querySelector('.active')) {
						navBar.querySelector('.active').classList.remove('active');
					}

					li.classList.add('active');

					indicator.style.transform = `translate(calc(${
						li.offsetLeft - INITIAL_OFFSET - INDICATOR_SIZE + li.clientWidth / 2
					}px), calc(${-20}px))`;
				}
			});
		});

		// // TODO: cleanup for dev purpose only, to be removed on prod
		// return () => {
		// 	allLi.forEach(li => {
		// 		li.removeEventListener('click');
		// 	});
		// };
	}, []);

	return (
		<Header height={HEADER_HEIGHT} sx={{borderBottom: 0}} mb={70}>
			<Container className={classes.inner} fluid>
				<Group position='apart' noWrap align='center' className={classNames(classes.navbar, 'navbar')}>
					<Link to='/'>
						<Container m={0} p={0} size={125} style={{minWidth: 125}}>
							<GatsbyImage image={pathToImage} alt='logo' />
						</Container>
					</Link>
					<Burger
						opened={isDrawer}
						onClick={() => {
							toggleDrawer();
						}}
						className={classes.burger}
					/>
					<List className={classes.navLinksWrapper}>
						<div className={classes.indicator}></div>
						{pages
							.filter(page => page.title !== 'Home')
							.map(page => (
								<List.Item key={page.id + page.title} className={classes.navLink} onClick={onNavLinkClick}>
									<Text style={{whiteSpace: 'nowrap'}}>{page.title}</Text>
								</List.Item>
							))}
					</List>
				</Group>
				{isBreak ? (
					<Drawer
						className={classes.drawer}
						classNames={{title: classes.drawerTitle}}
						opened={isDrawer}
						onClose={() => {
							toggleDrawer(false);
						}}
						withCloseButton={false}
						title={
							<Group position='apart' noWrap align='center'>
								<Box>
									<Link to='/'>
										<Container m={0} p={0} size={125}>
											<GatsbyImage image={pathToImage} alt='logo' />
										</Container>
									</Link>
								</Box>
								<Burger
									opened={true}
									onClick={() => {
										toggleDrawer();
									}}
									className={classes.burger}
								/>
							</Group>
						}
						padding='xl'
						size='full'
						transition='fade'
					>
						<Accordion
							classNames={{control: classes.accordionControl, content: classes.accordionContent}}
							chevron={<IconChevronDown size={24} />}
						>
							{pages
								.filter(page => page.title !== 'Home')
								.map(page => (
									<Accordion.Item key={page.id + page.title} value={page.title}>
										<Accordion.Control>
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
																{index > 0 ? (
																	<th style={{paddingLeft: 0, paddingRight: 0}}>
																		<Link
																			to={`/${slugify(page.title, {
																				lower: true,
																				strict: true,
																			})}/#${slugify(section.header, {
																				lower: true,
																				strict: true,
																			})}`}
																			style={{textDecoration: 'none'}}
																		>
																			<Text size={16} color='dark'>
																				{section.header}
																			</Text>
																		</Link>
																	</th>
																) : (
																	<th style={{paddingLeft: 0, paddingRight: 0}}>
																		<Link
																			to={navigateToPage(
																				slugify(page.title, {lower: true, strict: true}),
																			)}
																			style={{textDecoration: 'none'}}
																		>
																			<Text size={16} color='dark'>
																				{section.header}
																			</Text>
																		</Link>
																	</th>
																)}
															</tr>
														</thead>
														<tbody>
															{allContentfulResource.nodes.map(
																({id, heading, relatesTo}) =>
																	section.id === relatesTo.id && (
																		<Link
																			to={navigateToPage(
																				`${slugify(page.title, {lower: true})}/${slugify(
																					relatesTo.header,
																					{
																						lower: true,
																					},
																				)}/${slugify(heading, {lower: true})}`,
																			)}
																			style={{textDecoration: 'none'}}
																		>
																			<Text my={16} color='dark'>
																				{heading}
																			</Text>
																		</Link>
																	),
															)}
														</tbody>
													</Table>
												))}
										</Accordion.Panel>
									</Accordion.Item>
								))}
						</Accordion>
					</Drawer>
				) : (
					<Collapse
						in={opened}
						className={classes.collapse}
						transitionDuration={150}
						transitionTimingFunction='ease-out'
						animateOpacity={false}
					>
						<Container className={classes.container} fluid>
							<List listStyleType='none' size='xl' styles={{itemWrapper: {width: '100%'}}}>
								<Grid px={98} py={78} columns={100}>
									{pages
										.filter(page => page.title === target)
										.map(page =>
											page.sections
												.filter(section => Boolean(section.header?.length))
												.map((section, index, array) => (
													<Grid.Col span={Math.floor(100 / array.length)}>
														<List.Item key={index}>
															{index > 0 ? (
																<Link
																	to={`/${slugify(page.title, {lower: true, strict: true})}/#${slugify(
																		section.header,
																		{
																			lower: true,
																			strict: true,
																		},
																	)}`}
																	style={{textDecoration: 'none'}}
																>
																	<Text className={classes.listHeading}>{section.header}</Text>
																</Link>
															) : (
																<Link
																	to={navigateToPage(slugify(page.title, {lower: true, strict: true}))}
																	style={{textDecoration: 'none'}}
																>
																	<Text className={classes.listHeading}>{section.header}</Text>
																</Link>
															)}

															<Divider />
															<List listStyleType='none'>
																{allContentfulResource.nodes.map(
																	({id, heading, relatesTo}) =>
																		section.id === relatesTo.id && (
																			<List.Item key={id}>
																				<Link
																					to={navigateToPage(
																						`${slugify(page.title, {
																							lower: true,
																							strict: true,
																						})}/${slugify(relatesTo.header, {
																							lower: true,
																							strict: true,
																						})}/${slugify(heading, {lower: true, strict: true})}`,
																					)}
																					style={{textDecoration: 'none'}}
																				>
																					<Text className={classes.listItems}>{heading}</Text>
																				</Link>
																			</List.Item>
																		),
																)}
															</List>
														</List.Item>
													</Grid.Col>
												)),
										)}
								</Grid>
							</List>
						</Container>
					</Collapse>
				)}
			</Container>
		</Header>
	);
};

const query = graphql`
	query MyQuery {
		allContentfulHeader(filter: {node_locale: {eq: "en-US"}}) {
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
				logo {
					gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
				}
			}
		}
		allContentfulResource(filter: {relatesTo: {id: {ne: null}}, node_locale: {eq: "en-US"}}) {
			nodes {
				id
				heading
				relatesTo {
					id
					header
				}
			}
		}
	}
`;

export const CHeader: React.FC = () => <StaticQuery query={query} render={Navbar} />;
