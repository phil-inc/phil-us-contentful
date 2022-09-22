import React from 'react';
import {Layout} from 'layouts/Layout/Layout';
// Import {ColorSchemeToggle} from 'components/ColorSchemeToggle/ColorSchemeToggle';
import {Button, Center, Container, createStyles, Grid, Image, List, Text, Title} from '@mantine/core';
import {StaticImage} from 'gatsby-plugin-image';

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
			<Grid gutter={'xl'} justify='space-between' align={'flex-end'}>
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
		</Layout>
	);
}
