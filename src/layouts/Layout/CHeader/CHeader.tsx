import {
	createStyles,
	Menu,
	Center,
	Header,
	Container,
	Group,
	Button,
	Burger,
	Grid,
	Collapse,
	Paper,
	Card,
	Text,
	SimpleGrid,
	Divider,
	List,
} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {IconChevronDown} from '@tabler/icons';
import classNames from 'classnames';
import React, {useState} from 'react';

import './header.css';

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

	navLink: {
		position: 'relative',
		marginRight: '85px',

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
	links: Array<{link: string; label: string; links?: Array<{link: string; label: string}>}>;
};

export const CHeader: React.FC<CHeaderProps> = ({links}: CHeaderProps) => {
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

		// TODO: cleanup for dev purpose only, to be removed on prod
		return () => {
			allLi.forEach(li => {
				li.removeEventListener('click');
			});
		};
	}, []);

	return (
		<Header height={HEADER_HEIGHT} sx={{borderBottom: 0}} mb={120}>
			<Container className={classes.inner} fluid>
				<Group position='apart' noWrap align='start' className={classNames('navbar')}>
					<div>logo here</div>
					<List listStyleType={'none'}>
						<List.Item className={classNames(classes.navLink)} onClick={onNavLinkClick}>
							<Text>Life sciences</Text>
						</List.Item>
						<List.Item className={classNames(classes.navLink)} onClick={onNavLinkClick}>
							<Text>Healthcare providers</Text>
						</List.Item>
						<List.Item className={classNames(classes.navLink)} onClick={onNavLinkClick}>
							<Text>Patients</Text>
						</List.Item>
						<List.Item className={classNames(classes.navLink)} onClick={onNavLinkClick}>
							<Text>Resources</Text>
						</List.Item>
						<List.Item className={classNames(classes.navLink)} onClick={onNavLinkClick}>
							<Text>Company</Text>
						</List.Item>
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
								<List.Item>
									<Text className={classes.listHeading}>Patient outcomes</Text>

									<Divider />
									<List listStyleType='none'>
										<List.Item>
											<Text className={classes.listItems}>New page/section 1</Text>
										</List.Item>
										<List.Item>
											<Text className={classes.listItems}>New page/section 2</Text>
										</List.Item>
										<List.Item>
											<Text className={classes.listItems}>New page/section 3</Text>
										</List.Item>
										<List.Item>
											<Text className={classes.listItems}>New page/section 4</Text>
										</List.Item>
									</List>
								</List.Item>
								<List.Item>
									<Text className={classes.listHeading}>Flight of the script</Text>
									<Divider />
									<List listStyleType='none'>
										<List.Item>
											<Text className={classes.listItems}>New page/section 1</Text>
										</List.Item>
										<List.Item>
											<Text className={classes.listItems}>New page/section 2</Text>
										</List.Item>
										<List.Item>
											<Text className={classes.listItems}>New page/section 3</Text>
										</List.Item>
										<List.Item>
											<Text className={classes.listItems}>New page/section 4</Text>
										</List.Item>
									</List>
								</List.Item>
								<List.Item>
									<Text className={classes.listHeading}>Prescribing to Phil</Text>
									<Divider />
									<List listStyleType='none'>
										<List.Item>
											<Text className={classes.listItems}>New page/section 1</Text>
										</List.Item>
										<List.Item>
											<Text className={classes.listItems}>New page/section 2</Text>
										</List.Item>
										<List.Item>
											<Text className={classes.listItems}>New page/section 3</Text>
										</List.Item>
										<List.Item>
											<Text className={classes.listItems}>New page/section 4</Text>
										</List.Item>
									</List>
								</List.Item>
								<List.Item>
									<Text className={classes.listHeading}>HCP outcomes</Text>
									<Divider />
									<List listStyleType='none'>
										<List.Item>
											<Text className={classes.listItems}>New page/section 1</Text>
										</List.Item>
										<List.Item>
											<Text className={classes.listItems}>New page/section 2</Text>
										</List.Item>
										<List.Item>
											<Text className={classes.listItems}>New page/section 3</Text>
										</List.Item>
										<List.Item>
											<Text className={classes.listItems}>New page/section 4</Text>
										</List.Item>
									</List>
								</List.Item>
								<List.Item>
									<Text className={classes.listHeading}>Testimonials</Text>
									<Divider />
									<List listStyleType='none'>
										<List.Item>
											<Text className={classes.listItems}>New page/section 1</Text>
										</List.Item>
										<List.Item>
											<Text className={classes.listItems}>New page/section 2</Text>
										</List.Item>
										<List.Item>
											<Text className={classes.listItems}>New page/section 3</Text>
										</List.Item>
										<List.Item>
											<Text className={classes.listItems}>New page/section 4</Text>
										</List.Item>
									</List>
								</List.Item>
							</SimpleGrid>
						</List>
					</Container>
				</Collapse>
			</Container>
		</Header>
	);
};
