import {Container, Title, Button, Text, createStyles, Grid, Box, Stepper, TextInput, Image} from '@mantine/core';
import {SEO} from 'layouts/SEO/SEO';
import React from 'react';
import {Layout} from 'layouts/Layout/Layout';
import {getCustomizedReport} from 'assets/images';
import EmailCollection from 'components/ChannelComparision/EmailCollection';

export const Head: React.FC = () => <SEO title={'Channel comparision'}></SEO>;

const useStyles = createStyles(() => ({
	root: {
		paddingTop: 80,
		paddingBottom: 80,
		width: '100%',
		maxWidth: 1440,
		display: 'flex',
		placeItems: 'center',
		justifyContent: 'center',
	},

	innerGrid: {
		margin: 0,
		maxWidth: 1440,
		width: '100%',
	},
}));

const ChannelComparisionPage = () => {
	const {classes} = useStyles();

	const [active, setActive] = React.useState(0);

	const nextStep = () => {
		setActive(current => (current < 3 ? current + 1 : current));
	};

	const prevStep = () => {
		setActive(current => (current > 0 ? current - 1 : current));
	};

	return (
		<Layout>
			<Container className={classes.root}>
				<Grid className={classes.innerGrid} justify='center'>
					<EmailCollection />

					<Grid.Col span='auto' p={0}>
						<Image src={getCustomizedReport as string} fit='cover' />
					</Grid.Col>
				</Grid>
			</Container>
		</Layout>
	);
};

export default ChannelComparisionPage;
