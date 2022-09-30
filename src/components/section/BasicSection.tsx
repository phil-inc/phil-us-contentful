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
};

const BasicSection: React.FC<BasicSectionProps> = ({section}) => {
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

	return (
		<Grid gutter='xl' align='center' mb={160}>
			<Grid.Col lg={6} md={6} sm={12}>
				<Title>{section.header}</Title>
				{Boolean(section.subHeader?.length) && <Text weight='bold'>{section.subHeader}</Text>}
				<Text size={'lg'}>{renderRichText(section.body, options)}</Text>
				{Boolean(section.buttonText?.length) && <Button color={'dark'}>{section.buttonText}</Button>}
			</Grid.Col>
			<Grid.Col lg={6} md={6} sm={12}>
				<ImageContainer>
					<GatsbyImage image={pathToImage} alt={section.asset.title} />
				</ImageContainer>
			</Grid.Col>
		</Grid>
	);
};

export default BasicSection;
