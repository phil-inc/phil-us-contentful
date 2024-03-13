import React from 'react';
import {Grid, Title, Text, Box, Paper} from '@mantine/core';
import Asset from 'components/common/Asset/Asset';
import ImageContainer from 'components/common/Container/ImageContainer';

import {type Person} from 'types/person';
import cx from 'clsx';

import * as classes from './speaker.module.css';
import * as imageContainerClasses from 'components/common/Container/imageContainer.module.css';

type SpeakerProps = {
	person: Person;
	length: number;
};

const Speaker: React.FC<SpeakerProps> = ({person, length}) => (
	<Paper radius={0} className={classes.card}>
		<Grid className={classes.wrapper} justify="center" align="start" m={0} gutter={0}>
			<Grid.Col span={{base: 12, md: 12, lg: 3, xl: 4}}>
				<ImageContainer
					className={cx(imageContainerClasses.imageContainer, classes.speakerImageContainer)}
					fluid
					cover
					maw={'100%'}
					ratio={1}
				>
					<Asset asset={person.image} />
				</ImageContainer>
			</Grid.Col>
			<Grid.Col span={{base: 12, md: 'auto'}}>
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
