import {
	Text,
	Drawer,
	Group,
	Anchor,
	Button,
	Box,
	Burger,
	ScrollArea,
	Accordion,
	Table,
	createStyles,
	useMantineTheme,
} from '@mantine/core';
import {IconChevronDown} from '@tabler/icons';
import Asset from 'components/common/Asset/Asset';
import ImageContainer from 'components/common/Container/ImageContainer';
import {Link} from 'gatsby';
import React from 'react';
import slugify from 'slugify';
import {getPathForSectionAndPage} from 'utils/links';
import {navigateToPage} from 'utils/navigateToPage';
import {Link as ScrollToElement} from 'react-scroll';
import HeaderContext from 'contexts/HeaderProvider';
import {type IReferencedSection} from 'types/section';
import {COMPANY_PAGE, PATIENTS_PAGE} from 'constants/page';
import {getFinalIndex} from 'utils/getFinalIndex';
import {CAREERS} from 'constants/routes';

const useStyles = createStyles((theme, {minimal}: {minimal: boolean}) => ({
	burger: {
		[theme.fn.largerThan('md')]: {
			display: 'none !important',
		},
	},

	drawerWrapper: {
		padding: `${theme.spacing.sm + 10}px 100px  !important`,

		[theme.fn.smallerThan('md')]: {
			padding: `${theme.spacing.sm + 10}px 100px  !important`,
			paddingTop: '0px !important',
		},

		[theme.fn.smallerThan('sm')]: {
			padding: `${theme.spacing.sm + 10}px 16px  !important`,
			paddingTop: '0px !important',
		},
	},

	drawer: {
		[theme.fn.largerThan('md')]: {
			display: 'none',
		},
	},

	drawerHeader: {
		marginBottom: 0,
	},

	drawerTitle: {
		width: '100%',
		margin: 0,
	},

	accordionControl: {
		paddingLeft: 0,
		paddingRight: 0,
	},

	accordionContent: {
		paddingLeft: 0,
		paddingRight: 0,
	},

	patientLoginButton: {
		'&:hover': {
			backgroundColor: theme.colors.philBranding[9],
			color: 'white',
		},
	},

	patientLoginButtonMobile: {
		'&:hover': {
			backgroundColor: theme.colors.philBranding[9],
			color: 'white',
		},

		[theme.fn.largerThan('md')]: {
			display: 'none',
		},
	},

	logo: {
		maxWidth: 125,
		maxHeight: 90,

		width: '100%',

		[theme.fn.smallerThan('md')]: {
			width: 100,
			marginRight: 25,
		},
	},

	hideOnLarge: {
		[theme.fn.largerThan('md')]: {
			display: 'none',
		},
	},
}));

/**
 * Represents a custom drawer component.
 * @component
 */
