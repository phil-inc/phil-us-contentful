import {
	Grid,
	Title,
	Button,
	Container,
	Text,
	createStyles,
	Divider,
	Box,
	Checkbox,
	Group,
	TextInput,
	PasswordInput,
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {Icon2fa} from '@tabler/icons';
import CareerBlock from 'components/career/CareerBlock';
import {InfoBox} from 'components/common/InfoBox';
import {Schedule} from 'components/common/Schedule';
import {StaticImage} from 'gatsby-plugin-image';
import {Layout} from 'layouts/Layout/Layout';
import React from 'react';

const useStyles = createStyles(theme => ({
	imageWrapper: {
		width: '100%',
		height: '100%',
		background: '#f4f4f4',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	placeholderImage: {
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
}));

const Career = () => {
	const {classes} = useStyles();
	const form = useForm({
		initialValues: {
			email: '',
		},

		validate: {
			email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
		},
	});

	return (
		<Layout>
			{/* Hero Section */}
			<Grid gutter={'xl'} align='center' mb={160}>
				<Grid.Col lg={6} md={6} sm={12} orderSm={2} orderLg={1}>
					<Title order={2} mb={8}>
						Careers at Phil
					</Title>
					<CareerBlock title={'Operations'} />
					<CareerBlock title={'Technical'} />
				</Grid.Col>
				<Grid.Col lg={6} md={6} sm={12} orderSm={1} orderLg={2}>
					<Container className={classes.imageWrapper}>
						<Container className={classes.placeholderImage}>
							<StaticImage
								src='../assets/images/index_hero.png'
								alt='circles inside circles'
								className='hero-img'
								placeholder='blurred'
								layout='constrained'
							></StaticImage>
						</Container>
					</Container>
				</Grid.Col>
			</Grid>
		</Layout>
	);
};

export default Career;
