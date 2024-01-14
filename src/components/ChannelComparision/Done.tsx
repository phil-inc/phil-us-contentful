import React from 'react';
import {Grid, Box, Title, Stepper, TextInput, Button, Image, Text, AspectRatio} from '@mantine/core';
import {ChannelComparisionContext} from 'contexts/ChannelComparisionContext';
import {channelComparisionCheck} from 'assets/images';
import {Link} from 'gatsby';
import {useScrollIntoView} from '@mantine/hooks';

import * as classes from './done.module.css';

const Done = () => {
	const {scrollIntoView, targetRef} = useScrollIntoView<HTMLDivElement>();
	const {stepper} = React.useContext(ChannelComparisionContext);

	React.useEffect(() => {
		scrollIntoView({alignment: 'start'});
	}, []);

	return (
		<Grid.Col ref={targetRef} span="auto" className={classes.contentGrid} order={{lg: 1, md: 1, sm: 1, xl: 2, xs: 2}}>
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
					<Stepper.Step label="Email" allowStepClick={false} allowStepSelect={false}></Stepper.Step>
					<Stepper.Step label="Information" allowStepClick={false} allowStepSelect={false}></Stepper.Step>
					<Stepper.Step label="Done" allowStepClick={false} allowStepSelect={false}></Stepper.Step>
				</Stepper>

				<AspectRatio ratio={1} className={classes.image}>
					<Image src={channelComparisionCheck as string} alt="Check icon" />
				</AspectRatio>

				<Title className={classes.title} order={1} mb={20}>
					Thank you!
				</Title>

				<Text className={classes.normalText}>
					We’ve got all your details and we will be sending your reports soon on your email address.
				</Text>
				<Link to="/resources/">
					<Button>Patient Access Resources</Button>
				</Link>
			</Box>
		</Grid.Col>
	);
};

export default Done;
