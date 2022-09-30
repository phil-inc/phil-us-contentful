import {Grid, Title, Button, Text, Center} from '@mantine/core';
import {Article} from 'components/common/Article';
import ImageContainer from 'components/common/Container/ImageContainer';
import Expanded from 'components/common/Expanded/Expanded';
import {getImage, GatsbyImage} from 'gatsby-plugin-image';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import React from 'react';
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

	return (
		<Expanded>
			<Center mb={62}>
				<Title order={2} mt={112}>
					{section.heading}
				</Title>
			</Center>
			<Grid>
				{section.references.map((article, index) => (
					<Grid.Col key={index} lg={4} sm={12} md={12}>
						<Article
							key={article.id}
							color={getColor(index)}
							title={article.heading}
							link={article.linkTo}
							buttonText={article.buttonText}
							image={article.asset}
						>
							{renderRichText(article.body)}
						</Article>
					</Grid.Col>
				))}
			</Grid>
		</Expanded>
	);
};

export default ReferencedSection;
