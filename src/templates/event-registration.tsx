import React from 'react';
import {Script, graphql} from 'gatsby';
import {Layout} from 'layouts/Layout/Layout';
import Expanded from 'components/common/Expanded/Expanded';
import {Title, Text, Grid, Box, Group, List, Anchor, Container, Stack} from '@mantine/core';
import Asset from 'components/common/Asset/Asset';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import {BLOCKS, INLINES} from '@contentful/rich-text-types';
import {type TAsset} from 'types/asset';
import {type Block} from '@contentful/rich-text-types';
import {parseScript} from 'utils/parseScript';
import HubspotForm from 'components/common/HubspotForm/HubspotForm';
import Speaker from 'components/common/Person/Speaker/Speaker';
import {convertTimeToCustomFormat} from 'utils/date';
import {type TResource} from 'types/resource';
import {getDescriptionFromRichtext} from 'utils/getDescription';
import {SEO} from 'layouts/SEO/SEO';
import {type BodyType} from 'types/section';
import {type Person} from 'types/person';
import slugify from 'slugify';
import {renderBanners} from 'components/common/Banner/Banner';

import cx from 'clsx';
import * as classes from './eventRegistration.module.css';

type EventRegistrationProps = {
	data: {
		contentfulEventRegistration: {
			id: string;
			slug: string;
			heading: string;
			heroImage: TAsset;
			metaDescription: string;
			eventType: string;
			eventDate: string;
			bodyContent: BodyType;
			formHeader: string;
			hubsportEmbedForm: BodyType;
			speakersHeader: string;
			speakersSubHeader: string;
			attendees: Person[];
			noindex: boolean;
		};
		allContentfulResource: {
			nodes: TResource[];
		};
	};
};

type HelmetProps = EventRegistrationProps & {
	pageContext: {
		id: string;
		heading: string;
	};
	location: {pathname: string};
};

export const Head: React.FC<HelmetProps> = ({pageContext, data: {contentfulEventRegistration: cer}}) => {
	const heroImage = cer.heroImage?.file.url;
	const description = cer.metaDescription?.length
		? cer.metaDescription
		: cer.bodyContent?.raw
			? getDescriptionFromRichtext(cer.bodyContent.raw)
			: '';

	const slug = cer.slug ?? `/${slugify(pageContext.heading, {strict: true, lower: true})}`;

	return (
		<SEO title={cer.heading}>
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:title' content={pageContext.heading} />
			<meta name='twitter:description' content={description} />
			{heroImage && <meta name='twitter:image' content={`https:${heroImage}?w=400&h=400&q=100&fm=webp&fit=scale`} />}
			<meta name='description' content={description} />
			<meta property='og:title' content={pageContext.heading} />
			<meta property='og:type' content={'Page'} />
			<meta property='og:description' content={description} />
			{heroImage && <meta property='og:image' content={`https:${heroImage}?w=400&h=400&q=100&fm=webp&fit=scale`} />}
			<meta property='og:url' content={`https://phil.us${slug}/`} />
			<Script defer async charSet='utf-8' type='text/javascript' src='//js.hsforms.net/forms/embed/v2.js'></Script>
			{cer.noindex && <meta name='robots' content='noindex' />}
		</SEO>
	);
};

