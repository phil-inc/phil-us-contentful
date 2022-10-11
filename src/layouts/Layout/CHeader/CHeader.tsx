import {createStyles, Header, Container, Group, Collapse, Text, SimpleGrid, Divider, List} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import classNames from 'classnames';
import {graphql, Link} from 'gatsby';
import {GatsbyImage, getImage, StaticImage} from 'gatsby-plugin-image';
import React, {useState} from 'react';
import {StaticQuery} from 'gatsby';

import './header.css';
import type {ContentfulPage} from 'types/page';
import slugify from 'slugify';
import {navigateToPage} from 'utils/navigateToPage';
import type {Asset} from 'types/asset';

const HEADER_HEIGHT = 90;

const useStyles = createStyles((theme, _params, getRef) => ({
	inner: {
		padding: '0 100px',
		height: HEADER_HEIGHT,
		display: 'flex',
		alignItems: 'center',
	},

	burger: {
		[theme.fn.largerThan('sm')]: {
			display: 'none',
		},
	},

	dropdown: {
		position: 'absolute',
		top: 90,
		left: 0,
		zIndex: 300,
		opacity: 1,
	},

	container: {
		width: '100vw',
		background: '#00827E',
	},
	navLinksWrapper: {
		'&:last-child': {
			marginRight: '0px',
		},
	},
	navLink: {
		position: 'relative',
		marginRight: '85px',
		cursor: 'pointer',
		textDecoration: 'none',
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
}));

type CHeaderProps = {
	allContentfulHeader: {nodes: Array<{logo: Asset; navigationLinks: ContentfulPage[]}>};
	allContentfulResource: {nodes: Array<{id: string; heading: string; relatesTo: {id: string; header: string}}>};
};

const Navbar: React.FC<CHeaderProps> = ({allContentfulHeader, allContentfulResource}) => {
	const [header] = allContentfulHeader.nodes;
	const pages = header.navigationLinks;
	const pathToImage = getImage(header.logo);
	const {classes} = useStyles();

	const [opened, {toggle, open}] = useDisclosure(false, {
		onClose() {
			setTarget('');
		},
	});

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
				const indicator: HTMLElement = document.querySelector('.indicator');
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
				<Group position='apart' noWrap align='center' className={classNames('navbar')}>
					<Link to='/'>
						<Container m={0} p={0} size={125}>
							<GatsbyImage image={pathToImage} alt='logo' />
						</Container>
					</Link>
					<List listStyleType={'none'} className={classes.navLinksWrapper}>
						{pages
							.filter(page => page.title !== 'Home')
							.map(page => (
								<List.Item key={page.id} className={classes.navLink} onClick={onNavLinkClick}>
									<Text>{page.title}</Text>
								</List.Item>
							))}
						<List.Item className={classNames(classes.navLink)} onClick={onNavLinkClick}>
							<Text>Contact</Text>
						</List.Item>
						<div className='indicator'></div>
					</List>
				</Group>
				<Collapse
					in={opened}
					className={classes.dropdown}
					transitionDuration={150}
					transitionTimingFunction='ease-out'
					animateOpacity={false}
				>
					<Container className={classes.container} fluid>
						<List listStyleType='none' size='xl'>
							<SimpleGrid cols={5} px={98} py={78} spacing={32}>
								{pages
									.filter(page => page.title === target)
									.map(page =>
										page.sections
											.filter(section => Boolean(section.header?.length))
											.map((section, index) => (
												<List.Item key={index}>
													{index > 0 ? (
														<Link
															to={`/${slugify(page.title, {lower: true})}/#${slugify(section.header, {
																lower: true,
															})}`}
															style={{textDecoration: 'none'}}
														>
															<Text className={classes.listHeading}>{section.header}</Text>
														</Link>
													) : (
														<Link
															to={navigateToPage(slugify(page.title, {lower: true}))}
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
																				`${slugify(page.title, {lower: true})}/${slugify(
																					relatesTo.header,
																					{
																						lower: true,
																					},
																				)}/${slugify(heading, {lower: true})}`,
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
											)),
									)}
							</SimpleGrid>
						</List>
					</Container>
				</Collapse>
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
					gatsbyImageData(resizingBehavior: SCALE, placeholder: BLURRED, layout: CONSTRAINED)
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
