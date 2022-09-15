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
		justifyContent: 'space-between',
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

	navLinks: {
		// Dynamic media queries, define breakpoints in theme, use anywhere
		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			// Type safe child reference in nested selectors via ref
			[`& .${getRef('child')}`]: {
				marginRight: '0px',
			},
		},
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			// Type safe child reference in nested selectors via ref
			[`& .${getRef('child')}`]: {
				display: 'none',
			},
		},
	},
	navLink: {
		position: 'relative',
		ref: getRef('child'),
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
			setTarget('');
			toggle();
		} else {
			setTarget(event.target.textContent);
			open();
		}
	};

	return (
		<Header height={HEADER_HEIGHT} sx={{borderBottom: 0}} mb={120}>
			<Container className={classes.inner} fluid>
				<div>logo here</div>
				<Group>
					<Burger opened={opened} onClick={toggle} className={classes.burger} size='sm' />
				</Group>
				<Group position='apart' noWrap align='center' className={classNames(classes.navLinks, 'nav-links-wrapper')}>
					<Text
						className={classNames(classes.navLink, 'nav-link', {active: target === 'Life sciences'})}
						onClick={onNavLinkClick}
					>
						Life sciences
					</Text>
					<Text
						onClick={onNavLinkClick}
						className={classNames(classes.navLink, 'nav-link', {active: target === 'Healthcare providers'})}
					>
						Healthcare providers
					</Text>
					<Text
						onClick={onNavLinkClick}
						className={classNames(classes.navLink, 'nav-link', {active: target === 'Patients'})}
					>
						Patients
					</Text>
					<Text
						onClick={onNavLinkClick}
						className={classNames(classes.navLink, 'nav-link', {active: target === 'Resources'})}
					>
						Resources
					</Text>
					<Text
						onClick={onNavLinkClick}
						className={classNames(classes.navLink, 'nav-link', {active: target === 'Company'})}
					>
						Company
					</Text>
					<Text
						onClick={onNavLinkClick}
						className={classNames(classes.navLink, 'nav-link', {active: target === 'Contact'})}
					>
						Contact
					</Text>
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
