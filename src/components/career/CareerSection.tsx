import {Box, Container, createStyles, Divider, Grid, Group, Loader, Title, Text} from '@mantine/core';
import Asset from 'components/common/Asset/Asset';
import ImageContainer from 'components/common/Container/ImageContainer';
import React from 'react';
import type {TAsset} from 'types/asset';
import {handleSpacing} from 'utils/handleSpacing';
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
			padding: `0 ${theme.spacing.sm}px`,
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
	const {classes, theme} = useStyles();

	return (
		<Container id={'Career Section'} fluid className={classes.container}>
			<Grid
				gutter={handleSpacing(theme, theme.spacing.lg)}
				pb={handleSpacing(theme, theme.spacing.xl)}
				align='flex-start'
			>
				<Grid.Col orderSm={1} lg={6} md={6} sm={12}>
					<Box className={classes.center}>
						<Group align={'center'} mb={28}>
							<Box>
								<Title order={1}>
									<Text>Careers at Phil</Text>
								</Title>
							</Box>
						</Group>
						{isLoading && (
							<Loader color='dark' size='xl' variant='dots' style={{marginTop: `${theme.spacing.sm}`}} />
						)}
						{!isLoading
							&& Object.keys(careers).map((job, index) => (
								<Box key={job} mt={index === 1 ? 21 : 0} mb={theme.spacing.lg}>
									<Title order={3} style={{lineHeight: '1'}}>
										{job}
									</Title>
									<Divider variant='dashed' size={1} mt={theme.spacing.xs} mb={theme.spacing.md} />
									{careers[job].map(listing => (
										<Box key={listing.url} mb={theme.spacing.md}>
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
				<Grid.Col orderSm={2} lg={6} md={6} sm={12}>
					<ImageContainer fluid>
						<Asset asset={heroAsset} />
					</ImageContainer>
				</Grid.Col>
			</Grid>
		</Container>
	);
};

export default React.memo(CareerSection);
