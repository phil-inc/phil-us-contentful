import {Grid, Title, Button, Text} from '@mantine/core';
import ImageContainer from 'components/common/Container/ImageContainer';
import {getImage, GatsbyImage} from 'gatsby-plugin-image';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import React from 'react';
import type {ISection} from 'types/section';
import {BLOCKS, MARKS} from '@contentful/rich-text-types';
import type {Asset} from 'types/asset';

type BasicSectionProps = {
	section: ISection;
	index: number;
};

/**
 * BasicSection is a Component which has 2 columns; A RichText column and a ImageContainer column
 * @param props : {section, index}
 * @returns BasicSection Component which contains a text column and a image container column
 */
const BasicSection: React.FC<BasicSectionProps> = ({section, index}) => {
	const HERO_SECTION_INDEX = 0; // Hero section index is always 0
	const NUMBER_OF_COLUMNS = 2; // Basic section will always have 2 columns
	const ORDER_FIRST = 1;
	const ORDER_SECOND = 2;
	const HEADING_FIRST = 1;
	const HEADING_SECOND = 2;

	const pathToImage = getImage(section.asset);

	const richTextImages = {};

	// eslint-disable-next-line array-callback-return
	section.body.references.map((reference: any) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		richTextImages[reference.contentful_id] = {image: reference.gatsbyImageData, alt: reference.title};
	});

	const options = {
		renderNode: {
			[BLOCKS.EMBEDDED_ASSET](node) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const imageData = richTextImages[node.data.target.sys.id];
				const image = getImage(imageData.image);
				return <GatsbyImage image={image} alt={''} />;
			},
		},
	};

	const textColumnOrder = index % NUMBER_OF_COLUMNS ? ORDER_SECOND : ORDER_FIRST;
	const imageColumnOrder = index % NUMBER_OF_COLUMNS ? ORDER_FIRST : ORDER_SECOND;

	const isHeroSection = index === HERO_SECTION_INDEX;
	const titleOrdering = isHeroSection ? HEADING_FIRST : HEADING_SECOND;

	return (
		<Grid gutter='xl' align='center' pb={130} pt={isHeroSection ? 0 : 100}>
			<Grid.Col order={textColumnOrder} lg={6} md={6} sm={12}>
				<Title order={titleOrdering}>{section.header}</Title>
				{Boolean(section.subHeader?.length) && <Text weight='bold'>{section.subHeader}</Text>}
				<Text size={'lg'}>{renderRichText(section.body, options)}</Text>
				{Boolean(section.buttonText?.length) && <Button color={'dark'}>{section.buttonText}</Button>}
			</Grid.Col>
			<Grid.Col order={imageColumnOrder} lg={6} md={6} sm={12}>
				<ImageContainer>
					<GatsbyImage image={pathToImage} alt={section.asset.title} />
				</ImageContainer>
			</Grid.Col>
		</Grid>
	);
};

export default BasicSection;
