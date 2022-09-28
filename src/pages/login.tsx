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
	infoBox: {
		transform: 'translate(0.5%, -250px)',
	},
}));

const Login = () => {
	const {classes} = useStyles();
	const form = useForm({
		initialValues: {
			email: '',
			password: '',
			showPassword: false,
		},

		validate: {
			email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
		},
	});

	return (
		<Layout>
			{/* Hero Section */}
			<Grid gutter={'xs'} align='center' mb={160}>
				<Grid.Col lg={6} md={6} sm={12} orderSm={2} orderLg={1}>
					<Box sx={{maxWidth: 680}}>
						<Title order={2} mb={40}>
							Patient Login
						</Title>
						<Title order={3}>Login to your Phil account</Title>
						<Divider variant='dashed' size={2} my={10} mb={40} />
						<form
							onSubmit={form.onSubmit(values => {
								console.log(values);
							})}
						>
							<TextInput
								mb={20}
								radius={0}
								withAsterisk
								required
								label='Email'
								placeholder='your@email.com'
								{...form.getInputProps('email')}
							/>
							<PasswordInput
								mb={20}
								radius={0}
								required
								withAsterisk
								label='Password'
								placeholder='Password'
								{...form.getInputProps('password')}
							/>

							<Checkbox
								mb={30}
								color='teal'
								label='Show Password'
								{...form.getInputProps('showPassword', {type: 'checkbox'})}
							/>

							<Group position='left' mt='md'>
								<Button type='submit' color={'dark'}>
									Log in
								</Button>
							</Group>
							<Group position='left' mt='md' mb={110}>
								<Text size={'lg'} color='#5ABEA4' italic weight={'bold'}>
									Forgot password?
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
								src='../assets/images/index_hero.png'
								alt='circles inside circles'
								className='hero-img'
								placeholder='blurred'
								layout='constrained'
							></StaticImage>
						</Container>
					</Container>
					<Box className={classes.infoBox}>
						<InfoBox title='Don’t Have a Phil Login?' noButton color='yellow'>
							*If your doctor sent your prescription to Phil, we’ll text you to confirm your order within one
							business day. If you haven’t received a message from us, please complete this [form].
						</InfoBox>
					</Box>
				</Grid.Col>
			</Grid>
		</Layout>
	);
};

export default Login;
