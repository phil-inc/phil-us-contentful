import {Box, Text, Accordion, List, Anchor, Group, Divider, Grid, createStyles} from '@mantine/core';
import {IconChevronDown} from '@tabler/icons';
import {footerBackground} from 'assets/images';
import Asset from 'components/common/Asset/Asset';
import ImageContainer from 'components/common/Container/ImageContainer';
import HubspotNewsletter from 'components/common/HubspotForm/HubspotNewsletter';
import {HCP_PAGE} from 'constants/page';
import {Link} from 'gatsby';
import {StaticImage} from 'gatsby-plugin-image';
import React from 'react';
import {type TAsset} from 'types/asset';
import {type ContentfulPage} from 'types/page';
import {type IReferencedSection} from 'types/section';
import {getFinalIndex} from 'utils/getFinalIndex';
import {getPathForSectionAndPage} from 'utils/links';

type TMobileFooter = {
	pages: ContentfulPage[];
	footer: {
		badge: TAsset[];
		navigationLinks: ContentfulPage[];
	};
};

const useStyles = createStyles(theme => ({
	footer: {
		[theme.fn.smallerThan('md')]: {
			display: 'none',
		},
	},

	inner: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

		[theme.fn.smallerThan('sm')]: {
			flexDirection: 'column',
		},
	},

	links: {
		color: 'white',
		fontSize: 12,
	},

	footLinkHeader: {
		fontFamily: 'Lato',
		fontWeight: 700,
		margin: '10px 0',
		textDecoration: 'none',
		color: '#00201F',
	},

	footerLink: {
		textDecoration: 'none',
		color: '#00201F',
		fontSize: '14px',
		lineHeight: '40px',
	},

	footerWrapper: {
		padding: '85px 175px',
		backgroundImage: `url("${footerBackground as string}")`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'bottom -420px right -220px',

		[theme.fn.smallerThan('lg')]: {
			padding: '40px ',
			backgroundPosition: 'bottom -522px right -561px',
		},
	},
	burger: {
		[theme.fn.largerThan('md')]: {
			display: 'none !important',
		},
	},
	drawer: {
		[theme.fn.largerThan('md')]: {
			display: 'none',
		},
	},

	drawerTitle: {
		width: '100%',
		margin: 0,
	},

	textDecorationNone: {
		textDecoration: 'none',
		color: 'white',
	},
}));

const MobileFooter: React.FC<TMobileFooter> = ({pages, footer}) => {
	const {classes} = useStyles();

	return (
		<Box className={classes.drawer}>
			<Accordion styles={{content: {padding: 0}}} chevron={<IconChevronDown size={24} />} mb={15}>
				{pages.map(page => (
					<Accordion.Item key={page.id + 'mapFooterPagesMobile'} value={page.title}>
						<Accordion.Control px={0}>
							<Text weight='bold' size={18}>
								{page.title}
							</Text>
						</Accordion.Control>
						<Accordion.Panel>
							<List mb={16} listStyleType={'none'}>
								{page.sections
									.filter(section =>
										Boolean(
											section.header?.length
												&& !section.isHidden
												&& !(section as IReferencedSection)?.hideNavigationAnchor,
										),
									)
									.map((section, index) => {
										const path = getPathForSectionAndPage(page.title, section.header);

										return (
											<React.Fragment key={section.id + 'mapFooterSectionsMobile'}>
												<List.Item>
													<Link to={path} style={{textDecoration: 'none'}}>
														<Text className={classes.footerLink}>{section.header.replace(':', '')}</Text>
													</Link>
												</List.Item>

												{/* Patient login on accordian on patients page */}
												{page.title === 'Patients' && index === getFinalIndex(page) && (
													<List.Item>
														<Anchor
															href='https://my.phil.us/'
															target='_blank'
															style={{textDecoration: 'none'}}
														>
															<Text className={classes.footerLink}>Patient Log In</Text>
														</Anchor>
													</List.Item>
												)}

												{/* HCP login on accordian on HCP page */}
												{page.title === HCP_PAGE && index === getFinalIndex(page) && (
													<List.Item>
														<Anchor
															href='https://md.phil.us/'
															target='_blank'
															style={{textDecoration: 'none'}}
														>
															<Text className={classes.footerLink}>HCP Log In</Text>
														</Anchor>
													</List.Item>
												)}

												{/* Socials on contact accordian on mobile */}
												{page.title === 'Contact' && index === page.sections.length - 1 && (
													<List.Item>
														<Group>
															<Anchor href='https://www.linkedin.com/company/phil-inc-' target='_blank'>
																<div>
																	<StaticImage
																		src='../../../assets/images/linkedin.svg'
																		alt='LinkedIn Icon'
																	/>
																</div>
															</Anchor>
														</Group>
													</List.Item>
												)}
											</React.Fragment>
										);
									})}
							</List>
						</Accordion.Panel>
					</Accordion.Item>
				))}
			</Accordion>
			<Box>
				<Text size={'lg'} className={classes.footLinkHeader}>
					Newsletter
				</Text>
				<Divider my={10} color='#6A7979' />
				<HubspotNewsletter />
				<Grid mt={60} align={'center'} justify='center'>
					{footer.badge.map(badge => (
						<Grid.Col key={badge.file.url + 'mapBadgeMobile'} span={4}>
							<Box sx={{maxWidth: 120}}>
								<ImageContainer background='transparent' fluid>
									<Asset asset={badge} />
								</ImageContainer>
							</Box>
						</Grid.Col>
					))}
				</Grid>
			</Box>
		</Box>
	);
};

export default MobileFooter;
