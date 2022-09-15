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
						<Text>Life sciences</Text>
						<Text>Healthcare providers</Text>
						<Text>Patients</Text>
						<Text>Resources</Text>
						<Text>Company</Text>
						<Text>Contact</Text>
						<Text>Life sciences</Text>
						<Text>Healthcare providers</Text>
						<Text>Patients</Text>
						<Text>Resources</Text>
						<Text>Company</Text>
						<Text>Contact</Text>
					</Container>
				</Collapse>
			</Container>
		</Header>
	);
};