const EventRegistration: React.FC<EventRegistrationProps> = ({data}) => {
	const banners = data.allContentfulResource.nodes.map(r => r.banners).flat(1) as TResource[];

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
				| undefined,
			) {
				return (
					<Text component='p' mt={0} className={classes.bodyText}>
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
				| undefined,
			) {
				return (
					<List type='ordered' mt={16} mb={32}>
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
				| undefined,
			) {
				return (
					<List type='unordered' listStyleType='disc' pl={16} mt={16} mb={44}>
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
				| undefined,
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
				| undefined,
			) {
				const {uri} = node.data as {uri: string};
				return (
					<Anchor href={uri} target='_blank' className={classes.anchor}>
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
				| undefined,
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
				| undefined,
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
				| undefined,
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
				| undefined,
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
				| undefined,
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
				| undefined,
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
				| undefined,
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
				| undefined,
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
				| undefined,
			) {
				return <th className={cx(classes.tableHeader, classes.border)}>{children}</th>;
			},
		},
	};

	const object = parseScript(data.contentfulEventRegistration.hubsportEmbedForm as {raw: string});
	const [formProps] = object;

	const arr = data?.contentfulEventRegistration?.attendees;

	const defaultBanners = data.allContentfulResource.nodes;
	const hasBanners = Boolean(banners);

	const bannersToDisplay = hasBanners ? banners : (defaultBanners.map(r => r.banners).flat(1) as TResource[]);

	return (
		<>
			<Layout>
				<Expanded id={data.contentfulEventRegistration.id} pt={40}>
					{/* HEADER/IMAGE CONTAINER */}
					<Container fluid className={classes.container}>
						<Grid justify='space-between' m={0} gutter={0}>
							<Grid.Col xs={12} sm={12} md={'auto'}>
								<Text mb={16} className={classes.eventType}>
									{data.contentfulEventRegistration.eventType}
								</Text>
								<Title order={1} mb={28} weight={700} className={classes.title}>
									{data.contentfulEventRegistration.heading}
								</Title>
								<Text className={classes.eventDate}>
									{convertTimeToCustomFormat(
										data.contentfulEventRegistration.eventDate,
										'MMM d, yyyy \'at\' ha zzz',
									)}
								</Text>
							</Grid.Col>

							<Grid.Col xs={'auto'}>
								<Group className={classes.image}>
									{data.contentfulEventRegistration.heroImage && (
										<Asset asset={data.contentfulEventRegistration.heroImage} />
									)}
								</Group>
							</Grid.Col>
						</Grid>
					</Container>

					{/* BODY/FORM CONTAINER */}
					<Container fluid className={classes.container}>
						<Grid>
							<Grid.Col
								xs={12}
								md={'auto'}
								order={2}
								orderXs={2}
								orderSm={2}
								orderMd={1}
								orderLg={1}
								orderXl={1}
							>
								<Text mb={42} size={18}>
									{data.contentfulEventRegistration.bodyContent
										&& renderRichText(data.contentfulEventRegistration.bodyContent, options)}
								</Text>
							</Grid.Col>

							<Grid.Col
								xs={12}
								md={'auto'}
								order={1}
								orderXs={1}
								orderSm={1}
								orderMd={2}
								orderLg={2}
								orderXl={2}
							>
								<Box className={classes.formWrapper}>
									<Text mb={20} weight={700} className={classes.formHeader}>
										{data.contentfulEventRegistration.formHeader}
									</Text>
									<HubspotForm portalId={formProps.portalId} formId={formProps.formId} />
								</Box>
							</Grid.Col>
						</Grid>
					</Container>

					{/* SPEAKER CONTAINER START */}
					<Container fluid p={0}>
						<Stack className={classes.stack} spacing={0}>
							<Title order={2} className={classes.speakersHeader}>
								{data.contentfulEventRegistration.speakersHeader}
							</Title>
							<Text className={classes.speakersSubHeader}>
								{data.contentfulEventRegistration.speakersSubHeader}
							</Text>
						</Stack>
					</Container>
					<Container fluid p={0}>
						<Grid m={0} align='stretch' justify='center' gutter={26}>
							{arr.map(attendee => (
								<Grid.Col
									key={attendee.id}
									xs={12}
									sm={'auto'}
									sx={{display: 'flex', justifyContent: 'center'}}
								>
									<Speaker person={attendee} length={arr.length} />
								</Grid.Col>
							))}
						</Grid>
					</Container>
					{/* SPEAKER CONTAINER END */}
				</Expanded>

				{/* Banner */}
				{bannersToDisplay.length && renderBanners(bannersToDisplay)}
			</Layout>
		</>
	);
};

export const query = graphql`
	query eventRegistration($id: String!) {
		contentfulEventRegistration(id: {eq: $id}) {
			slug
			id
			noindex
			eventType
			heading
			eventDate
			speakersHeader
			speakersSubHeader
			metaDescription
			formHeader
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
					gatsbyImageData(resizingBehavior: SCALE, placeholder: BLURRED, layout: FULL_WIDTH)
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

		allContentfulResource(filter: {node_locale: {eq: "en-US"}, heading: {eq: "Dummy Resource"}}) {
			nodes {
				id
				heading
				banners {
					id
					body {
						raw
					}
					buttonText
					hubspotEmbed {
						raw
					}
					isHubspotEmbed
					externalLink
					heading
				}
			}
		}
	}
`;

export default React.memo(EventRegistration);
