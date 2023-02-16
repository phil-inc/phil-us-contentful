import React from 'react';
import {Grid, Box, Title, createStyles, Stepper, TextInput, Button, Image, Text, AspectRatio} from '@mantine/core';
import {ChannelComparisionContext} from 'contexts/ChannelComparisionContext';
import {channelComparisionCheck} from 'assets/images';
import {Link} from 'gatsby';

const useStyles = createStyles(theme => ({
	content: {
		height: '100%',
		padding: '72px 105px',
	},

	contentGrid: {
		background: '#F4F4F4',
	},

	title: {
		lineHeight: 1.2,
	},

	normalText: {
		lineHeight: '29px',
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
}));

const Done = () => {
	const {classes} = useStyles();

	const {stepper, form} = React.useContext(ChannelComparisionContext);

	return (
		<Grid.Col span='auto' className={classes.contentGrid}>
			<Box className={classes.content}>
				<Stepper
					active={stepper.step}
					iconSize={48}
					mb={90}
					color={'philBranding'}
					breakpoint='sm'
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

				<Image width={124} height={124} src={channelComparisionCheck as string} alt='Check icon' mb={44} />

				<Title className={classes.title} order={1} size={44} mb={20}>
					Thank you!
				</Title>

				<Text className={classes.normalText} size={24} mb={64}>
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
