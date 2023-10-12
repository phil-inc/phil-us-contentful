import {
	createStyles,
	Header,
	Container,
	Group,
	Text,
	List,
	Burger,
	useMantineTheme,
	Box,
	Anchor,
	Button,
} from '@mantine/core';
import {useClickOutside, useDisclosure, useMediaQuery, useToggle, useViewportSize} from '@mantine/hooks';
import classNames from 'classnames';
import {graphql, Link} from 'gatsby';
import React, {useState} from 'react';
import {StaticQuery} from 'gatsby';
import type {ContentfulPage} from 'types/page';
import slugify from 'slugify';
import type {TAsset} from 'types/asset';
import ImageContainer from 'components/common/Container/ImageContainer';
import Asset from 'components/common/Asset/Asset';
import CDrawer from './CDrawer';
import {type TResource} from 'types/resource';
import HeaderContext from 'contexts/HeaderProvider';
import CCollapse from './CCollapse';

export const HEADER_HEIGHT = 90;

const useStyles = createStyles((theme, {minimal}: {minimal: boolean}) => ({
	inner: {
		padding: minimal ? '0 32px' : '0 100px',
		height: HEADER_HEIGHT,
		display: 'flex',
		alignItems: 'center',
		...(minimal && {maxWidth: 1440}),

		'&::after': {
			content: '""',
			clear: 'both',
			display: 'table',
		},

		[theme.fn.smallerThan('sm')]: {
			padding: minimal ? '0 32px' : '0 16px',
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
		zIndex: 2,
		opacity: 1,
		width: '100%',
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
		marginRight: 'calc(1.313rem + 1.2vw)',
		cursor: 'pointer',
		textDecoration: 'none',

		'&:last-child': {
			marginRight: '0px',
		},

		[theme.fn.smallerThan('xl')]: {
			marginRight: 'calc(1.313rem)',
		},
	},

	buttons: {
		marginRight: '0px !important',
	},

	patientLoginButtonMobile: {
		'&:hover': {
			backgroundColor: theme.colors.philBranding[9],
			color: 'white',
		},

		[theme.fn.largerThan('md')]: {
			display: 'none',
		},
	},

	logo: {
		maxWidth: 125,
		maxHeight: 90,

		width: '100%',

		[theme.fn.smallerThan('md')]: {
			width: 100,
			marginRight: 25,
		},
	},

	hideOnLarge: {
		[theme.fn.largerThan('md')]: {
			display: 'none',
		},
	},
	textDecorationNone: {
		textDecoration: 'none',
		textDecorationLine: 'none',
	},
}));

export type ContentfulButton = {
	buttonText: string;
	buttonStyle: string;
	externalLink: string;
	internalLink: ContentfulPage;
};

type CHeaderProps = {
	allContentfulHeader: {nodes: Array<{logo: TAsset; navigationLinks: ContentfulPage[]; buttons: ContentfulButton[]}>};
	allContentfulResource: {nodes: Array<Pick<TResource, 'id' | 'heading' | 'relatesTo'>>};
	sitePage: {id: string; pageContext: {title: string; displayTitle: string}};
	minimal: boolean;
	headerTargetBlank: boolean;
};

const Navbar: React.FC<CHeaderProps> = ({
	allContentfulHeader,
	allContentfulResource,
	sitePage,
	minimal,
	headerTargetBlank,
}) => {
	const [header] = allContentfulHeader.nodes;
	const {navigationLinks: pages, buttons} = header;

	const {width} = useViewportSize();
	const {classes} = useStyles({minimal});

	const [navRef, setNavRef] = React.useState<HTMLUListElement>();
	const [collapseRef, setCollapseRef] = React.useState<HTMLDivElement>();

	const [opened, {toggle, open, close}] = useDisclosure(false, {
		onClose() {
			setTarget('');
		},
	});

	const [isDrawer, toggleDrawer] = useToggle();

	const theme = useMantineTheme();
	const isBreak = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

	const [target, setTarget] = useState<string>('');

	const [activePageLI, setActivePageLI] = useState<HTMLLIElement>();

	useClickOutside(
		() => {
			close();
		},
		null,
		[navRef!, collapseRef!],
	);

	const onNavLinkClick = event => {
		if (event.target.textContent === target) {
			toggle();
		} else {
			open();
			setTarget(event.target.textContent as string);
		}
	};

	function moveIntidatorActiveTo(li: HTMLLIElement) {
		if (li.dataset.noindicator === 'true') {
			return;
		}

		const INDICATOR_SIZE = 20;
		const INITIAL_OFFSET = 25;
		const indicator: HTMLElement = document.querySelector(`.${classes.indicator}`)!;

		li.classList.add('active');

		indicator.style.transform = `translate(calc(${
			li.offsetLeft - INITIAL_OFFSET - INDICATOR_SIZE + li.clientWidth / 2
		}px), calc(${-INDICATOR_SIZE}px))`;
	}

	React.useEffect(() => {
		if (!minimal) {
			const navBar = document.querySelector('.navbar')!;
			const allLi = navBar.querySelectorAll('li');

			const clickHandlers: Array<(e: MouseEvent) => void> = [];

			allLi.forEach(li => {
				if (li.dataset.noindicator === 'true') {
					return;
				}

				const titleToMatch = li.innerText.trim();
				const [currentPage] = pages.filter(page => page.title === titleToMatch);

				// Initial set active
				if (
					location.pathname === '/'
						? false
						: location.pathname.includes(`/${slugify(currentPage.title, {lower: true, strict: true})}`)
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
		}
	}, []);

	React.useEffect(() => {
		if (!minimal) {
			const navBar = document.querySelector('.navbar')!;
			const active = navBar.querySelector('.active');

			if (Boolean(!opened) && Boolean(activePageLI)) {
				if (activePageLI!.dataset.noindicator === 'true') {
					return;
				}

				if (active) {
					active.classList.remove('active');
				}

				moveIntidatorActiveTo(activePageLI!);
			} else if (Boolean(!opened) && Boolean(!activePageLI)) {
				const active = navBar.querySelector('.active');
				if (active) {
					active.classList.remove('active');
				}

				const indicator: HTMLElement = document.querySelector(`.${classes.indicator}`)!;
				indicator.style.transform = '';
			}
		}
	}, [opened, activePageLI]);

	React.useEffect(() => {
		if (!minimal) {
			const navBar = document.querySelector('.navbar')!;
			const active: HTMLLIElement = navBar.querySelector('.active')!;

			if (active) {
				moveIntidatorActiveTo(active);
			}
		}
	}, [width]);

	console.log({allContentfulHeader});

	const buttonConfig = {
		primary: {variant: 'outline', size: 'md', uppercase: true},
		secondary: {variant: 'default', size: 'md', uppercase: true},
	};

	return (
		<Header height={HEADER_HEIGHT} sx={{borderBottom: 0}} mb={minimal ? 0 : isBreak ? 0 : 36}>
			<Container className={classes.inner} fluid>
				<Group position='apart' noWrap align='center' className={classNames(classes.navbar, 'navbar')}>
					{!minimal && (
						<Anchor href='https://my.phil.us' target='_blank' className={classes.hideOnLarge}>
							<Button
								size='sm'
								uppercase
								variant='outline'
								px={4}
								color='philBranding'
								className={classes.patientLoginButtonMobile}
							>
								Patient Login
							</Button>
						</Anchor>
					)}

					<Box className={classes.logo}>
						{headerTargetBlank ? (
							<Anchor href='https://phil.us' target='_blank'>
								<ImageContainer ratio={125 / 90} contain fluid background='transparent'>
									<Asset asset={header.logo} />
								</ImageContainer>
							</Anchor>
						) : (
							<Link to='/'>
								<ImageContainer ratio={125 / 90} contain fluid background='transparent'>
									<Asset asset={header.logo} />
								</ImageContainer>
							</Link>
						)}
					</Box>
					{!minimal && (
						<>
							<Burger
								name='BurgerButton'
								opened={isDrawer}
								onClick={() => {
									toggleDrawer();
								}}
								className={classes.burger}
							/>
							<List ref={setNavRef} className={classes.navLinksWrapper}>
								<div className={classes.indicator}></div>
								{pages
									.filter(page => page.title !== 'Home')
									.map(page => (
										<List.Item
											key={page.id + 'mapHeaderPages'}
											className={classes.navLink}
											onClick={onNavLinkClick}
										>
											<Text style={{whiteSpace: 'nowrap'}}>{page.title}</Text>
										</List.Item>
									))}
								{buttons.map((button, index) => (
									<List.Item data-noindicator='true' className={classes.buttons}>
										{button.internalLink ? (
											<Box ml={index && 16}>
												<Link className={classes.textDecorationNone} to={button.internalLink.slug}>
													<Button
														size={
															button.buttonStyle === 'primary'
																? buttonConfig.primary.size
																: buttonConfig.secondary.size
														}
														uppercase={
															button.buttonStyle === 'primary'
																? buttonConfig.primary.uppercase
																: buttonConfig.secondary.uppercase
														}
														variant={
															button.buttonStyle === 'primary'
																? buttonConfig.primary.variant
																: buttonConfig.secondary.variant
														}
													>
														{button.buttonText}
													</Button>
												</Link>
											</Box>
										) : (
											<Anchor
												className={classes.textDecorationNone}
												sx={{textDecoration: 'none', textDecorationLine: 'none'}}
												ml={index && 16}
												href={button.externalLink}
												target='_blank'
											>
												<Button size='md' uppercase variant='outline'>
													{button.buttonText}
												</Button>
											</Anchor>
										)}
									</List.Item>
								))}
							</List>
						</>
					)}
				</Group>
				{!minimal && (
					<HeaderContext.Provider
						value={{
							minimal,
							allContentfulResource,
							header,
							isDrawer,
							pages,
							toggleDrawer,
							opened,
							setCollapseRef,
							target,
							close,
							buttons,
						}}
					>
						{isBreak ? <CDrawer /> : <CCollapse />}
					</HeaderContext.Provider>
				)}
			</Container>
		</Header>
	);
};

const query = graphql`
	query {
		allContentfulHeader(filter: {node_locale: {eq: "en-US"}}) {
			nodes {
				id
				title
				navigationLinks {
					slug
					id
					title
					displayTitle
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
							hideNavigationAnchor
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
					title
					file {
						contentType
						details {
							size
						}
						url
					}
				}
				buttons {
					id
					buttonText
					buttonStyle
					externalLink
					internalLink {
						... on ContentfulPage {
							slug
							id
							title
						}
					}
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

const CHeader: React.FC<{minimal: boolean; headerTargetBlank?: boolean}> = ({minimal, headerTargetBlank}) => (
	<StaticQuery
		query={query}
		render={props => <Navbar minimal={minimal} headerTargetBlank={headerTargetBlank} {...props} />}
	/>
);

export default CHeader;
