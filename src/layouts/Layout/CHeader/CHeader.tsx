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
	ScrollArea,
} from '@mantine/core';
import {useClickOutside, useDisclosure, useMediaQuery, useToggle, useViewportSize} from '@mantine/hooks';
import classNames from 'classnames';
import {graphql, Link} from 'gatsby';
import {GatsbyImage, getImage, StaticImage} from 'gatsby-plugin-image';
import React, {useState} from 'react';
import {StaticQuery} from 'gatsby';
import {useDocumentTitle} from '@mantine/hooks';
import type {ContentfulPage} from 'types/page';
import slugify from 'slugify';
import {navigateToPage} from 'utils/navigateToPage';
import type {TAsset} from 'types/asset';
import {IconChevronDown} from '@tabler/icons';

const HEADER_HEIGHT = 90;

type CHeaderProps = {
	allContentfulHeader: {nodes: Array<{logo: TAsset; navigationLinks: ContentfulPage[]}>};
	allContentfulResource: {nodes: Array<{id: string; heading: string; relatesTo: {id: string; header: string}}>};
	sitePage: {id: string; pageContext: {title: string}};
};

const Navbar: React.FC<CHeaderProps> = ({allContentfulHeader, allContentfulResource, sitePage}) => {
	const useStyles = createStyles((theme, _params, getRef) => ({
		inner: {
			padding: '0 116px',
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

		active: {
			'&::before': {
				content: '""',
				position: 'absolute',
				bottom: '15px',
				left: '25px',
				width: '0px',
				height: '0px',
				borderLeft: '20px solid transparent',
				borderRight: '20px solid transparent',
				borderBottom: '20px solid #00827e',
			},
		},

		sectionHeader: {
			textDecoration: 'none',
			color: '#00201F',
			fontSize: '14px',
			lineHeight: '40px',
		},
		textDecorationNone: {
			textDecoration: 'none',
			color: 'inherit',
		},
	}));

	const [header] = allContentfulHeader.nodes;
	const pages = header.navigationLinks;
	const pathToImage = getImage(header.logo);

	const {classes} = useStyles();

	const [opened, {toggle, open, close}] = useDisclosure(false, {
		onClose() {
			setTarget('');
		},
	});

	const [isDrawer, toggleDrawer] = useToggle();
	const {width} = useViewportSize();

	const theme = useMantineTheme();
	const isBreak = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

	const [target, setTarget] = useState<string>('');

	const [collapseRef, setCollapseRef] = useState<HTMLElement>();
	const [listRef, setListRef] = useState<HTMLElement>();
	const [activePageLI, setActivePageLI] = useState<HTMLLIElement | undefined>();
	useClickOutside(
		() => {
			close();
		},
		null,
		[collapseRef, listRef],
	);

	const onNavLinkClick = event => {
		if (event.target.textContent === target) {
			toggle();
		} else {
			open();
			setTarget(event.target.textContent);
		}
	};

	function moveIntidatorActiveTo(li: HTMLLIElement) {
		const INDICATOR_SIZE = 20;
		const INITIAL_OFFSET = 25;
		const indicator: HTMLElement = document.querySelector(`.${classes.indicator}`);

		li.classList.add('active');

		indicator.style.transform = `translate(calc(${
			li.offsetLeft - INITIAL_OFFSET - INDICATOR_SIZE + li.clientWidth / 2
		}px), calc(${-20}px))`;
	}

	React.useEffect(() => {
		const navBar = document.querySelector('.navbar');
		const allLi = navBar.querySelectorAll('li');

		const clickHandlers = [];

		allLi.forEach(li => {
			// Initial set active
			if (
				location.pathname === '/'
					? false
					: location.pathname.includes(`/${slugify(li.innerText, {lower: true, strict: true})}`)
			) {
				setActivePageLI(li);
				li.classList.add('active');
				moveIntidatorActiveTo(li);
			}

			const clickEventHandler = (e: MouseEvent) => {
				e.preventDefault(); // Preventing from submitting
				const active = navBar.querySelector('.active');
				if (active) {
					active.classList.remove('active');
				}

				moveIntidatorActiveTo(li);
			};

			clickHandlers.push(clickEventHandler);

			li.addEventListener('click', clickEventHandler);
		});

		return () => {
			allLi.forEach((li, index) => {
				li.removeEventListener('click', clickHandlers[index]);
			});
		};
	}, []);

	React.useEffect(() => {
		const navBar = document.querySelector('.navbar');
		const active = navBar.querySelector('.active');

		if (Boolean(!opened) && Boolean(activePageLI)) {
			if (active) {
				active.classList.remove('active');
			}

			moveIntidatorActiveTo(activePageLI);
		} else if (Boolean(!opened) && Boolean(!activePageLI)) {
			const active = navBar.querySelector('.active');
			if (active) {
				active.classList.remove('active');
			}

			const indicator: HTMLElement = document.querySelector(`.${classes.indicator}`);
			indicator.style.transform = '';
		}
	}, [opened, activePageLI]);

	React.useEffect(() => {
		const navBar = document.querySelector('.navbar');
		const active: HTMLLIElement = navBar.querySelector('.active');

		if (active) {
			moveIntidatorActiveTo(active);
		}
	}, [width]);

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
					<List ref={setListRef} className={classes.navLinksWrapper}>
						<div className={classes.indicator}></div>
						{pages
							.filter(page => page.title !== 'Home')
							.map(page => (
								<List.Item
									key={page.id + page.title}
									className={classNames(classes.navLink)}
									onClick={onNavLinkClick}
								>
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
						<ScrollArea style={{height: 'calc(100vh - 100px)'}}>
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
													.filter(section => Boolean(section.header?.length && !section.isHidden))
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
																				<Text
																					size={16}
																					weight={400}
																					color={theme.colors.primary[0]}
																				>
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
																				<Text
																					size={16}
																					weight={400}
																					color={theme.colors.primary[0]}
																				>
																					{section.header}
																				</Text>
																			</Link>
																		</th>
																	)}
																</tr>
															</thead>
															<tbody>
																{allContentfulResource.nodes
																	.filter(resource => resource.relatesTo)
																	.map(
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
																					<Text
																						size={14}
																						weight={400}
																						color={theme.colors.primary[0]}
																						mt={24}
																					>
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
						</ScrollArea>
					</Drawer>
				) : (
					<Collapse
						in={opened}
						className={classes.collapse}
						transitionDuration={150}
						transitionTimingFunction='ease-out'
						animateOpacity={false}
						ref={setCollapseRef}
					>
						<Container className={classes.container} fluid>
							<List listStyleType='none' size='xl' styles={{itemWrapper: {width: '100%'}}}>
								<Grid px={98} py={78} columns={100}>
									{pages
										.filter(page => page.title === target)
										.map(page =>
											page.sections
												.filter(section => Boolean(section.header?.length && !section.isHidden))
												.map((section, index, array) => (
													<Grid.Col span={Math.floor(100 / array.length)}>
														<List.Item key={index} onClick={close}>
															{index > 0 ? (
																<Text className={classes.listHeading}>
																	<Link
																		to={`/${slugify(page.title, {
																			lower: true,
																			strict: true,
																		})}/#${slugify(section.header, {
																			lower: true,
																			strict: true,
																		})}`}
																		className={classes.textDecorationNone}
																	>
																		{section.header}
																	</Link>
																</Text>
															) : (
																<Text className={classes.listHeading}>
																	<Link
																		to={navigateToPage(
																			slugify(page.title, {lower: true, strict: true}),
																		)}
																		className={classes.textDecorationNone}
																	>
																		{section.header}
																	</Link>
																</Text>
															)}

															<Divider />
															<List listStyleType='none'>
																{allContentfulResource.nodes
																	.filter(resource => resource.relatesTo)
																	.map(
																		({id, heading, relatesTo}) =>
																			section.id === relatesTo.id && (
																				<List.Item key={id}>
																					<Text className={classes.listItems}>
																						<Link
																							to={navigateToPage(
																								`${slugify(page.title, {
																									lower: true,
																									strict: true,
																								})}/${slugify(relatesTo.header, {
																									lower: true,
																									strict: true,
																								})}/${slugify(heading, {
																									lower: true,
																									strict: true,
																								})}`,
																							)}
																							className={classes.textDecorationNone}
																						>
																							{heading}
																						</Link>
																					</Text>
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
							isHidden
						}
						... on ContentfulSection {
							id
							header
							isHidden
						}
					}
				}
				logo {
					gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
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
		sitePage {
			id
			pageContext
		}
	}
`;

export const CHeader: React.FC = () => <StaticQuery query={query} render={Navbar} />;
