import React from 'react';
import {Text, Container, Group, Box, Divider} from '@mantine/core';
import {graphql, Link, StaticQuery} from 'gatsby';
import type {TAsset} from 'types/asset';
import type {ContentfulPage} from 'types/page';
import MobileFooter from './MobileFooter';
import DesktopFooter from './DesktopFooter';
import * as classes from './cfooter.module.css';
import ImageContainer from 'components/common/Container/ImageContainer';
import Asset from 'components/common/Asset/Asset';
import isMobileView from 'hooks/useView';

type FooterProps = {
	allContentfulFooter: {nodes: Array<{badge: TAsset[]; navigationLinks: ContentfulPage[]}>};
	allContentfulResource: {nodes: Array<{id: string; heading: string; relatesTo: {id: string; header: string}}>};
	minimal: boolean;
};

const Footer: React.FC<FooterProps> = ({allContentfulFooter, minimal}) => {
	const [footer] = allContentfulFooter.nodes;
	const pages = footer.navigationLinks;
	const isMobile = isMobileView('xs');

	console.log({footer});

	const links = [
		{
			label: !isMobile && !minimal ? 'Copyright 2023, Phil Inc.' : '© Phil, Inc.',
		},
		{
			label: 'Terms of Use',
			link: '/terms',
		},
		{
			label: 'Privacy Policy',
			link: '/privacy',
		},
		{
			label: 'HIPAA Notice',
			link: '/hipaa',
		},
	];

	const renderFooterItem = (item, key) => {
		if (item.link) {
			return (
				<Link data-minimal={minimal} key={key} to={item.link} className={classes.links}>
					{item.label}
				</Link>
			);
		}

		return (
			<Text data-minimal={minimal} key={key} fw={400} component="span" className={classes.texts} unstyled>
				{item.label}
			</Text>
		);
	};

	const children = links.map((item, index) => (
		<React.Fragment key={index}>
			{renderFooterItem(item, index)}
			{index < links.length - 1 && (isMobile || minimal) && <span className={classes.pipe}> | </span>}
		</React.Fragment>
	));

	return (
		<>
			{!minimal && (
				<Container py={80} fluid p={{base: 16, sm: 100}}>
					{isMobile ? (
						<MobileFooter footer={footer} pages={pages} />
					) : (
						<DesktopFooter pages={pages} footer={footer} />
					)}
				</Container>
			)}

			{/* Bottom Footer */}
			{!isMobile && !minimal && <Divider className={classes.divider} mx={100} />}

			<Container data-minimal={minimal} fluid className={classes.bottomFooter}>
				<Group gap={isMobile ? 2 : 0} justify={isMobile || minimal ? 'center' : 'space-between'}>
					{!isMobile && !minimal && (
						<Group gap={9}>
							{footer.badge.map(badge => (
								<Box className={classes.badge}>
									<ImageContainer background="transparent" fluid>
										<Asset asset={badge} objectFit="contain" />
									</ImageContainer>
								</Box>
							))}
						</Group>
					)}

					{isMobile || minimal ? children : <Box className={classes.textsWrapper}>{children}</Box>}
				</Group>
			</Container>
		</>
	);
};

const query = graphql`
	{
		allContentfulFooter(filter: {node_locale: {eq: "en-US"}}) {
			nodes {
				id
				title
				navigationLinks {
					slug
					id
					title
					sys {
						contentType {
							sys {
								id
								type
							}
						}
					}
					sections {
						... on ContentfulReferencedSection {
							id
							header
							isHidden
							hideNavigationAnchor
						}
						... on ContentfulSection {
							id
							header
							isHidden
						}
					}
				}
				badge {
					file {
						contentType
						url
						details {
							size
						}
					}
					gatsbyImageData(resizingBehavior: FILL, placeholder: BLURRED, layout: CONSTRAINED)
				}
			}
		}
		allContentfulResource(filter: {node_locale: {eq: "en-US"}}) {
			nodes {
				id
				heading
				relatesTo {
					... on ContentfulReferencedSection {
						id
						header
						isHidden
						hideNavigationAnchor
					}
					... on ContentfulSection {
						id
						header
						isHidden
					}
				}
			}
		}
	}
`;

const CFooter: React.FC<{minimal: boolean}> = ({minimal = false}) => (
	<StaticQuery query={query} render={props => <Footer minimal={minimal} {...props} />} />
);

export default CFooter;
