import React from 'react';
import {Layout} from 'layouts/Layout/Layout';
import type {ContentfulPage} from 'types/page';
import Section from 'components/section/Section';
import {graphql} from 'gatsby';

type PageTemplateProps = {
	data: {contentfulPage: ContentfulPage};
};

const PageTemplate: React.FC<PageTemplateProps> = ({data}) => {
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

export const pageQuery = graphql`
	query getPage($title: String) {
		contentfulPage(title: {eq: $title}) {
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
							gatsbyImageData(
								placeholder: BLURRED
								layout: CONSTRAINED
								resizingBehavior: SCALE
								width: 1000
								height: 1000
							)
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
						gatsbyImageData(
							resizingBehavior: SCALE
							placeholder: BLURRED
							layout: CONSTRAINED
							width: 1000
							height: 1000
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

export default PageTemplate;
