import React from 'react';
import {Grid, Box, Title, createStyles, Stepper, TextInput, Button, Image, Text} from '@mantine/core';

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

const EmailCollection = () => {
	const {classes} = useStyles();

	const [active, setActive] = React.useState(0);

	const nextStep = () => {
		setActive(current => (current < 3 ? current + 1 : current));
	};

	const prevStep = () => {
		setActive(current => (current > 0 ? current - 1 : current));
	};

	return (
		<Grid.Col span='auto' className={classes.contentGrid}>
			<Box className={classes.content}>
				<Title className={classes.title} order={1} size={44} mb={20}>
					{'Learn how you can optimize your '}
					<Text className={classes.title} component='span' color={'#00827E'}>
						patient access strategy to improve adherence and gross-to-net
					</Text>
				</Title>

				<Text className={classes.normalText} size={24} mb={64}>
					How does your brand’s channel stack up? Complete the following for a customized channel comparison report
				</Text>

				<Stepper
					active={active}
					iconSize={48}
					allowNextStepsSelect={false}
					color={'philBranding'}
					onStepClick={setActive}
					breakpoint='sm'
					classNames={{
						step: classes.step,
						stepBody: classes.stepBody,
						separator: classes.separator,
						stepIcon: classes.stepIcon,
					}}
				>
					<Stepper.Step label='Email'>
						<TextInput
							classNames={{label: classes.inputLabel, required: classes.inputLabel}}
							label='Email Address'
							radius={0}
							withAsterisk
							mb={48}
						/>
						<Button onClick={nextStep}>Continue</Button>
					</Stepper.Step>
					<Stepper.Step label='Information'>Step 2 content: Verify email</Stepper.Step>
					<Stepper.Step label='Done'>Step 3 content: Get full access</Stepper.Step>
					<Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
				</Stepper>
			</Box>
		</Grid.Col>
	);
};

export default EmailCollection;
