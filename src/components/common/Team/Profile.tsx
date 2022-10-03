import {Card, Group, Divider, Button, Text, Image, createStyles, Stack, Box} from '@mantine/core';
import {Link} from 'gatsby';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import React from 'react';
import type {TResource} from 'types/resource';

const useStyles = createStyles((theme, _params, getRef) => ({
	card: {
		background: '#F4F4F4',
		height: '100%',
	},

	stack: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
}));

type ProfileProps = {
	resource: Pick<TResource, 'heading' | 'id' | 'body' | 'buttonText' | 'linkTo' | 'asset'>;
};

const Profile: React.FC<ProfileProps> = ({resource}) => {
	const {classes} = useStyles();
	const pathToImage = getImage(resource.asset);

	return (
		<Card shadow='none' p='lg' radius={0} className={classes.card}>
			<Card.Section>
				<GatsbyImage image={pathToImage} alt={resource.heading} />
			</Card.Section>

			<Group mt='md' mb='xs'>
				<Text size={35} weight={'bold'}>
					{resource.heading}
				</Text>
			</Group>

			<Divider size={3} variant='dashed' my={12} />

			<Text size={18} mb={12} italic>
				{renderRichText(resource.body)}
			</Text>

			{Boolean(resource.buttonText?.length) && (
				<Link to={resource.linkTo}>
					<Button color={'dark'}>{resource.buttonText}</Button>
				</Link>
			)}
		</Card>
	);
};

export default Profile;
