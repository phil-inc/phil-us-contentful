import React from 'react';
import {Layout} from 'layouts/Layout/Layout';
import {graphql} from 'gatsby';
import type {ContentfulPage} from 'types/page';
import Section from 'components/section/Section';

type PatientsPageProps = {
	data: {contentfulPage: ContentfulPage};
};

const PatientsPage: React.FC<PatientsPageProps> = ({data}) => {
	const {id, sections, title} = data.contentfulPage;

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

export default PatientsPage;

export const patientsPageQuery = graphql`
	query {
		contentfulPage(title: {eq: "Patients"}) {
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
							gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
						}
					}
					asset {
						gatsbyImageData(resizingBehavior: SCALE, placeholder: BLURRED, layout: CONSTRAINED)
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
