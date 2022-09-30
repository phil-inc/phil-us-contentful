import {Grid, Title, Button, Text} from '@mantine/core';
import ImageContainer from 'components/common/Container/ImageContainer';
import {getImage, GatsbyImage} from 'gatsby-plugin-image';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import React from 'react';
import type {ISection} from 'types/page';

type SectionProps = {
	section: ISection;
};

const Section: React.FC<SectionProps> = ({section}) => {
	const pathToImage = getImage(section.asset);

	return (
		<Grid gutter='xl' align='center' mb={160}>
			<Grid.Col lg={6} md={6} sm={12}>
				<Title>{section.header}</Title>
				{Boolean(section.subHeader?.length) && <Text weight='bold'>{section.subHeader}</Text>}
				<Text size={'lg'}>{renderRichText(section.body)}</Text>
				{Boolean(section.buttonText.length) && <Button color={'dark'}>{section.buttonText}</Button>}
			</Grid.Col>
			<Grid.Col lg={6} md={6} sm={12}>
				<ImageContainer>
					<GatsbyImage image={pathToImage} alt={section.asset.title} />
				</ImageContainer>
			</Grid.Col>
		</Grid>
	);
};

export default Section;
