import {Text, Collapse, Container, List, Grid, Divider, Anchor, createStyles} from '@mantine/core';
import {HCP_PAGE} from 'constants/page';
import HeaderContext from 'contexts/HeaderProvider';
import {Link} from 'gatsby';
import React from 'react';
import slugify from 'slugify';
import {getPathForSectionAndPage} from 'utils/links';
import {navigateToPage} from 'utils/navigateToPage';
import {HEADER_HEIGHT} from './CHeader';

const useStyles = createStyles((theme, {minimal}: {minimal: boolean}) => ({
	collapse: {
		position: 'absolute',
		top: 90,
		left: 0,
		zIndex: 2,
		opacity: 1,
		width: '100%',
	},

	container: {
		width: '100vw',
		overflow: 'hidden',
		background: '#00827E',
	},

	listHeading: {
		color: 'white',
		fontSize: '16px',
		letterSpacing: '0.4px',
		lineHeight: '27px',
		marginBottom: '11px',
		fontFamily: 'Lato',
		fontWeight: 700,
		textDecoration: 'none',
	},

	listItems: {
		color: 'white',
		fontSize: '12px',
		letterSpacing: 0,
		lineHeight: '35px',
		margin: '8px 0',
		fontFamily: 'Lato',
		fontWeight: 400,
	},

	textDecorationNone: {
		textDecoration: 'none',
		color: 'inherit',
	},
}));

const CCollapse = () => {
	const {allContentfulResource, opened, target, minimal, pages, setCollapseRef, close}
		= React.useContext(HeaderContext);
	const {classes} = useStyles({minimal});

	return (
		<Collapse
			in={opened}
			className={classes.collapse}
			transitionDuration={150}
			transitionTimingFunction='ease-out'
			animateOpacity={false}
			ref={setCollapseRef}
		>
			<Container className={classes.container} fluid>
				<List listStyleType='none' size='xl' styles={{itemWrapper: {width: '100%'}}}>
					<Grid px={98} py={78} columns={100}>
						{pages
							.filter(page => page.title === target)
							.map(page =>
								page.sections
									.filter(section => Boolean(section.header?.length && !section.isHidden))
									.map((section, index, array) => {
										const path = getPathForSectionAndPage(page.title, section.header);

										return (
											<React.Fragment key={section.id + 'mapCollapsePages'}>
												<Grid.Col
													span={
														['Patients', HCP_PAGE].includes(page.title)
															? Math.floor(100 / (array.length + 1))
															: Math.floor(100 / array.length)
													}
												>
													<List.Item onClick={close}>
														<Text className={classes.listHeading}>
															<Link to={path} className={classes.textDecorationNone}>
																{section.header}
															</Link>
														</Text>

														<Divider />
														<List listStyleType='none'>
															{allContentfulResource.nodes
																.filter(resource => resource.relatesTo)
																.map(
																	({id, heading, relatesTo}) =>
																		section.id === relatesTo.id && (
																			<List.Item key={id + 'mapCollapseResources'}>
																				<Text className={classes.listItems}>
																					<Link
																						to={navigateToPage(
																							`${slugify(page.title, {
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
														</List>
													</List.Item>
												</Grid.Col>

												{page.title === 'Patients' && index === array.length - 1 && (
													<Grid.Col span={Math.floor(100 / (array.length + 1))}>
														<List.Item onClick={close}>
															<Text className={classes.listHeading}>
																<Anchor
																	href='https://my.phil.us/'
																	target='_blank'
																	className={classes.textDecorationNone}
																	style={{textDecoration: 'none'}}
																>
																	Patient Log In
																</Anchor>
															</Text>
															<Divider />
														</List.Item>
													</Grid.Col>
												)}

												{page.title === HCP_PAGE && index === array.length - 1 && (
													<Grid.Col span={Math.floor(100 / (array.length + 1))}>
														<List.Item onClick={close}>
															<Text className={classes.listHeading}>
																<Anchor
																	href='https://md.phil.us/'
																	target='_blank'
																	className={classes.textDecorationNone}
																	style={{textDecoration: 'none'}}
																>
																	HCP Log In
																</Anchor>
															</Text>
															<Divider />
														</List.Item>
													</Grid.Col>
												)}
											</React.Fragment>
										);
									}),
							)}
					</Grid>
				</List>
			</Container>
		</Collapse>
	);
};

export default CCollapse;
