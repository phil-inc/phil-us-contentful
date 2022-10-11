import React from 'react';
import {Layout} from 'layouts/Layout/Layout';
import type {ContentfulPage} from 'types/page';
import Section from 'components/section/Section';
import {graphql} from 'gatsby';
import slugify from 'slugify';
import {SEO} from 'layouts/SEO/SEO';

type HelmetProps = {
	pageContext: {title: string};
	data: {contentfulPage: ContentfulPage};
};

export const Head: React.FC<HelmetProps> = ({pageContext, data}) => (
	<SEO title={pageContext.title}>
		<meta name='description' content={data.contentfulPage.description} />
	</SEO>
);

type PageTemplateProps = {
	data: {contentfulPage: ContentfulPage};
};

const PageTemplate: React.FC<PageTemplateProps> = ({data}) => {
	const {id, sections, title} = data.contentfulPage;

	let basicSectionCount = 0;

	return (
		<Layout>
			{sections.map(section => {
				if (section.sectionType === 'Basic Section') {
					return (
						<div id={slugify(section.header, {lower: true})}>
							<Section key={section.id} section={section} index={basicSectionCount++} />
						</div>
					);
				}

				return (
					<div id={section.header ? slugify(section.header, {lower: true}) : '#'}>
						<Section key={section.id} section={section} />
					</div>
				);
			})}
		</Layout>
	);
};

export const pageQuery = graphql`
	query getPage($title: String) {
		contentfulPage(title: {eq: $title}) {
			id
			title
			description
			sections {
				... on ContentfulReferencedSection {
					id
					header
					sectionType
					references {
						linkTo
						heading
						subHeading {
							subHeading
						}
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

export default PageTemplate;
