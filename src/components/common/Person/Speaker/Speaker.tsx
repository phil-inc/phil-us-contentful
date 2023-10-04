import {Container, Grid, Title, Text, Center, Stack, Box, createStyles, AspectRatio, Card, Paper} from '@mantine/core';
import Asset from 'components/common/Asset/Asset';
import ImageContainer from 'components/common/Container/ImageContainer';
import React from 'react';
import {TAsset} from 'types/asset';
import { Person } from 'types/person';

type SpeakerProps = {
	person: Person
	length: number;
};

const useStyles = createStyles((theme, {length}: {length: number}) => ({
	card: {
		background: '#F5F6F8',
		height: '100%',
		maxWidth: 825,
	},

	avatar: {
		width: length <= 2 ? '290px !important' : '100% !important',
        
        [theme.fn.smallerThan(1390) ]: {
			width: '100% !important',
		},

		[theme.fn.smallerThan(768) ]: {
			width: '100% !important',
		},
	},

	wrapper: {
		background: '#F5F6F8',
	},

	content: {
		padding: length <= 2 ? '32px 42px;' : '50px 42px;',

		[theme.fn.smallerThan('lg')]: {
			padding: '50px 42px;',
		},
	},
}));

const Speaker: React.FC<SpeakerProps> = ({person, length}) => {
	const {classes} = useStyles({length});

	return (
		<Paper radius={0} className={classes.card}>
			<Grid className={classes.wrapper} justify="center" align="center" m={0} gutter={0}>
				<Grid.Col className={classes.avatar} xs={12} sm="content">
					<ImageContainer fluid>
						<Asset asset={person.image} />
					</ImageContainer>
				</Grid.Col>
				<Grid.Col xs={12} sm={'auto'}>
					<Box className={classes.content}>
						<Title order={5}>{person.name}</Title>
						<Text mb={30}>
							{person.role}, {length > 1 && <br />} {person.company}
						</Text>
						<Text>{person.bio}</Text>
					</Box>
				</Grid.Col>
			</Grid>
		</Paper>
	);
};

export default Speaker;
