import React from 'react';
import {Layout} from 'layouts/Layout/Layout';
// Import {ColorSchemeToggle} from 'components/ColorSchemeToggle/ColorSchemeToggle';
import {
	Button,
	Center,
	Container,
	createStyles,
	Divider,
	Grid,
	Group,
	Image,
	List,
	Paper,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import {graphql} from 'gatsby';
import {GatsbyImage, getImage, StaticImage} from 'gatsby-plugin-image';
import {Article} from 'components/common/Article';
import {Testimonial} from 'components/common/Testimonial';
import {Featured} from 'components/common/Featured';
import {Schedule} from 'components/common/Schedule';
import type {ContentfulHomePageType} from 'types/homePage';
import Expanded from 'components/common/Expanded/Expanded';
import type {ContentfulPage} from 'types/page';
import ImageContainer from 'components/common/Container/ImageContainer';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import type {ContentfulRichTextGatsbyReference, RenderRichTextData} from 'gatsby-source-contentful/rich-text';
import Section from 'components/section/Section';

type HomePageProps = {
	data: {contentfulPage: ContentfulPage};
};

const HomePage: React.FC<HomePageProps> = ({data}) => {
	const {id, sections, title} = data.contentfulPage;

	console.log(sections);
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

export default HomePage;

export const homePageQuery = graphql`
	query getPage {
		contentfulPage(title: {eq: "Home"}) {
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
				}
			}
		}
	}
`;
