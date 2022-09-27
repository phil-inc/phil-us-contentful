import React from 'react';
import {Layout} from 'layouts/Layout/Layout';

import {
	ActionIcon,
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
	TextInput,
	Title,
} from '@mantine/core';
import {StaticImage} from 'gatsby-plugin-image';
import {Article} from 'components/common/Article';
import {Testimonial} from 'components/common/Testimonial';
import {Featured} from 'components/common/Featured';
import {Schedule} from 'components/common/Schedule';
import {Benefit} from 'components/common/Benefit';
import Expanded from 'components/common/Expanded/Expanded';
import {IconSearch, IconArrowRight, IconArrowLeft} from '@tabler/icons';
import {FAQ} from 'components/common/FAQ';
import {useStaticQuery, graphql} from 'gatsby';
import type {PatientPageType} from 'types/patientsPage';

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

export default function Patients({data}) {
	const {classes} = useStyles();

	const {firstTwoColumnSection, benefitSection, testimonialsSection, faqSection}
		= data.contentfulPatientPage as PatientPageType;

	console.log('data', faqSection);

	return (
		<Layout>
			{/* Hero Section */}
			<Grid gutter={'xs'} align='center' mb={160}>
				<Grid.Col lg={6} md={6} sm={12}>
					<Title order={2} mb={16}>
						{firstTwoColumnSection.title[0]}
					</Title>
					<Text weight='bold'>{firstTwoColumnSection.title[1]}</Text>
					<Text size={'lg'} mb={40}>
						{firstTwoColumnSection.description.description}
					</Text>
					<Button color='dark'>{firstTwoColumnSection.button}</Button>
				</Grid.Col>
				<Grid.Col lg={6} md={6} sm={12}>
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

			{/* Second Section */}
			<Expanded>
				<Center>
					<Title mb={64} order={2}>
						Benefits
					</Title>
				</Center>
				<Grid mb={52}>
					{benefitSection.map(item => (
						<Grid.Col span={6}>
							<Benefit divider={item.divider} title={item.title}>
								{item.description.description}
							</Benefit>
						</Grid.Col>
					))}
				</Grid>
			</Expanded>

			{/* Third Section */}
			<Grid gutter={60} align='end' mb={160}>
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
					<Container p={0} mb={32}>
						<Title order={2} style={{maxWidth: 601}} mb={32}>
							Fill a prescription
						</Title>
					</Container>
					<Container p={0} mb={150}>
						<Title order={3} style={{maxWidth: 601}}>
							Login to your Phil account
						</Title>
						<Divider variant='dashed' size='lg' mb={25} />
						<Button color='dark'>Patient log in</Button>
					</Container>

					<Container p={0}>
						<Text size='lg' weight='bold'>
							Don’t Have a Phil Login?
						</Text>
						<Text size='lg' mb={25}>
							*If your doctor sent your prescription to Phil, we’ll text you to confirm your order within one
							business day. If you haven’t received a message from us, please{' '}
							<Text span italic size={'lg'} style={{color: '#5ABEA4'}}>
								contact us
							</Text>
							.
						</Text>
					</Container>
				</Grid.Col>
			</Grid>

			{/* Fourth Section */}
			<Expanded background='#00827E' minHeight={813}>
				<Center mb={62}>
					<Title order={2} mt={12} color='white'>
						Testimonials
					</Title>
				</Center>
				<Grid>
					{testimonialsSection.map(testimonial => (
						<Grid.Col lg={6} sm={12}>
							<Testimonial
								type='person'
								icon='oyster point'
								author={testimonial.author}
								designation={testimonial.designation}
							>
								{testimonial.description.description}
							</Testimonial>
						</Grid.Col>
					))}
				</Grid>
			</Expanded>

			{/* Fifth Section */}
			<Container fluid>
				<Container fluid>
					<Center>
						<Title order={2}>FAQs</Title>
					</Center>
					<Container>
						<Grid>
							<Grid.Col span={10}>
								<TextInput
									icon={<IconSearch size={18} stroke={1.5} />}
									size='md'
									placeholder='Search questions'
									rightSectionWidth={42}
								/>
							</Grid.Col>
							<Grid.Col span={2}>
								<Button color='dark' size='md'>
									Search
								</Button>
							</Grid.Col>
						</Grid>
					</Container>
				</Container>
				<Grid pt={60}>
					{faqSection.map(faq => (
						<Grid.Col lg={6} sm={12}>
							<FAQ title={faq.question} />
						</Grid.Col>
					))}
				</Grid>
			</Container>
		</Layout>
	);
}

export const patientPageQuery = graphql`
	query {
		contentfulPatientPage {
			firstTwoColumnSection {
				title
				list
				description {
					description
				}
				button
			}
			benefitSection {
				divider
				description {
					description
				}
				title
			}
			testimonialsSection {
				author
				description {
					description
				}
				designation
				isPerson
			}
			faqSection {
				answers {
					answers
				}
				question
			}
		}
	}
`;
