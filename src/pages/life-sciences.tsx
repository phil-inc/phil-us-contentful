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
}));

export default function LifeSciences() {
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

			{/* Second Section */}
			<Container fluid mb={108} ml={-116} px={100} py={128} style={{background: '#f4f4f4', minWidth: 1920}}>
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

						<Text color='dark' size={32}>
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

						<Text color='dark' size={32}>
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

						<Text color='dark' size={32}>
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

						<Text color='dark' size={32}>
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

						<Text color='dark' size={32}>
							return on investment
						</Text>
					</Card>
				</SimpleGrid>
			</Container>

			{/* Third Section */}
			<Container fluid mb={108} ml={-116} px={100} style={{background: '#f4f4f4', minHeight: 1080, minWidth: 1920}}>
				<Center mb={62}>
					<Title order={2} mt={112}>
						How it Works
					</Title>
				</Center>
				<Grid>
					<Grid.Col span={4}>
						<Article title='Life Sciences'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
							et dolore magna aliqua.
						</Article>
					</Grid.Col>
					<Grid.Col span={4}>
						<Article title='Healthcare Providers' color='blue'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
							et dolore magna aliqua.
						</Article>
					</Grid.Col>
					<Grid.Col span={4}>
						<Article title='Patients' color='yellow'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
							et dolore magna aliqua.
						</Article>
					</Grid.Col>
				</Grid>
			</Container>

			{/* Fourth Section */}
			<Grid gutter={'xl'} align='center' mb={160}>
				<Grid.Col lg={6} md={6} sm={12}>
					<Title order={2} style={{maxWidth: 601}}>
						Trusted by Innovative Pharma Manufacturers
					</Title>
					<Text mb={16}>companies logos go here</Text>
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
			<Container fluid mb={108} ml={-116} px={100} style={{background: '#29a5b4', minHeight: 813, minWidth: 1920}}>
				<Center mb={62}>
					<Title order={2} mt={112} color='white'>
						Testimonials
					</Title>
				</Center>
				<Grid>
					<Grid.Col span={6}>
						<Testimonial
							icon='oyster point'
							author='Lorem ipsum dolor sit amet'
							designation='Consectetur adipiscing elit.'
						>
							“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent enim orci, pellentesque eu
							tortor at, vestibulum faucibus nisi. Nulla vel lacus ac elit elementum maximus malesuada ut arcu.
							Duis vitae convallis purus. Sed dui metus, egestas pharetra ante ut, imperdiet sollicitudin lacus.
							Mauris iaculis risus at lectus cursus euismod eu vitae libero.”
						</Testimonial>
					</Grid.Col>
					<Grid.Col span={6}>
						<Testimonial
							icon='impel'
							author='Lorem ipsum dolor sit amet'
							designation='Consectetur adipiscing elit.'
						>
							“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent enim orci, pellentesque eu
							tortor at, vestibulum faucibus nisi. Nulla vel lacus ac elit elementum maximus malesuada ut arcu.
							Duis vitae convallis purus. Sed dui metus, egestas pharetra ante ut, imperdiet sollicitudin lacus.
							Mauris iaculis risus at lectus cursus euismod eu vitae libero.”
						</Testimonial>
					</Grid.Col>
				</Grid>
			</Container>

			{/* Sixth Section */}

			<Container fluid m={0} p={0} mb={50}>
				<Center>
					<Title mb={64} order={2}>
						Featured Resources
					</Title>
				</Center>

				<Grid mb={52}>
					<Grid.Col span={6}>
						<Featured title='Lorem Ipsum Dolor'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at turpis at velit tincidunt
							molestie.
						</Featured>
					</Grid.Col>
					<Grid.Col span={6}>
						<Featured title='Lorem Ipsum Dolor'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at turpis at velit tincidunt
							molestie.
						</Featured>
					</Grid.Col>
				</Grid>
				<Center>
					<Button color={'dark'}>Resources</Button>
				</Center>
			</Container>

			{/* Seventh Section */}
			<Container fluid ml={-116} px={116} style={{background: '#f4f4f4', minHeight: 256, minWidth: 1920}}>
				<Center>
					<Schedule title='Schedule a Demo'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at turpis at velit tincidunt
						molestie.
					</Schedule>
				</Center>
			</Container>
		</Layout>
	);
}
