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
	useMantineTheme,
	List,
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

import * as classes from './drawer.module.css';

/**
 * Represents a custom drawer component.
 * @component
 */
const CDrawer: React.FC = () => {
	const {allContentfulResource, header, isDrawer, minimal, pages, toggleDrawer, buttons} =
		React.useContext(HeaderContext);
	const theme = useMantineTheme();
	// const buttonConfig = {
	// 	primary: {variant: 'outline', size: 'md', uppercase: true},
	// 	secondary: {variant: 'default', size: 'md', uppercase: true},
	// };

	const buttonConfig = {
		primary: {variant: 'header-primary', size: 'md', uppercase: true},
		secondary: {variant: 'header-secondary', size: 'md', uppercase: true},
	};

	return (
		<Drawer
			classNames={{header: classes.drawerHeader, body: classes.drawerBody}}
			opened={isDrawer}
			onClose={() => {
				toggleDrawer(false);
			}}
			withCloseButton={false}
			// title={}
			size="100%"
			transitionProps={{transition: 'fade'}}
		>
			<Group justify="space-between" wrap="nowrap" align="center" mb="sm">
				<Anchor href="https://my.phil.us" target="_blank" className={classes.hideOnLarge}>
					<Button
						size="sm"
						radius={0}
						variant={
							buttons?.[0].buttonStyle === 'Primary' ? buttonConfig.primary.variant : buttonConfig.secondary.variant
						}
						px={4}
						className={classes.patientLoginButtonMobile}
					>
						Patient Login
					</Button>
				</Anchor>

				<Box className={classes.logo}>
					<Link to="/">
						<Asset asset={header.logo} objectFit="contain" />
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

			<Accordion
				mb={16}
				classNames={{
					control: classes.control,
					content: classes.content,
					label: classes.label,
					chevron: classes.chevron,
					item: classes.item,
				}}
				chevron={<IconChevronDown size={24} />}
			>
				{pages
					.filter(page => page.title !== 'Home')
					.map(page => (
						<Accordion.Item key={page.id + 'mapHeaderPagesDrawer'} value={page.title}>
							<Accordion.Control>{page.title}</Accordion.Control>
							<Accordion.Panel>
								<List spacing={0} listStyleType="none" mb="sm" classNames={{item: classes.listItem}}>
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
												<React.Fragment key={section.id + 'mapHeaderPageSectionsDrawer'}>
													<List.Item py="xs">
														{/* All sections except for the first */}

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
																{section.header}
															</ScrollToElement>
														) : (
															<Link to={path} className={classes.link}>
																{section.header}
															</Link>
														)}
													</List.Item>

													{/* Add Patient Login to mobile drawer under patiens accordian */}
													{page.title === PATIENTS_PAGE && index === getFinalIndex(page) && (
														<List.Item py="xs">
															<Anchor
																href="https://my.phil.us/"
																target="_blank"
																className={classes.link}
															>
																Patient Log In
															</Anchor>
														</List.Item>
													)}

													{/* Add Careers mobile drawer under company accordian */}
													{page.title === COMPANY_PAGE && index === getFinalIndex(page) && (
														<List.Item>
															<Link to={CAREERS} style={{textDecoration: 'none'}}>
																<Text size={'16px'} fw={'400'}>
																	Careers
																</Text>
															</Link>
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

			{buttons
				.filter((button, index) => index)
				.map((button, index) =>
					button.internalLink ? (
						<Box key={button.id} mt={index && 16}>
							<Link className={classes.link} to={button.internalLink.slug}>
								<Button
									size={
										button.buttonStyle === 'Primary' ? buttonConfig.primary.size : buttonConfig.secondary.size
									}
									variant={
										button.buttonStyle === 'Primary'
											? buttonConfig.primary.variant
											: buttonConfig.secondary.variant
									}
									fullWidth
								>
									{button.buttonText}
								</Button>
							</Link>
						</Box>
					) : (
						<Anchor
							className={classes.link}
							mt={index && 16}
							href={button.externalLink}
							target="_blank"
							underline="never"
						>
							<Button
								className={classes.link}
								size="md"
								radius={0}
								variant={buttonConfig.secondary.variant}
								fullWidth
							>
								{button.buttonText}
							</Button>
						</Anchor>
					)
				)}
		</Drawer>
	);
};

export default CDrawer;
