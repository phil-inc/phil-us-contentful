import React from 'react';
import {Grid, Box, Title, createStyles, Stepper, TextInput, Button, Image, Text} from '@mantine/core';
import {ChannelComparisionContext} from 'contexts/ChannelComparisionContext';

const useStyles = createStyles(theme => ({
	content: {
		height: '100%',
		padding: '72px 105px',

		[theme.fn.smallerThan('md')]: {
			padding: 40,
		},
	},

	title: {
		lineHeight: 1.2,
		fontSize: 44,

		[theme.fn.smallerThan('md')]: {
			fontSize: 32,
		},
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
		color: '#525252',
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

	const {stepper, form} = React.useContext(ChannelComparisionContext);

	return (
		<Grid.Col p={0} sm={6} xs={12} order={2} orderLg={1} orderMd={1} orderSm={1}>
			<Box className={classes.content}>
				<Title className={classes.title} order={1} mb={20}>
					{'Learn how you can optimize your '}
					<Text className={classes.title} component='span' color={'#00827E'}>
						patient access strategy to improve adherence and gross-to-net
					</Text>
				</Title>

				<Text className={classes.normalText} size={24} mb={64}>
					How does your brand’s channel stack up? Complete the following for a customized channel comparison report
				</Text>

				<form
					onSubmit={form.onSubmit(() => {
						stepper.nextStep();
					})}
				>
					<Title order={2} size={28} color='#0A0A0A' mb={16}>
						Where should we send the <span style={{whiteSpace: 'nowrap'}}>report?*</span>
					</Title>
					<TextInput
						classNames={{label: classes.inputLabel, required: classes.inputLabel}}
						label='Email Address*'
						type='email'
						radius={0}
						required
						withAsterisk={false}
						mb={48}
						{...form.getInputProps('email')}
					/>
					<Button type='submit'>Continue</Button>
				</form>
			</Box>
		</Grid.Col>
	);
};

export default EmailCollection;
