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
	AspectRatio,
	SimpleGrid,
	Textarea,
	Center,
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {Icon2fa} from '@tabler/icons';
import {CardWithImage} from 'components/common/CardWithImage';
import Expanded from 'components/common/Expanded/Expanded';
import {InfoBox} from 'components/common/InfoBox';
import {Schedule} from 'components/common/Schedule';
import {Testimonial} from 'components/common/Testimonial';
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
	infoBox: {
		transform: 'translateY(-320px)',
	},
	title: {
		fontFamily: 'Raleway',
		fontSize: 26,
	},
	description: {
		fontFamily: 'Lato',
		fontSize: 26,
	},
	testimonialImage: {
		height: '100%',
	},
}));

const Contact = () => {
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
			<Grid gutter={'xs'} align='center' mb={160} mt={-70}>
				<Grid.Col lg={6} md={6} sm={12} orderSm={2} orderLg={1}>
					<Box sx={{maxWidth: 680}}>
						<Title order={2} mb={8}>
							Contact us
						</Title>
						<Box sx={{maxWidth: 550}}>
							<Title order={3}>Start a conversation</Title>
						</Box>
						<Divider variant='dashed' size={2} my={25} mb={40} />
						<form
							onSubmit={form.onSubmit(values => {
								console.log(values);
							})}
						>
							<SimpleGrid cols={2} breakpoints={[{maxWidth: 'sm', cols: 1}]}>
								<TextInput label='Your name' placeholder='Your name' />
								<TextInput label='Your email' placeholder='hello@mantine.dev' required />
							</SimpleGrid>

							<TextInput mt='md' label='Subject' placeholder='Subject' required />

							<Textarea
								mt='md'
								label='Your message'
								placeholder='Please include all relevant information'
								minRows={3}
							/>
							<Group position='left' mt='md'>
								<Button type='submit' color={'dark'}>
									Submit
								</Button>
							</Group>
							<Group position='left' mt='md' mb={110}>
								<Text size={'lg'} color='#5ABEA4' italic weight={'bold'}>
									Return to Login
								</Text>
							</Group>
							<Box sx={{maxWidth: 613}}>
								<Text size={'lg'} color='dimmed'>
									By proceeding, you agree to our terms of use, privacy policy and HIPAA policy.. Version
									5.80.0
								</Text>
							</Box>
						</form>
					</Box>
				</Grid.Col>
				<Grid.Col lg={6} md={6} sm={12} orderSm={1} orderLg={2}>
					<Container className={classes.imageWrapper}>
						<Container className={classes.placeholderImage}>
							<StaticImage
								src='../assets/images/map.png'
								alt='circles inside circles'
								className='hero-img'
								placeholder='blurred'
								layout='constrained'
							></StaticImage>
						</Container>
					</Container>
					<Box className={classes.infoBox}>
						<InfoBox title='Phil, Inc.' noButton>
							234 Front Street, FL 4, San Francisco, California 94111
						</InfoBox>
					</Box>
				</Grid.Col>
			</Grid>

			{/* Second Section */}
			<Expanded noMargin>
				<Center>
					<Schedule title='Schedule a Demo' buttonText='Schedule demo'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at turpis at velit tincidunt
						molestie.
					</Schedule>
				</Center>
			</Expanded>

			{/* Third Section */}
			<Expanded background='#00827E' noMargin>
				<Center mb={62}>
					<Title order={2} mt={12} color='white'>
						Locations
					</Title>
				</Center>
				<Grid>
					<Grid.Col lg={6} sm={12}>
						<CardWithImage
							image={
								<StaticImage
									src='../assets/images/newYork.png'
									alt='person'
									className={classes.testimonialImage}
									placeholder='blurred'
									layout='fullWidth'
								></StaticImage>
							}
						>
							<Text className={classes.title}>New York - Phil</Text>
							<Divider variant='dashed' size={3} style={{maxWidth: 404}} my={13} />
							<Text className={classes.description}>234 Front Street, FL 4</Text>
							<Text className={classes.description}>San Francisco, California 94111</Text>
						</CardWithImage>
					</Grid.Col>
					<Grid.Col lg={6} sm={12}>
						<CardWithImage
							image={
								<StaticImage
									src='../assets/images/philadelphia.png'
									alt='person'
									className={classes.testimonialImage}
									placeholder='blurred'
									layout='fullWidth'
								></StaticImage>
							}
						>
							<Text className={classes.title}>Philadelphia - Phil</Text>
							<Divider variant='dashed' size={3} style={{maxWidth: 404}} my={13} />
							<Text className={classes.description}>234 Front Street, FL 4</Text>
							<Text className={classes.description}>San Francisco, California 94111</Text>
						</CardWithImage>
					</Grid.Col>
				</Grid>
			</Expanded>
		</Layout>
	);
};

export default Contact;
