import {Box, Container, createStyles, Divider, Grid, Group, Loader, Title, Text} from '@mantine/core';
import Asset from 'components/common/Asset/Asset';
import ImageContainer from 'components/common/Container/ImageContainer';
import React from 'react';
import type {TAsset} from 'types/asset';
import {TResource} from 'types/resource';
import type {IReferencedSection} from 'types/section';
import CareerArticle from './CareerArticle';

const useStyles = createStyles(theme => ({
	body: {
		p: {
			marginTop: 0,
		},
	},
	container: {
		padding: '0 100px',
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			padding: '0 16px',
		},
	},

	section: {
		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			display: 'none',
		},
	},

	largeSection: {
		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			display: 'none',
		},
	},

	center: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
}));

type CareerSectionProps = {
	heroAsset: TAsset;
	careers: Record<string, Listing[]>;
	isLoading: boolean;
};

const CareerSection: React.FC<CareerSectionProps> = ({careers, isLoading, heroAsset}) => {
	const {classes} = useStyles();

	return (
		<Container id={'Career Section'} fluid className={classes.container}>
			<Grid gutter={60} pb={130} align='flex-start'>
				<Grid.Col orderSm={1} lg={6} md={6} sm={12}>
					<Box className={classes.center}>
						<Group align={'center'}>
							<Box>
								<Title order={2}>
									<Text>Careers at Phil</Text>
								</Title>
							</Box>
						</Group>
						{isLoading && <Loader color='dark' size='xl' variant='dots' style={{marginTop: '21px'}} />}
						{!isLoading
							&& Object.keys(careers).map((job, index) => (
								<Box mt={index === 1 ? 21 : 0} mb={50}>
									<Title order={3} style={{lineHeight: '1'}}>
										{job}
									</Title>
									<Divider variant='dashed' size={1} mt={10} mb={32} />
									{careers[job].map(listing => (
										<Box mb={26}>
											<CareerArticle
												title={listing.title}
												url={listing.url}
												location={listing.location.location_str}
											/>
										</Box>
									))}
								</Box>
							))}
					</Box>
				</Grid.Col>
				<Grid.Col orderSm={2} lg={6} md={6} sm={12} span='content'>
					<ImageContainer fluid>
						<Asset asset={heroAsset} />
					</ImageContainer>
				</Grid.Col>
			</Grid>
		</Container>
	);
};

export default CareerSection;
