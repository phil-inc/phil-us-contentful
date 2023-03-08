import React from 'react';
import {Grid, Box, Title, createStyles, Stepper, TextInput, Button, Image, Text, AspectRatio} from '@mantine/core';
import {ChannelComparisionContext} from 'contexts/ChannelComparisionContext';
import {channelComparisionCheck} from 'assets/images';
import {Link} from 'gatsby';
import {useScrollIntoView} from '@mantine/hooks';

const useStyles = createStyles(theme => ({
	content: {
		height: '100%',
		padding: '72px 105px',
		[theme.fn.smallerThan('md')]: {
			padding: 40,
		},
	},

	contentGrid: {
		background: '#F4F4F4',
	},

	title: {
		lineHeight: 1.2,
		fontSize: 28,
	},

	normalText: {
		lineHeight: '29px',
		fontSize: 24,
		marginBottom: 64,

		[theme.fn.smallerThan('md')]: {
			fontSize: 18,
			marginBottom: 44,
		},
	},

	step: {
		flexDirection: 'column',
		justifyContent: 'center',
		placeItems: 'center',
	},

	stepBody: {
		margin: '0 auto',
		marginTop: 8,
	},

	stepIcon: {
		borderColor: '#9E9E9E',
		fontSize: 20,

		'&[data-progress=\'true\']': {
			background: '#00827E',
			color: '#FFFFFF',
		},
	},

	inputLabel: {
		color: '#9E9E9E',
		fontSize: 20,
	},

	separator: {
		margin: -30,
		marginTop: -50,
		backgroundColor: '#9E9E9E',
	},

	image: {
		height: 124,
		width: 124,
		marginBottom: 44,
		marginTop: 90,

		[theme.fn.smallerThan('md')]: {
			height: 80,
			width: 80,
			marginBottom: 20,
			marginTop: 44,
		},
	},
}));

const Done = () => {
	const {classes} = useStyles();
	const {scrollIntoView, targetRef} = useScrollIntoView<HTMLDivElement>();
	const {stepper} = React.useContext(ChannelComparisionContext);

	React.useEffect(() => {
		scrollIntoView({alignment: 'start'});
	}, []);

	return (
		<Grid.Col
			ref={targetRef}
			span='auto'
			className={classes.contentGrid}
			order={2}
			orderLg={1}
			orderMd={1}
			orderSm={1}
		>
			<Box className={classes.content}>
				<Stepper
					active={stepper.step}
					iconSize={48}
					color={'philBranding'}
					classNames={{
						step: classes.step,
						stepBody: classes.stepBody,
						separator: classes.separator,
						stepIcon: classes.stepIcon,
					}}
				>
					<Stepper.Step label='Email' allowStepClick={false} allowStepSelect={false}></Stepper.Step>
					<Stepper.Step label='Information' allowStepClick={false} allowStepSelect={false}></Stepper.Step>
					<Stepper.Step label='Done' allowStepClick={false} allowStepSelect={false}></Stepper.Step>
				</Stepper>

				<AspectRatio ratio={1} className={classes.image}>
					<Image src={channelComparisionCheck as string} alt='Check icon' />
				</AspectRatio>

				<Title className={classes.title} order={1} mb={20}>
					Thank you!
				</Title>

				<Text className={classes.normalText}>
					We’ve got all your details and we will be sending your reports soon on your email address.
				</Text>
				<Link to='/resources/'>
					<Button>Patient Access Resources</Button>
				</Link>
			</Box>
		</Grid.Col>
	);
};

export default Done;
