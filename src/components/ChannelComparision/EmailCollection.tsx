import React from 'react';
import {Grid, Box, Title, Stepper, TextInput, Button, Image, Text} from '@mantine/core';
import {ChannelComparisionContext} from 'contexts/ChannelComparisionContext';

import * as classes from './emailCollection.module.css';

const EmailCollection = () => {
	const {stepper, form} = React.useContext(ChannelComparisionContext);

	return (
		<Grid.Col p={0} span={{base: 12, sm: 6}} order={{lg: 1, md: 1, sm: 1, xs: 2, xl: 2}}>
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
