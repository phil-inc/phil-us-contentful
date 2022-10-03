// Import type {Embla} from '@mantine/carousel';
// import {Carousel} from '@mantine/carousel';
// import {
// 	Grid,
// 	Title,
// 	Button,
// 	Container,
// 	Text,
// 	createStyles,
// 	Divider,
// 	Image,
// 	Box,
// 	Checkbox,
// 	Group,
// 	TextInput,
// 	PasswordInput,
// 	Center,
// 	Progress,
// 	Card,
// 	Badge,
// 	SimpleGrid,
// } from '@mantine/core';
// import {useForm} from '@mantine/form';
// import {Icon2fa} from '@tabler/icons';
// import ImageContainer from 'components/common/Container/ImageContainer';
// import Expanded from 'components/common/Expanded/Expanded';
// import {InfoBox} from 'components/common/InfoBox';
// import {PressRelease} from 'components/common/Press/PressRelease';
// import {Schedule} from 'components/common/Schedule';
// import Profile from 'components/common/Team/Profile';
// import {StaticImage} from 'gatsby-plugin-image';
// import {Layout} from 'layouts/Layout/Layout';
// import React, {useState, useEffect, useCallback} from 'react';

// const useStyles = createStyles((theme, _params, getRef) => ({
// 	imageWrapper: {
// 		width: '100%',
// 		height: '100%',
// 		background: '#f4f4f4',
// 		display: 'flex',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	},
// 	placeholderImage: {
// 		width: '100%',
// 		height: '100%',
// 		display: 'flex',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	},
// }));

// const Company: React.FC = () => {
// 	const {classes} = useStyles();

// 	const [scrollProgress, setScrollProgress] = useState<number>(0);
// 	const [embla, setEmbla] = useState<Embla | undefined>(null);

// 	const handleScroll = useCallback(() => {
// 		if (!embla) {
// 			return;
// 		}

// 		const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
// 		setScrollProgress(progress * 100);
// 	}, [embla, setScrollProgress]);

// 	useEffect(() => {
// 		if (embla) {
// 			embla.on('scroll', handleScroll);
// 			handleScroll();
// 		}
// 	}, [embla]);

// 	const images = [
// 		'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
// 		'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
// 		'https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
// 		'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
// 		'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
// 	];

// 	const slides = images.map(image => (
// 		<Carousel.Slide key={image}>
// 			<Image src={image} height={540} />
// 		</Carousel.Slide>
// 	));

// 	return (
// 		<Layout>
// 			{/* Hero Section */}
// 			<Grid gutter={'xl'} align='center' mb={160}>
// 				<Grid.Col lg={6} md={6} sm={12}>
// 					<Title order={2}>Who we are</Title>
// 					<Text weight='bold'>Phil revolutionizes life science product commercialization with technology.</Text>
// 					<Text size={'lg'}>
// 						Phil is passionate about improving health outcomes, so we built an entirely new solution that improves
// 						the prescription experience for manufacturers, providers and patients. Our technology solution
// 						heightens brand value and provides an unparalleled experience for physicians and patients.
// 					</Text>
// 				</Grid.Col>
// 				<Grid.Col lg={6} md={6} sm={12}>
// 					<ImageContainer>
// 						<StaticImage
// 							src='../assets/images/index_hero.png'
// 							alt='circles inside circles'
// 							className='hero-img'
// 							placeholder='blurred'
// 							layout='constrained'
// 						></StaticImage>
// 					</ImageContainer>
// 				</Grid.Col>
// 			</Grid>

// 			{/* Second Section */}
// 			<Grid gutter={'xl'} align='center' mb={160}>
// 				<Grid.Col lg={6} md={6} sm={12}>
// 					<ImageContainer>
// 						<StaticImage
// 							src='../assets/images/index_hero.png'
// 							alt='circles inside circles'
// 							className='hero-img'
// 							placeholder='blurred'
// 							layout='constrained'
// 						></StaticImage>
// 					</ImageContainer>
// 				</Grid.Col>
// 				<Grid.Col lg={6} md={6} sm={12}>
// 					<Title order={2}>What we do</Title>
// 					<Text size={'lg'}>
// 						At Phil, we fundamentally believe that helping patients get prescriptions with seamless convenience
// 						can improve health and save lives – and our team is committed to leveraging technology for good to
// 						benefit manufacturers, providers and patients alike.
// 					</Text>
// 				</Grid.Col>
// 			</Grid>

