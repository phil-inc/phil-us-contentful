import {Grid, Title, Button, Text, Center, Group} from '@mantine/core';
import {Article} from 'components/common/Article';
import ImageContainer from 'components/common/Container/ImageContainer';
import Expanded from 'components/common/Expanded/Expanded';
import {Featured} from 'components/common/Featured';
import {Testimonial} from 'components/common/Testimonial';
import {getImage, GatsbyImage} from 'gatsby-plugin-image';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import React from 'react';
import type {TResource} from 'types/resource';
import type {IReferencedSection} from 'types/section';

type ReferencedSectionProps = {
	section: IReferencedSection;
};

const ReferencedSection: React.FC<ReferencedSectionProps> = ({section}) => {
	console.log(section);

	const getColor = (index: number) => {
		if (index % 3 === 0) {
			return null;
		}

		if (index % 3 === 1) {
			return 'blue';
		}

		return 'yellow';
	};

	const renderResource = (resource: TResource, index: number) => {
		switch (section.referenceType) {
			case 'Article':
				return (
					<Article
						key={resource.id}
						color={getColor(index)}
						title={resource.heading}
						link={resource.linkTo}
						buttonText={resource.buttonText}
						image={resource.asset}
					>
						{renderRichText(resource.body)}
					</Article>
				);

			case 'Customer Story':
				return (
					<Testimonial image={resource.asset} author={resource.author} designation={resource.designation}>
						{renderRichText(resource.body)}
					</Testimonial>
				);

			case 'Featured Resource':
				return (
					<Featured title={resource.heading} asset={resource.asset}>
						{renderRichText(resource.body)}
					</Featured>
				);

			default:
				break;
		}
	};

	const getSpan = (length: number) => {
		if (length <= 0) {
			return 0;
		}

		if (length === 1) {
			return 12;
		}

		if (length === 2) {
			return 6;
		}

		if (length === 3) {
			return 4;
		}

		return 3;
	};

	const isGreenBackground = section.referenceType === 'Customer Story';

	return (
		<Expanded background={isGreenBackground ? '#29A5B4' : null}>
			<Group position='center' mb={60}>
				<Title order={2} mt={112} color={isGreenBackground ? 'white' : null}>
					{section.header}
				</Title>
			</Group>
			<Grid>
				{section.references.map((article, index) => (
					<Grid.Col key={index} lg={getSpan(section.references.length)} sm={12} md={12}>
						{renderResource(article, index)}
					</Grid.Col>
				))}
			</Grid>
		</Expanded>

	// <Expanded background='#29a5b4'>
	// <Center mb={62}>
	//     <Title order={2} mt={12} color='white'>
	//         Testimonials
	//     </Title>
	// </Center>
	// <Grid>
	//     {testimonialsSection.map(testimonial => (
	//         <Grid.Col lg={6} sm={12} md={12}>
	//         </Grid.Col>
	//     ))}
	// </Grid>
	// </Expanded>
	);
};

export default ReferencedSection;
