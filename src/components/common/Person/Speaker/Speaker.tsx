import {Container, Grid, Title, Text, Center, Stack, Box, createStyles, AspectRatio, Card} from '@mantine/core';
import Asset from 'components/common/Asset/Asset';
import React from 'react';
import {TAsset} from 'types/asset';

type SpeakerProps = {
	person: {id: string; name: string; image: TAsset; bio: string; role: string; company: string; type: string};
};

const useStyles = createStyles(() => ({
	avatar: {
		width: 200,
		height: 200,
	},
	wrapper: {
		background: '#F5F6F8',
		maxWidth: 825,
	},
	content: {
		padding: '50px 7.48%;',
	},
}));

const Speaker: React.FC<SpeakerProps> = ({person}) => {
	const {classes} = useStyles();

	console.log({person});
	return (
		<Container fluid p={0}>
			<Grid className={classes.wrapper} justify="center" align="center" m={0} gutter={0}>
				<Grid.Col span={12}>
		<AspectRatio ratio={1}  sx={{maxWidth: '100%', width: 290}} >

			    <Asset asset={person.image} />
		</AspectRatio>
				</Grid.Col>
				<Grid.Col span={'auto'} >
		<Box className={classes.content}>
			<Title order={5}>{person.name}</Title>
			<Text mb={30}>
				{person.role}, {person.company}
			</Text>
			<Text>{person.bio}</Text>
		</Box>
				</Grid.Col>
			</Grid>
		</Container>
// 		<Card className={classes.wrapper}>
//             <Grid align='center' justify='center'>
// <Grid.Col span={'auto'}>

// 			<Card.Section >
// 				<AspectRatio ratio={1} sx={{minWidth: 290}}>
// 					<Asset asset={person.image} />
// 				</AspectRatio>
// 			</Card.Section>
// </Grid.Col>
// <Grid.Col span={'auto'}>

// 			<Box className={classes.content}>
// 				<Title order={5}>{person.name}</Title>
// 				<Text mb={30}>
// 					{person.role}, {person.company}
// 				</Text>
// 				<Text>{person.bio}</Text>
// 			</Box>

// </Grid.Col>
//             </Grid>
// 		</Card>
	);
};

export default Speaker;