// 			{/* Third Section */}
// 			<Expanded background='#5ABEA4'>
// 				<Carousel slideSize={840} skipSnaps slideGap='md' height={540} loop withIndicators getEmblaApi={setEmbla}>
// 					{slides}
// 				</Carousel>
// 			</Expanded>

// 			{/* Fourth Section */}
// 			<Container fluid mb={140}>
// 				<Group position='center' mb={60}>
// 					<Title order={2}>Team</Title>
// 				</Group>
// 				<Container fluid>
// 					<SimpleGrid
// 						spacing={33}
// 						breakpoints={[
// 							{minWidth: 'sm', cols: 1},
// 							{minWidth: 'md', cols: 2},
// 							{minWidth: 'lg', cols: 4},
// 						]}
// 					>
// 						{Array(8).fill(<Profile />)}
// 					</SimpleGrid>
// 				</Container>
// 			</Container>

// 			{/* Fifth Section */}
// 			<Expanded>
// 				<Group position='center' mb={60}>
// 					<Title order={2}>Investors</Title>
// 				</Group>
// 				<Grid grow columns={5}>
// 					{Array(9).fill(
// 						<Grid.Col span={1}>
// 							<StaticImage
// 								src='../assets/images/investor.png'
// 								alt='circles inside circles'
// 								className='hero-img'
// 								placeholder='blurred'
// 								layout='constrained'
// 							></StaticImage>
// 						</Grid.Col>,
// 					)}
// 				</Grid>
// 			</Expanded>

// 			{/* Sixth Section */}
// 			<Container fluid mb={140}>
// 				<Box mb={60}>
// 					<Group position='center'>
// 						<Title order={2}>Press</Title>
// 					</Group>
// 					<Group position='center'>
// 						<Text size={18}>Read our recent press releases. </Text>
// 					</Group>
// 				</Box>
// 				<Container fluid mb={60}>
// 					<SimpleGrid
// 						spacing={33}
// 						breakpoints={[
// 							{minWidth: 'sm', cols: 1},
// 							{minWidth: 'md', cols: 2},
// 							{minWidth: 'lg', cols: 2},
// 						]}
// 					>
// 						<PressRelease
// 							timestamp='Feb 28, 2022'
// 							title='Edenbridge Pharmaceuticals Announces the Launch of DARTISLA ODT'
// 							link='https://google.com'
// 						/>
// 						<PressRelease
// 							timestamp='Sep 27, 2021'
// 							title='Phil Announces Partnership with Impel NeuroPharma in Support of Trudhesa'
// 							link='https://google.com'
// 						/>
// 					</SimpleGrid>
// 				</Container>
// 				<Group position='center'>
// 					<Button color={'dark'}>View more</Button>
// 				</Group>
// 			</Container>

// 			{/* Seventh Section */}
// 			<Grid gutter={'xl'} align='center' mb={160}>
// 				<Grid.Col lg={6} md={6} sm={12}>
// 					<Box mb={20}>
// 						<Title order={2}>Careers</Title>
// 						<Text size={18} weight='bold'>
// 							We are a rapidly growing team changing the specialty pharmaceutical industry.{' '}
// 						</Text>
// 						<Text size={18}>View a list of open roles at Phil and apply to join our team.</Text>
// 					</Box>
// 					<Group>
// 						<Button color={'dark'}>Job listings</Button>
// 					</Group>
// 				</Grid.Col>
// 				<Grid.Col lg={6} md={6} sm={12}>
// 					<ImageContainer>
// 						<StaticImage
// 							src='../assets/images/index_hero.png'
// 							alt='circles inside circles'
// 							className='hero-img'
// 							placeholder='blurred'
// 							layout='constrained'
// 						></StaticImage>
// 					</ImageContainer>
// 				</Grid.Col>
// 			</Grid>
// 		</Layout>
// 	);
// };

// export default Company;
