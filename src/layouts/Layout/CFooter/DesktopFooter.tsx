import {Grid, Box, Divider, List, Anchor, Group, Text, SimpleGrid} from '@mantine/core';
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
	<SimpleGrid className={classes.footer} cols={{base: 4, sm: 2, md: 3, lg: 4}} verticalSpacing={80} spacing={40}>
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
				<Box key={page.id + 'mapFooterPages'} className={classes.column}>
					<Box style={{width: '80%'}}>
						<Link to={path} className={classes.link}>
							<Text className={classes.header} unstyled>
								{page.title}
							</Text>
						</Link>
						<List listStyleType="none" spacing={24}>
							{page.sections
								.filter(section =>
									Boolean(
										section.header?.length &&
											!section.isHidden &&
											!(section as IReferencedSection)?.hideNavigationAnchor
									)
								)
								.map((section, index, array) => {
									const path = getPathForSectionAndPage(page.title, section.header, page.slug);

									return (
										<React.Fragment key={section.id + 'mapFooterSections'}>
											<List.Item>
												<Link to={path} className={classes.link}>
													<Text unstyled>{section.header.replace(':', '')}</Text>
												</Link>
											</List.Item>

											{/* Careers on accordian on company page */}
											{page.title === COMPANY_PAGE && index === getFinalIndex(page) && (
												<List.Item>
													<Link to={CAREERS} className={classes.link}>
														<Text unstyled>Careers</Text>
													</Link>
												</List.Item>
											)}

											{/* Patients section mapping extra elements */}
											{page.title === PATIENTS_PAGE && index === getFinalIndex(page) && (
												<List.Item>
													<Anchor
														className={classes.link}
														href="https://my.phil.us/"
														target="_blank"
														referrerPolicy="no-referrer"
														underline='never'
														unstyled
													>
														<Text unstyled>Patient Log In</Text>
													</Anchor>
												</List.Item>
											)}
										</React.Fragment>
									);
								})}
						</List>
					</Box>
				</Box>
			);
		})}
		<Box className={classes.column}>
			<Box style={{width: '80%'}}>
				<Text unstyled className={classes.header}>
					Connect with us
				</Text>
				<Group mt={18}>
					<Anchor
						href="https://www.linkedin.com/company/phil-inc-"
						target="_blank"
						referrerPolicy="no-referrer"
						className={classes.link}
					>
						<StaticImage src="../../../assets/images/linkedin.svg" alt="LinkedIn Icon" />
						<Text unstyled span data-manual-entry={true} className={classes.link}>
							Linkedin
						</Text>
					</Anchor>
				</Group>
			</Box>
		</Box>
	</SimpleGrid>
);

export default DesktopFooter;
