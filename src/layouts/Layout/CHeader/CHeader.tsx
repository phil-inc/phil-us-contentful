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
import React from 'react';

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

	const [opened, {toggle}] = useDisclosure(false);

	return (
		<Header height={HEADER_HEIGHT} sx={{borderBottom: 0}} mb={120}>
			<Container className={classes.inner} fluid>
				<div>logo here</div>
				<Group>
					<Burger opened={opened} onClick={toggle} className={classes.burger} size='sm' />
				</Group>
				<Group position='apart' noWrap align='center' className={classes.navLinks}>
					<Text className={classes.navLink} onClick={toggle}>
						Life sciences
					</Text>
					<Text onClick={toggle} className={classes.navLink}>
						Healthcare providers
					</Text>
					<Text onClick={toggle} className={classes.navLink}>
						Patients
					</Text>
					<Text onClick={toggle} className={classes.navLink}>
						Resources
					</Text>
					<Text onClick={toggle} className={classes.navLink}>
						Company
					</Text>
					<Text onClick={toggle} className={classes.navLink}>
						Contact
					</Text>
				</Group>
				<Collapse in={opened} className={classes.dropdown}>
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
