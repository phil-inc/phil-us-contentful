import React from 'react';
import {Layout} from 'layouts/Layout/Layout';
// Import {ColorSchemeToggle} from 'components/ColorSchemeToggle/ColorSchemeToggle';
import {
	Button,
	Card,
	Center,
	Container,
	createStyles,
	Divider,
	Grid,
	Group,
	Image,
	List,
	Paper,
	SimpleGrid,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import {StaticImage} from 'gatsby-plugin-image';
import {Article} from 'components/common/Article';
import {Testimonial} from 'components/common/Testimonial';
import {Featured} from 'components/common/Featured';
import {Schedule} from 'components/common/Schedule';

const useStyles = createStyles(theme => ({
	inner: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	content: {
		width: '50%',
	},
	percentage: {
		fontFamily: 'Lato',
	},
	description: {
		fontSize: '35px',
	},
}));

export default function Patients() {
	const {classes} = useStyles();

	return (
		<Layout>
			{/* Hero Section */}
			<Grid gutter={'xl'} align='center' mb={160}>
				<Grid.Col lg={6} md={6} sm={12}>
					<Title order={2}>Access & Commercialization Solutions</Title>
					<Text weight='bold'>Is your brand reaching its commercial potential?</Text>
					<Text size={'lg'}>
						Our end-to-end platform converts market access to covered dispenses, transforming outcomes for brands.
					</Text>
				</Grid.Col>
				<Grid.Col lg={6} md={6} sm={12}>
					<Container style={{background: '#f4f4f4'}}>
						<Center>
							<StaticImage
								src='../assets/images/index_hero.png'
								alt='circles inside circles'
								className='hero-img'
								placeholder='blurred'
								layout='constrained'
							></StaticImage>
						</Center>
					</Container>
				</Grid.Col>
			</Grid>

			{/* TODO: Finalize Expanded component */}
			{/* Second Section */}
			<Container
				fluid
				mb={108}
				ml={-116}
				px={100}
				py={128}
				style={{background: '#f4f4f4', maxWidth: 1920, width: '100vw'}}
			>
				<SimpleGrid
					cols={5}
					spacing='lg'
					breakpoints={[
						{maxWidth: 980, cols: 5, spacing: 'md'},
						{maxWidth: 755, cols: 2, spacing: 'sm'},
						{maxWidth: 600, cols: 1, spacing: 'sm'},
					]}
				>
					<Card shadow='none' p='xl' radius={0}>
						<Card.Section>
							<Image
								src='https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80'
								height={265}
								alt='No way!'
							/>
						</Card.Section>

						<Title mt='md' className={classes.percentage}>
							90%
						</Title>

						<Text color='dark' className={classes.description}>
							patient enrollment
						</Text>
					</Card>
					<Card shadow='none' p='xl' radius={0}>
						<Card.Section>
							<Image
								src='https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80'
								height={265}
								alt='No way!'
							/>
						</Card.Section>

						<Title mt='md' className={classes.percentage}>
							5x
						</Title>

						<Text color='dark' className={classes.description}>
							RX refill adherence improvement
						</Text>
					</Card>
					<Card shadow='none' p='xl' radius={0}>
						<Card.Section>
							<Image
								src='https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80'
								height={265}
								alt='No way!'
							/>
						</Card.Section>

						<Title mt='md' className={classes.percentage}>
							2x
						</Title>

						<Text color='dark' className={classes.description}>
							increase in covered dispenses
						</Text>
					</Card>
					<Card shadow='none' p='xl' radius={0}>
						<Card.Section>
							<Image
								src='https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80'
								height={265}
								alt='No way!'
							/>
						</Card.Section>

						<Title mt='md' className={classes.percentage}>
							6x
						</Title>

						<Text color='dark' className={classes.description}>
							net sales growth
						</Text>
					</Card>
					<Card shadow='none' p='xl' radius={0}>
						<Card.Section>
							<Image
								src='https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80'
								height={265}
								alt='No way!'
							/>
						</Card.Section>

						<Title mt='md' className={classes.percentage}>
							40x
						</Title>

						<Text color='dark' className={classes.description}>
							return on investment
						</Text>
					</Card>
				</SimpleGrid>
			</Container>

			{/* Third Section */}
			<Grid gutter={60} align='center' mb={160}>
				<Grid.Col lg={6} md={6} sm={12}>
					<Container style={{background: '#f4f4f4'}}>
						<Center>
							<StaticImage
								src='../assets/images/index_hero.png'
								alt='circles inside circles'
								className='hero-img'
								placeholder='blurred'
								layout='constrained'
							></StaticImage>
						</Center>
					</Container>
				</Grid.Col>
				<Grid.Col lg={6} md={6} sm={12}>
					<Title order={2} style={{maxWidth: 601}}>
						Launch
					</Title>
					<Text mb={25}>
						Manufacturers navigate complex challenges when launching a new drug and getting market access in
						place. Phil’s expertise can guide you through this process and help drive as many covered scripts as
						possible. Our end-to-end solution offers pre-launch strategy support, wholesaling options to save you
						money, and the data visibility to optimize your program.
					</Text>
					<Button color='dark'>Learn more</Button>
				</Grid.Col>
			</Grid>

			{/* Fourth Section */}
			<Grid gutter={60} align='center' mb={160}>
				<Grid.Col lg={6} md={6} sm={12}>
					<Title order={2} style={{maxWidth: 601}}>
						Mid-cycle
					</Title>
					<Text mb={25}>
						If your brand is struggling to convert market access to coverage, turn to Phil. Phil’s platform can
						improve overall coverage, refill adherence and combat against upside down economics
					</Text>
					<Button color='dark'>Learn more</Button>
				</Grid.Col>
				<Grid.Col lg={6} md={6} sm={12}>
					<Container style={{background: '#f4f4f4'}}>
						<Center>
							<StaticImage
								src='../assets/images/index_hero.png'
								alt='circles inside circles'
								className='hero-img'
								placeholder='blurred'
								layout='constrained'
							></StaticImage>
						</Center>
					</Container>
				</Grid.Col>
			</Grid>

			{/* Fifth Section */}
			<Grid gutter={60} align='center' mb={160}>
				<Grid.Col lg={6} md={6} sm={12}>
					<Container style={{background: '#f4f4f4'}}>
						<Center>
							<StaticImage
								src='../assets/images/index_hero.png'
								alt='circles inside circles'
								className='hero-img'
								placeholder='blurred'
								layout='constrained'
							></StaticImage>
						</Center>
					</Container>
				</Grid.Col>
				<Grid.Col lg={6} md={6} sm={12}>
					<Title order={2} style={{maxWidth: 601}}>
						Loss of exclusivity
					</Title>
					<Text mb={25}>
						If your brand-name drug has experienced a loss of exclusivity or is approaching the time it will no
						longer be protected from generic drug competition, Phil can help you navigate this uncertainty. Learn
						how Phil’s technology puts you back in control of your brand economics
					</Text>
					<Button color='dark'>Learn more</Button>
				</Grid.Col>
			</Grid>

			{/* Sixth Section */}
			<Container fluid ml={-116} p={116} style={{background: '#f4f4f4', maxWidth: 1920, width: '100vw'}}>
				<Center>
					<Schedule title='Lorem Ipsum Dolor' buttonText='Contact us'>
						For better financials on a per script basis, unprecedented transparency into the prescription life
						cycle and real-time visibility and control over your channels, contact us.
					</Schedule>
				</Center>
			</Container>
		</Layout>
	);
}
