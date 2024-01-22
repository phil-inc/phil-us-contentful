import {Grid, Title, Text, Box, Paper} from '@mantine/core';
import Asset from 'components/common/Asset/Asset';
import React from 'react';
import {type Person} from 'types/person';

import * as classes from './speaker.module.css';

type SpeakerProps = {
	person: Person;
	length: number;
};

const Speaker: React.FC<SpeakerProps> = ({person, length}) => (
	<Paper radius={0} className={classes.card}>
		<Grid className={classes.wrapper} justify="center" align="center" m={0} gutter={0}>
			<Grid.Col className={classes.avatar} span={{xs: 12, md: 'content'}}>
					<Asset asset={person.image} />
			</Grid.Col>
			<Grid.Col span={{xs: 12, md: 'auto'}}>
				<Box className={classes.content}>
					<Title order={5}>{person.name}</Title>
					<Text mb={30} className={classes.textColor}>
						{person.role}, {length > 1 && <br />} {person.company}
					</Text>
					<Text className={classes.textColor}>{person.bio}</Text>
				</Box>
			</Grid.Col>
		</Grid>
	</Paper>
);

export default Speaker;
