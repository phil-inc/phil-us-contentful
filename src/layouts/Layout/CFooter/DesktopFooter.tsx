import {Grid, Box, Divider, List, Anchor, Group, Text} from '@mantine/core';
import Asset from 'components/common/Asset/Asset';
import ImageContainer from 'components/common/Container/ImageContainer';
import {COMPANY_PAGE, HCP_PAGE, PATIENTS_PAGE, RESOURCES} from 'constants/page';
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
import {getFinalIndex} from 'utils/getFinalIndex';
import {CAREERS} from 'constants/routes';

import * as classes from './desktopFooter.module.css';

type TDesktopFooter = {
	pages: ContentfulPage[];
	footer: {
		badge: TAsset[];
		navigationLinks: ContentfulPage[];
	};
};

const DesktopFooter: React.FC<TDesktopFooter> = ({pages, footer}) => (
	<Grid className={classes.footer} gutterXl={'lg'} gutter={'md'}>
		{pages.map(page => {
			const [firstSection = {header: '#'}] = page.sections;

			let path: string;
			if (page.title === 'Home') {
				path = '/';
			} else {
				const slug = slugify(page.slug, {lower: true, strict: true});

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
								const path = getPathForSectionAndPage(page.title, section.header, page.slug);

								return (
									<React.Fragment key={section.id + 'mapFooterSections'}>
										<List listStyleType='none'>
											<List.Item>
												<Link to={path} style={{textDecoration: 'none'}}>
													<Text className={classes.footerLink}>{section.header.replace(':', '')}</Text>
												</Link>
											</List.Item>

											{/* Careers on accordian on company page */}
											{page.title === COMPANY_PAGE && index === getFinalIndex(page) && (
												<List.Item>
													<Link to={CAREERS} style={{textDecoration: 'none'}}>
														<Text className={classes.footerLink}>Careers</Text>
													</Link>
												</List.Item>
											)}

											{/* Patients section mapping extra elements */}
											{page.title === PATIENTS_PAGE && index === getFinalIndex(page) && (
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
										</List>

										{/* Contact section mapping extra elements */}
										{page.title === 'Contact' && (
											<Group mt={18}>
												<Anchor href='https://www.linkedin.com/company/phil-inc-' target='_blank'>
													<div>
														<StaticImage src='../../../assets/images/linkedin.svg' alt='LinkedIn Icon' />
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
									<Asset asset={badge} objectFit='contain' />
								</ImageContainer>
							</Box>
						</Grid.Col>
					))}
				</Grid>
			</Box>
		</Grid.Col>
	</Grid>
);

export default DesktopFooter;
