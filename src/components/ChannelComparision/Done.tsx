import React from 'react';
import {Grid, Box, Title, Button, Image, Text, AspectRatio} from '@mantine/core';
import {ChannelComparisionContext} from 'contexts/ChannelComparisionContext';
import {channelComparisionCheck} from 'assets/images';
import {Link} from 'gatsby';
import {useScrollIntoView} from '@mantine/hooks';

import * as classes from './done.module.css';
import CStepper from './CStepper';

const Done = () => {
	const {scrollIntoView, targetRef} = useScrollIntoView<HTMLDivElement>();

	React.useEffect(() => {
		scrollIntoView({alignment: 'start'});
	}, []);

	return (
		<Grid.Col ref={targetRef} span="auto" className={classes.contentGrid} order={{base: 2, sm: 1}}>
			<Box className={classes.content}>
				<CStepper />

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
					<Button w="auto" variant="philDefault">
						Patient Access Resources
					</Button>
				</Link>
			</Box>
		</Grid.Col>
	);
};

export default Done;
