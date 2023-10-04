import React from 'react';
import {graphql} from 'gatsby';
import {Layout} from 'layouts/Layout/Layout';
import Expanded from 'components/common/Expanded/Expanded';
import {
	Title,
	Text,
	Grid,
	Box,
	AspectRatio,
	Group,
	List,
	Anchor,
	createStyles,
	Center,
	Loader,
	Container,
} from '@mantine/core';
import Asset from 'components/common/Asset/Asset';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import {BLOCKS, INLINES} from '@contentful/rich-text-types';
import {TAsset} from 'types/asset';
import {type Block} from '@contentful/rich-text-types';
import {parseScript} from 'utils/parseScript';
import {useHubspotForm} from '@aaronhayes/react-use-hubspot-form';
import {useId} from '@mantine/hooks';
import HubspotNewsletter from 'components/common/HubspotForm/HubspotNewsletter';
import HubspotForm from 'components/common/HubspotForm/HubspotForm';
import Speaker from 'components/common/Person/Speaker/Speaker';

const useStyles = createStyles(theme => ({
	bodyText: {
		fontSize: 18,

		[theme.fn.smallerThan('sm')]: {
			fontSize: 16,
			lineHeight: 1.4,
		},
	},

	border: {
		border: '2px solid black',
		padding: 10,
	},

	table: {
		borderCollapse: 'collapse',
		borderSpacing: 0,
	},

	tableHeader: {
		textAlign: 'start',
	},
	anchor: {
		color: '#00827E',
	},
	listItem: {
		overflow: 'hidden',
		fontSize: 24,

		'::marker': {
			fontSize: 16,
			fontWeight: 700,
		},
	},

	formWrapper: {
		padding: '44px 32px',
		background: '#F4F4F4',
	},
}));

