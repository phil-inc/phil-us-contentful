import {Collapse, Container, Grid, Divider, Anchor} from '@mantine/core';
import {COMPANY_PAGE, PATIENTS_PAGE} from 'constants/page';
import HeaderContext from 'contexts/HeaderProvider';
import {Link} from 'gatsby';
import React from 'react';
import {getPathForSectionAndPage} from 'utils/links';
import {getFinalIndex} from 'utils/getFinalIndex';
import {CAREERS} from 'constants/routes';

import * as classes from './collapse.module.css';
import { IReferencedSection } from 'types/section';

/**
 * Represents a custom collapse component to be used in the top navbar.
 * @component
 */
const CCollapse = () => {
	const {opened, target, pages, setCollapseRef, close} = React.useContext(HeaderContext);

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
									Boolean(section.header?.length && !section.isHidden && !section?.hideNavigationAnchor)
								)
								.map((section, index) => {
									const path = getPathForSectionAndPage(page.title, section.header, page.slug);

									return (
										<React.Fragment key={section.id + 'mapCollapsePages'}>
											<Grid.Col span="auto">
												<Link onClick={close} to={path} className={classes.listHeading}>
													{(section as IReferencedSection)?.headerAlias || section.header}
												</Link>

												<Divider />
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
