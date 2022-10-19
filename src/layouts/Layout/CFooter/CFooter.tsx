import {createStyles, Anchor, Group, Grid, Text, Divider, List, Container, Navbar} from '@mantine/core';
import {graphql, StaticQuery} from 'gatsby';
import React from 'react';
import type {TAsset} from 'types/asset';
import type {ContentfulPage} from 'types/page';

const useStyles = createStyles(theme => ({
	footer: {
		borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
		background: '#00827e',
		color: 'white',
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
		[theme.fn.smallerThan('sm')]: {
			marginTop: theme.spacing.lg,
			marginBottom: theme.spacing.sm,
		},
		color: 'white',
	},

	footLinkHeader: {
		fontFamily: 'Lato',
		fontWeight: 700,
		margin: '10px 0',
	},

	footerLink: {
		margin: '14px 0',
	},

	footerWrapper: {
		padding: '85px 0',
	},
}));

type FooterProps = {
	allContentfulFooter: {nodes: Array<{badge: TAsset[]; navigationLinks: ContentfulPage[]}>};
	allContentfulResource: {nodes: Array<{id: string; heading: string; relatesTo: {id: string; header: string}}>};
};

const Footer: React.FC<FooterProps> = ({allContentfulFooter, allContentfulResource}) => {
	const {classes} = useStyles();
	// Deprecate
	// const items = links.map(link => (
	// 	<Anchor<'a'>
	// 		className={classes.links}
	// 		key={link.label}
	// 		href={link.link}
	// 		sx={{lineHeight: 1}}
	// 		onClick={event => {
	// 			event.preventDefault();
	// 		}}
	// 		size='sm'
	// 	>
	// 		{link.label}
	// 	</Anchor>
	// ));

	console.log({allContentfulFooter, allContentfulResource});
	const [footer] = allContentfulFooter.nodes;
	const pages = footer.navigationLinks;

	return (
		<>
			<Container size={'xl'} className={classes.footerWrapper}>
				<Grid gutter={'xl'}>
					{pages.map(page => (
						<Grid.Col span={3}>
							<Text key={page.id} size={'lg'} className={classes.footLinkHeader}>
								{page.title}
							</Text>
							<Divider my={10} mr={80} color='dark' />
							{page.sections
								.filter(section => section.header?.length)
								.map(section => (
									<>
										<List listStyleType='none'>
											<List.Item>
												<Text className={classes.footerLink}>{section.header}</Text>
											</List.Item>
										</List>
									</>
								))}
						</Grid.Col>
					))}
				</Grid>
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
						}
						... on ContentfulSection {
							id
							header
						}
					}
				}
				badge {
					gatsbyImageData(resizingBehavior: FILL, placeholder: BLURRED, layout: CONSTRAINED)
				}
			}
		}
		allContentfulResource(filter: {relatesTo: {id: {ne: null}}, node_locale: {eq: "en-US"}}) {
			nodes {
				id
				heading
				relatesTo {
					id
					header
				}
			}
		}
	}
`;

export const CFooter: React.FC = () => <StaticQuery query={query} render={Footer} />;
