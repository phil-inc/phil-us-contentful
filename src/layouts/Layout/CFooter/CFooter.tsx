import React from 'react';
import {createStyles, Text, Container, Center} from '@mantine/core';
import {footerBackground} from 'assets/images';
import {graphql, Link, StaticQuery} from 'gatsby';
import type {TAsset} from 'types/asset';
import type {ContentfulPage} from 'types/page';
import MobileFooter from './MobileFooter';
import DesktopFooter from './DesktopFooter';

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

type FooterProps = {
	allContentfulFooter: {nodes: Array<{badge: TAsset[]; navigationLinks: ContentfulPage[]}>};
	allContentfulResource: {nodes: Array<{id: string; heading: string; relatesTo: {id: string; header: string}}>};
	minimal: boolean;
};

const Footer: React.FC<FooterProps> = ({allContentfulFooter, minimal}) => {
	const {classes} = useStyles();

	const [footer] = allContentfulFooter.nodes;
	const pages = footer.navigationLinks;

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
			<Container fluid style={{background: '#00827E'}} py={14}>
				<Center>
					<Text className={classes.links}>
						© Phil, Inc. |{' '}
						<Link to='/terms' className={classes.textDecorationNone}>
							Terms of Use
						</Link>{' '}
						|{' '}
						<Link to='/privacy' className={classes.textDecorationNone}>
							Privacy Policy
						</Link>{' '}
						|{' '}
						<Link to='/hipaa' className={classes.textDecorationNone}>
							HIPAA Notice
						</Link>
					</Text>
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

export default React.memo(CFooter);
