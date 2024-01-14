import React from 'react';
import {Text, Container, Center} from '@mantine/core';
import {footerBackground} from 'assets/images';
import {graphql, Link, StaticQuery} from 'gatsby';
import type {TAsset} from 'types/asset';
import type {ContentfulPage} from 'types/page';
import MobileFooter from './MobileFooter';
import DesktopFooter from './DesktopFooter';
import * as classes from './cfooter.module.css';

type FooterProps = {
	allContentfulFooter: {nodes: Array<{badge: TAsset[]; navigationLinks: ContentfulPage[]}>};
	allContentfulResource: {nodes: Array<{id: string; heading: string; relatesTo: {id: string; header: string}}>};
	minimal: boolean;
};

const Footer: React.FC<FooterProps> = ({allContentfulFooter, minimal}) => {
	const [footer] = allContentfulFooter.nodes;
	const pages = footer.navigationLinks;

	const links = [
		{
			label: '© Phil, Inc.',
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

	const renderFooterItem = (item, key) =>
		item.link ? (
			<Link key={key} to={item.link} className={classes.links}>
				{item.label}
			</Link>
		) : (
			<Text key={key} component='span' className={classes.texts} unstyled>
				{item.label}
			</Text>
		);

	return (
		<>
			{!minimal && (
				<Container fluid className={classes.footerWrapper}>
					{/* Desktop View */}
					<DesktopFooter pages={pages} footer={footer} />

					{/* Mobile View */}
					<MobileFooter footer={footer} pages={pages} />
				</Container>
			)}

			{/* Bottom Footer */}
			<Container fluid className={classes.bottomFooter}>
				<Center>
					{links.map((item, index) => (
						<React.Fragment key={index}>
							{renderFooterItem(item, index)}
							{index < links.length - 1 && <span className={classes.divider}> | </span>}
						</React.Fragment>
					))}
				</Center>
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
