import {Text, Collapse, Container, List, Grid, Divider, Anchor} from '@mantine/core';
import {COMPANY_PAGE, PATIENTS_PAGE} from 'constants/page';
import HeaderContext from 'contexts/HeaderProvider';
import {Link} from 'gatsby';
import React from 'react';
import slugify from 'slugify';
import {getPathForSectionAndPage} from 'utils/links';
import {navigateToPage} from 'utils/navigateToPage';
import {type IReferencedSection} from 'types/section';
import {getFinalIndex} from 'utils/getFinalIndex';
import {CAREERS} from 'constants/routes';

import * as classes from './collapse.module.css';

/**
 * Represents a custom collapse component to be used in the top navbar.
 * @component
 */
const CCollapse = () => {
	const {allContentfulResource, opened, target, minimal, pages, setCollapseRef, close} =
		React.useContext(HeaderContext);
	// const {classes} = useStyles({minimal});

	return (
		<Collapse
			in={opened}
			className={classes.collapse}
			transitionDuration={150}
			transitionTimingFunction="ease-out"
			animateOpacity={false}
			ref={setCollapseRef}
		>
			<Container className={classes.container} fluid>
				<Grid px={98} py={78} justify="space-between">
					{pages
						.filter(page => page.title === target)
						.map(page =>
							page.sections
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
										<React.Fragment key={section.id + 'mapCollapsePages'}>
											<Grid.Col span="auto">
												<Link onClick={close} to={path} className={classes.listHeading}>
													{section.header}
												</Link>

												<Divider />
												{/* <List listStyleType='none'>
															{allContentfulResource.nodes
																.filter(resource => resource.relatesTo)
																.map(
																	({id, heading, relatesTo}) =>
																		section.id === relatesTo.id && (
																			<List.Item key={id + 'mapCollapseResources'}>
																				<Text className={classes.listItems}>
																					<Link
																						to={navigateToPage(
																							`${slugify(page.slug, {
																								lower: true,
																							})}/${slugify(relatesTo.header, {
																								lower: true,
																							})}/${slugify(heading, {lower: true})}`,
																						)}
																						className={classes.textDecorationNone}
																					>
																						{heading}
																					</Link>
																				</Text>
																			</List.Item>
																		),
																)}
														</List> */}
											</Grid.Col>

											{/* Add Patient Login Button to header nav collapse */}
											{page.title === PATIENTS_PAGE && index === getFinalIndex(page) && (
												<Grid.Col span="auto">
													<Anchor
														href="https://my.phil.us/"
														target="_blank"
														className={classes.listHeading}
														onClick={close}
													>
														<span className={classes.listHeading}>Patient Log In</span>
													</Anchor>
													<Divider />
												</Grid.Col>
											)}

											{/* Add Careers Button to header nav collapse under company */}
											{page.title === COMPANY_PAGE && index === getFinalIndex(page) && (
												<Grid.Col span="auto">
													<Link to={CAREERS} onClick={close} className={classes.listHeading}>
														Careers
													</Link>
													<Divider />
												</Grid.Col>
											)}
										</React.Fragment>
									);
								})
						)}
				</Grid>
			</Container>
		</Collapse>
	);
};

export default CCollapse;