const EventRegistration = ({data}) => {
	console.log({data});

	const {classes, cx} = useStyles();

	const options = {
		renderNode: {
			[BLOCKS.EMBEDDED_ASSET](node: {data: {target: TAsset}}) {
				return (
					<Box>
						<Asset asset={node.data.target} />
					</Box>
				);
			},
			[BLOCKS.PARAGRAPH](
				node: any,
				children:
					| string
					| number
					| boolean
					| React.ReactElement
					| React.ReactFragment
					| React.ReactPortal
					| undefined
					| undefined
			) {
				return (
					<Text component="p" mt={0} className={classes.bodyText}>
						{children}
					</Text>
				);
			},

			[BLOCKS.OL_LIST](
				node: any,
				children:
					| string
					| number
					| boolean
					| React.ReactElement
					| React.ReactFragment
					| React.ReactPortal
					| undefined
					| undefined
			) {
				return (
					<List type="ordered" mt={16} mb={32}>
						{children}
					</List>
				);
			},

			[BLOCKS.UL_LIST](
				node: any,
				children:
					| string
					| number
					| boolean
					| React.ReactElement
					| React.ReactFragment
					| React.ReactPortal
					| undefined
					| undefined
			) {
				return (
					<List type="unordered" listStyleType="disc" pl={32} mt={16} mb={44}>
						{children}
					</List>
				);
			},

			[BLOCKS.LIST_ITEM](
				node: any,
				children:
					| string
					| number
					| boolean
					| React.ReactElement
					| React.ReactFragment
					| React.ReactPortal
					| undefined
					| undefined
			) {
				return (
					<List.Item mt={8} mb={0} pr={20} className={classes.listItem}>
						{children}
					</List.Item>
				);
			},

			[INLINES.HYPERLINK](
				node: {data: {uri: string}},
				children:
					| string
					| number
					| boolean
					| React.ReactElement
					| React.ReactFragment
					| React.ReactPortal
					| undefined
					| undefined
			) {
				const {uri} = node.data as {uri: string};
				return (
					<Anchor href={uri} target="_blank" className={classes.anchor}>
						{children}
					</Anchor>
				);
			},
			[BLOCKS.HEADING_1](
				node: any,
				children:
					| string
					| number
					| boolean
					| React.ReactElement
					| React.ReactFragment
					| React.ReactPortal
					| undefined
					| undefined
			) {
				return (
					<Title order={1} mt={40} mb={4}>
						{children}
					</Title>
				);
			},

			[BLOCKS.HEADING_2](
				node: any,
				children:
					| string
					| number
					| boolean
					| React.ReactElement
					| React.ReactFragment
					| React.ReactPortal
					| undefined
					| undefined
			) {
				return (
					<Title order={2} size={24} mt={40} mb={4}>
						{children}
					</Title>
				);
			},

			[BLOCKS.HEADING_3](
				node: any,
				children:
					| string
					| number
					| boolean
					| React.ReactElement
					| React.ReactFragment
					| React.ReactPortal
					| undefined
					| undefined
			) {
				return (
					<Title order={3} size={18} mt={40} mb={4}>
						{children}
					</Title>
				);
			},

			[BLOCKS.HEADING_4](
				node: any,
				children:
					| string
					| number
					| boolean
					| React.ReactElement
					| React.ReactFragment
					| React.ReactPortal
					| undefined
					| undefined
			) {
				return (
					<Title order={4} size={18} style={{fontFamily: 'Lato, sans-serif'}} mt={40} mb={4}>
						{children}
					</Title>
				);
			},

			[BLOCKS.HEADING_5](
				node: any,
				children:
					| string
					| number
					| boolean
					| React.ReactElement
					| React.ReactFragment
					| React.ReactPortal
					| undefined
					| undefined
			) {
				return (
					<Title order={5} size={18} style={{fontWeight: 400, fontFamily: 'Lato, sans-serif'}} mt={40} mb={4}>
						{children}
					</Title>
				);
			},

			[BLOCKS.HEADING_6](
				node: any,
				children:
					| string
					| number
					| boolean
					| React.ReactElement
					| React.ReactFragment
					| React.ReactPortal
					| undefined
					| undefined
			) {
				return (
					<Title order={6} size={18} style={{fontFamily: 'Lato, sans-serif'}} mt={40} mb={4}>
						{children}
					</Title>
				);
			},

			[BLOCKS.TABLE](node: Block, children: React.ReactElement[]) {
				if (children.length === 1) {
					// Only one row
					return (
						<table className={classes.table}>
							<tbody>{children}</tbody>
						</table>
					);
				}

				if (children.length === 2) {
					// Two rows
					const [first, second] = children;
					return (
						<table className={classes.table}>
							<tbody>
								{first}
								{second}
							</tbody>
						</table>
					);
				}

				if (children.length >= 3) {
					// Three or more rows
					const [first, ...rest] = children;
					const last = rest.pop();
					return (
						<table className={classes.table}>
							<thead>{first}</thead>
							<tbody>{rest}</tbody>
							<tfoot>{last}</tfoot>
						</table>
					);
				}

				return null; // Return null if no rows present
			},

			[BLOCKS.TABLE_ROW](
				_: any,
				children:
					| string
					| number
					| boolean
					| React.ReactElement
					| React.ReactFragment
					| React.ReactPortal
					| undefined
					| undefined
			) {
				return <tr>{children}</tr>;
			},

			[BLOCKS.TABLE_CELL](
				node: Block,
				children:
					| string
					| number
					| boolean
					| React.ReactElement
					| React.ReactFragment
					| React.ReactPortal
					| undefined
					| undefined
			) {
				return <td className={classes.border}>{children}</td>;
			},

			[BLOCKS.TABLE_HEADER_CELL](
				node: Block,
				children:
					| string
					| number
					| boolean
					| React.ReactElement
					| React.ReactFragment
					| React.ReactPortal
					| undefined
					| undefined
			) {
				return <th className={cx(classes.tableHeader, classes.border)}>{children}</th>;
			},
		},
	};

	const object = parseScript(data.contentfulEventRegistration.hubsportEmbedForm);
	const [formProps] = object;

	return (
		<>
			<Layout>
				<Expanded id={data.contentfulEventRegistration.id} pt={40}>
					<Container fluid p={0}>
						<Grid justify="space-between" m={0}>
							<Grid.Col span={'auto'}>
								<Text mb={16} size={24}>
									{data.contentfulEventRegistration.eventType}
								</Text>
								<Title order={1} size={52} mb={28} weight={700}>
									{data.contentfulEventRegistration.heading}
								</Title>
								{/* <Text>{data.contentfulEventRegistration.eventDate}</Text> */}
								<Text size={24}>Nov 14, 2023 at 11am PST</Text>

								<h3>{data.contentfulEventRegistration.speakersHeader}</h3>
								<h4>{data.contentfulEventRegistration.speakersSubHeader}</h4>
							</Grid.Col>

							<Grid.Col span={'auto'}>
								<Group position="right">
									{data.contentfulEventRegistration.heroImage && (
										<Asset asset={data.contentfulEventRegistration.heroImage} />
									)}
								</Group>
							</Grid.Col>
						</Grid>
									</Container>

						<Container fluid m={0}>
							<Grid>
								<Grid.Col span={'auto'}>
									<Text mb={42} size={24}>
										{data.contentfulEventRegistration.bodyContent &&
											renderRichText(data.contentfulEventRegistration.bodyContent, options)}
									</Text>
								</Grid.Col>

								<Grid.Col span={'auto'}>
									<Box className={classes.formWrapper}>
										<Text mb={20} size={22} weight={700}>
											{data.contentfulEventRegistration.formHeader || 'Signup for webinar'}
										</Text>
										<HubspotForm portalId={formProps.portalId} formId={formProps.formId} />
									</Box>
								</Grid.Col>
							</Grid>
						</Container>

						<Box>
							<Title>{data.contentfulEventRegistration.speakersHeader}</Title>
							<Text>{data.contentfulEventRegistration.speakersSubHeader}</Text>

							<Container fluid p={0}>
								<Grid m={0} align='center' justify={'space-around'}>
									{data?.contentfulEventRegistration?.attendees?.map(attendee => {
								return (
									<Grid.Col span={'auto'}>
										<Speaker person={attendee} />
									</Grid.Col>
								);
							})}
									{/* <Grid.Col span={'content'}>
										<Speaker person={data?.contentfulEventRegistration?.attendees[1]} />
									</Grid.Col> */}
								</Grid>
							</Container>
						</Box>
				</Expanded>
			</Layout>
		</>
	);
};

export const query = graphql`
	query eventRegistration($id: String!) {
		contentfulEventRegistration(id: {eq: $id}) {
			id
			noindex
			eventType
			heading
			eventDate
			speakersHeader
			speakersSubHeader
			heroImage {
				gatsbyImageData(resizingBehavior: SCALE, placeholder: BLURRED, layout: CONSTRAINED)
				title
				file {
					contentType
					details {
						size
					}
					url
				}
			}
			bodyContent {
				raw
			}
			hubsportEmbedForm {
				raw
			}
			attendees {
				image {
					gatsbyImageData(resizingBehavior: SCALE, placeholder: BLURRED, layout: CONSTRAINED)
					title
					file {
						contentType
						details {
							size
						}
						url
					}
				}
				bio
				company
				id
				name
				role
				type
			}
		}
	}
`;

export default React.memo(EventRegistration);