const CDrawer: React.FC = () => {
	const {allContentfulResource, header, isDrawer, minimal, pages, toggleDrawer} = React.useContext(HeaderContext);
	const {classes} = useStyles({minimal});
	const theme = useMantineTheme();

	return (
		<Drawer
			className={classes.drawer}
			classNames={{
				title: classes.drawerTitle,
				drawer: classes.drawerWrapper,
				header: classes.drawerHeader,
			}}
			opened={isDrawer}
			onClose={() => {
				toggleDrawer(false);
			}}
			withCloseButton={false}
			title={
				<Group position='apart' noWrap align='center' mt={9}>
					<Anchor href='https://my.phil.us' target='_blank' className={classes.hideOnLarge}>
						<Button
							size='sm'
							uppercase
							variant='outline'
							px={4}
							color='philBranding'
							className={classes.patientLoginButtonMobile}
						>
							Patient Login
						</Button>
					</Anchor>
					<Box className={classes.logo}>
						<Link to='/'>
							<ImageContainer ratio={125 / 90} contain fluid background='transparent'>
								<Asset asset={header.logo} />
							</ImageContainer>
						</Link>
					</Box>
					<Burger
						opened={true}
						onClick={() => {
							toggleDrawer();
						}}
						className={classes.burger}
					/>
				</Group>
			}
			size='full'
			transition='fade'
		>
			<ScrollArea style={{height: 'calc(100vh - 100px)'}} type='never'>
				<Accordion
					mb={16}
					classNames={{control: classes.accordionControl, content: classes.accordionContent}}
					chevron={<IconChevronDown size={24} />}
				>
					{pages
						.filter(page => page.title !== 'Home')
						.map(page => (
							<Accordion.Item key={page.id + 'mapHeaderPagesDrawer'} value={page.title}>
								<Accordion.Control>
									<Text weight='bold' size={18}>
										{page.title}
									</Text>
								</Accordion.Control>
								<Accordion.Panel>
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
												<React.Fragment key={section.id + 'mapHeaderPageSectionsDrawer'}>
													<Table mb={16}>
														<thead>
															<tr>
																{/* All sections except for the first */}

																<th style={{paddingLeft: 0, paddingRight: 0}}>
																	{page.title === document.title && page.title !== 'Resources' ? (
																		<ScrollToElement
																			to={path}
																			spy={true}
																			smooth={true}
																			style={{
																				textDecoration: 'none',
																				cursor: 'pointer',
																			}}
																		>
																			<Text
																				size={16}
																				weight={400}
																				color={theme.colors.primary[0]}
																				onClick={() => {
																					toggleDrawer(false);
																				}}
																			>
																				{section.header}
																			</Text>
																		</ScrollToElement>
																	) : (
																		<Link to={path} style={{textDecoration: 'none'}}>
																			<Text
																				size={16}
																				weight={400}
																				color={theme.colors.primary[0]}
																				onClick={() => {
																					toggleDrawer(false);
																				}}
																			>
																				{section.header}
																			</Text>
																		</Link>
																	)}
																</th>
															</tr>
														</thead>

														{/* Blog pages attached to a section */}
														<tbody>
															{allContentfulResource.nodes
																.filter(resource => resource.relatesTo)
																.map(
																	({id, heading, relatesTo}) =>
																		section.id === relatesTo.id && (
																			<Link
																				key={id + 'mapResourceDrawer'}
																				to={navigateToPage(
																					`${slugify(page.title, {
																						lower: true,
																					})}/${slugify(relatesTo.header, {
																						lower: true,
																					})}/${slugify(heading, {lower: true})}`,
																				)}
																				style={{textDecoration: 'none'}}
																			>
																				<Text
																					size={14}
																					weight={400}
																					color={theme.colors.primary[0]}
																					mt={24}
																				>
																					{heading}
																				</Text>
																			</Link>
																		),
																)}
														</tbody>
													</Table>

													{/* Add Patient Login to mobile drawer under patiens accordian */}
													{page.title === PATIENTS_PAGE && index === getFinalIndex(page) && (
														<Table mb={16}>
															<thead>
																<tr>
																	<th style={{paddingLeft: 0, paddingRight: 0}}>
																		<Anchor
																			href='https://my.phil.us/'
																			target='_blank'
																			style={{textDecoration: 'none'}}
																		>
																			<Text size={16} weight={400} color={theme.colors.primary[0]}>
																				Patient Log In
																			</Text>
																		</Anchor>
																	</th>
																</tr>
															</thead>
														</Table>
													)}

													{/* Add Careers mobile drawer under company accordian */}
													{page.title === COMPANY_PAGE && index === getFinalIndex(page) && (
														<Table mb={16}>
															<thead>
																<tr>
																	<th style={{paddingLeft: 0, paddingRight: 0}}>
																		<Link to={CAREERS} style={{textDecoration: 'none'}}>
																			<Text size={16} weight={400} color={theme.colors.primary[0]}>
																				Careers
																			</Text>
																		</Link>
																	</th>
																</tr>
															</thead>
														</Table>
													)}
												</React.Fragment>
											);
										})}
								</Accordion.Panel>
							</Accordion.Item>
						))}
				</Accordion>
			</ScrollArea>
		</Drawer>
	);
};

export default CDrawer;
