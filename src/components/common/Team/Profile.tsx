import {Card, Group, Divider, Button, Text, Image, createStyles, Stack, Box, Anchor} from '@mantine/core';
import {Link} from 'gatsby';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import React from 'react';
import type {TResource} from 'types/resource';
import {getLink} from 'utils/getLink';
import Asset from '../Asset/Asset';

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
	resource: Pick<TResource, 'heading' | 'id' | 'body' | 'buttonText' | 'internalLink' | 'externalLink' | 'asset'>;
};

const Profile: React.FC<ProfileProps> = ({resource}) => {
	const {classes} = useStyles();
	const {link, isExternal} = getLink(resource as TResource);
	return (
		<Card shadow='none' p='lg' radius={0} className={classes.card}>
			<Card.Section>
				<Asset asset={resource.asset} />
			</Card.Section>

			{resource.heading && (
				<Group mt='md' mb='xs'>
					<Text size={35} weight={'bold'}>
						{resource.heading}
					</Text>
				</Group>
			)}

			<Divider size={3} variant='dashed' my={12} />

			{resource.body && (
				<Text size={18} mb={12} italic>
					{renderRichText(resource.body)}
				</Text>
			)}

			{Boolean(resource.buttonText?.length) && (
				<Group>
					{isExternal ? (
						<Anchor href={link} target='_blank'>
							<Button color={'dark'}>{resource.buttonText}</Button>
						</Anchor>
					) : (
						<Link to={link}>
							<Button color={'dark'}>{resource.buttonText}</Button>
						</Link>
					)}
				</Group>
			)}
		</Card>
	);
};

export default Profile;
