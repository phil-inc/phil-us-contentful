import React from 'react';
import {Layout} from 'layouts/Layout/Layout';
import {createStyles} from '@mantine/core';
import {graphql} from 'gatsby';
import type {ContentfulPage} from 'types/page';
import Section from 'components/section/Section';

type HealthcareProviderPageProps = {
	data: {contentfulPage: ContentfulPage};
};

const HealthcareProviderPage: React.FC<HealthcareProviderPageProps> = ({data}) => {
	const {id, sections, title} = data.contentfulPage;

	console.log({id, sections, title});

	let basicSectionCount = 0;

	return (
		<Layout>
			{sections.map((section, index) => {
				if (section.sectionType === 'Basic Section') {
					return <Section key={section.id} section={section} index={basicSectionCount++} />;
				}

				return <Section key={section.id} section={section} />;
			})}
		</Layout>
	);
};

export default HealthcareProviderPage;

export const healthcareProviderPageQuery = graphql`
	query {
		contentfulPage(title: {eq: "Healthcare providers"}) {
			id
			title
			sections {
				... on ContentfulReferencedSection {
					id
					header
					sectionType
					references {
						linkTo
						heading
						buttonText
						asset {
							gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED, resizingBehavior: SCALE)
							id
						}
						body {
							raw
						}
						author
						designation
					}
					referenceType
					linkTo
					buttonText
				}
				... on ContentfulSection {
					id
					body {
						raw
						references {
							contentful_id
							__typename
							description
							gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
						}
					}
					asset {
						gatsbyImageData(
							resizingBehavior: SCALE
							placeholder: BLURRED
							layout: CONSTRAINED
							width: 816
							height: 816
						)
						title
					}
					buttonText
					header
					sectionType
					linkTo
					sys {
						contentType {
							sys {
								id
							}
						}
					}
					subHeader {
						subHeader
					}
				}
			}
		}
	}
`;
