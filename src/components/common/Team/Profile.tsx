import {Card, Group, Divider, Button, Text, Image, createStyles} from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme, _params, getRef) => ({
	card: {
		background: '#F4F4F4',
	},
}));

const Profile: React.FC = () => {
	const {classes} = useStyles();

	return (
		<Card shadow='none' p='lg' radius={0} className={classes.card}>
			<Card.Section>
				<Image
					src='https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'
					height={330}
					alt='Norway'
					fit='fill'
				/>
			</Card.Section>

			<Group position='apart' mt='md' mb='xs'>
				<Text size={35} weight={'bold'}>
					First Name & Last Name
				</Text>
			</Group>

			<Divider size={3} variant='dashed' my={12} />

			<Text size={18} mb={12} italic>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			</Text>

			<Button color='dark'>View bio</Button>
		</Card>
	);
};

export default Profile;
