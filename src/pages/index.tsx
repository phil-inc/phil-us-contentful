import React from 'react';
import {Layout} from 'layouts/Layout/Layout';
// Import {ColorSchemeToggle} from 'components/ColorSchemeToggle/ColorSchemeToggle';
import {
	Button,
	Center,
	Container,
	createStyles,
	Divider,
	Grid,
	Group,
	Image,
	List,
	Paper,
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
}));

export default function HomePage() {
	const {classes} = useStyles();

	return (
		<Layout>
			{/* Hero Section */}
			<Grid gutter={'xl'} align='center' mb={160}>
				<Grid.Col lg={6} md={6} sm={12}>
					<Title>Patient Access, Simplified</Title>
					<Text mb={16}>
						Phil built a comprehensive patient access platform that unlocks brand value and improves health
						outcomes, by ensuring patients can get mediation quickly and affordably.
					</Text>
					<Button color={'dark'}>Lean More</Button>
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
			<Grid mb={134} gutter={'xl'} justify='space-between' align={'flex-end'}>
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
				<Grid.Col lg={6} md={6} sm={12} style={{minHeight: 475}}>
					<Title order={2} pb={16}>
						The Phil Patient Access Platform
					</Title>
					<Container p={0} m={0} size={650}>
						<Text mb={32}>
							Designed to transform Rx commercialization, Phil unlocks the highest rates of pull through,
							adherence and most importantly, the number of covered dispenses, enabling life sciences companies
							to double down on growth.
						</Text>
					</Container>
					<List mb={32} spacing={'md'}>
						<List.Item>
							<Text span weight={'bold'}>
								Seamless HCP and Patient Experience
							</Text>
						</List.Item>
						<List.Item>
							<Text span weight={'bold'}>
								Software Driven Prior Authorization
							</Text>
						</List.Item>
						<List.Item>
							<Text span weight={'bold'}>
								Optimized Routing via National Dispense Network
							</Text>
						</List.Item>
						<List.Item>
							<Text span weight={'bold'}>
								Wholesale Distribution
							</Text>
						</List.Item>
						<List.Item>
							<Text span weight={'bold'}>
								Real-time Data and Actionable Insights
							</Text>
						</List.Item>
					</List>
					<Button color={'dark'}>Lean More</Button>
				</Grid.Col>
			</Grid>

			{/* Third Section */}
			<Container
				fluid
				mb={108}
				ml={-116}
				px={100}
				style={{background: '#f4f4f4', minHeight: 1080, minWidth: '100vw'}}
			>
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
			<Container fluid mb={108} ml={-116} p={100} style={{background: '#29a5b4', minHeight: 813, minWidth: '100vw'}}>
				<Center mb={62}>
					<Title order={2} mt={12} color='white'>
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
					<Schedule title='Schedule a Demo' buttonText='Schedule demo'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at turpis at velit tincidunt
						molestie.
					</Schedule>
				</Center>
			</Container>
		</Layout>
	);
}
