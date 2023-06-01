import {Grid, Box, Divider, List, Anchor, Group, Text, createStyles} from '@mantine/core';
import Asset from 'components/common/Asset/Asset';
import ImageContainer from 'components/common/Container/ImageContainer';
import {HCP_PAGE, RESOURCES} from 'constants/page';
import {Link} from 'gatsby';
import {StaticImage} from 'gatsby-plugin-image';
import React from 'react';
import slugify from 'slugify';
import {type TAsset} from 'types/asset';
import {type ContentfulPage} from 'types/page';
import {getPathForSectionAndPage} from 'utils/links';
import {footerBackground} from 'assets/images';
import HubspotNewsletter from 'components/common/HubspotForm/HubspotNewsletter';
import {type IReferencedSection} from 'types/section';

type TDesktopFooter = {
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

const DesktopFooter: React.FC<TDesktopFooter> = ({pages, footer}) => {
	const {classes} = useStyles();

	return (
		<Grid className={classes.footer} gutter={'xl'}>
			{pages.map(page => {
				const [firstSection = {header: '#'}] = page.sections;

				let path: string;
				if (page.title === 'Home') {
					path = '/';
				} else {
					const slug = slugify(page.title, {lower: true, strict: true});

					if (page.title === RESOURCES) {
						const sectionSlug = slugify(firstSection.header, {lower: true, strict: true});
						path = `/${slug}/${sectionSlug}`;
					} else {
						path = `/${slug}`;
					}
				}

				return (
					<Grid.Col key={page.id + 'mapFooterPages'} span={3}>
						<Box sx={{width: '80%'}}>
							<Link to={path} style={{textDecoration: 'none'}}>
								<Text span size={'lg'} className={classes.footLinkHeader}>
									{page.title}
								</Text>
							</Link>
							<Divider my={10} color='#6A7979' />
							{page.sections
								.filter(section =>
									Boolean(
										section.header?.length
											&& !section.isHidden
											&& !(section as IReferencedSection)?.hideNavigationAnchor,
									),
								)
								.map((section, index, array) => {
									const path = getPathForSectionAndPage(page.title, section.header);

									return (
										<React.Fragment key={section.id + 'mapFooterSections'}>
											<List listStyleType='none'>
												<List.Item>
													<Link to={path} style={{textDecoration: 'none'}}>
														<Text className={classes.footerLink}>{section.header.replace(':', '')}</Text>
													</Link>
												</List.Item>
											</List>
											{/* Patients section mapping extra elements */}
											{page.title === 'Patients' && index === array.length - 1 && (
												<List listStyleType='none'>
													<List.Item>
														<Anchor
															href='https://my.phil.us/'
															target='_blank'
															style={{textDecoration: 'none'}}
														>
															<Text className={classes.footerLink}>Patient Log In</Text>
														</Anchor>
													</List.Item>
												</List>
											)}

											{/* HCP section mapping extra elements */}
											{page.title === HCP_PAGE && index === array.length - 1 && (
												<List listStyleType='none'>
													<List.Item>
														<Anchor
															href='https://md.phil.us/'
															target='_blank'
															style={{textDecoration: 'none'}}
														>
															<Text className={classes.footerLink}>HCP Log In</Text>
														</Anchor>
													</List.Item>
												</List>
											)}

											{/* Contact section mapping extra elements */}
											{page.title === 'Contact' && (
												<Group mt={18}>
													<Anchor href='https://www.linkedin.com/company/phil-inc-' target='_blank'>
														<div>
															<StaticImage
																src='../../../assets/images/linkedin.svg'
																alt='LinkedIn Icon'
															/>
														</div>
													</Anchor>
												</Group>
											)}
										</React.Fragment>
									);
								})}
						</Box>
					</Grid.Col>
				);
			})}
			<Grid.Col span={3}>
				<Box sx={{width: '80%'}}>
					<Text size={'lg'} mt={0} className={classes.footLinkHeader}>
						Newsletter
					</Text>
					<Divider my={10} color='#6A7979' />
					<HubspotNewsletter />
					<Grid mt={60} align={'center'} justify='center'>
						{footer.badge.map(badge => (
							<Grid.Col key={badge.file.url + 'mapBadge'} span={6}>
								<Box sx={{maxWidth: 120}}>
									<ImageContainer background='transparent' fluid>
										<Asset asset={badge} />
									</ImageContainer>
								</Box>
							</Grid.Col>
						))}
					</Grid>
				</Box>
			</Grid.Col>
		</Grid>
	);
};

export default DesktopFooter;
