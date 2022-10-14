import {Grid, Title, Button, Text, createStyles, AspectRatio, Container} from '@mantine/core';
import ImageContainer from 'components/common/Container/ImageContainer';
import {getImage, GatsbyImage} from 'gatsby-plugin-image';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import React from 'react';
import {Link} from 'gatsby';
import type {ISection} from 'types/section';
import {BLOCKS} from '@contentful/rich-text-types';
import {useMediaQuery} from '@mantine/hooks';
import slugify from 'slugify';
import {useInternalPaths} from 'hooks/useInternalPaths';
import {getLink} from 'utils/getLink';

const useStyles = createStyles(theme => ({
	body: {
		p: {
			marginTop: 0,
		},
	},

	container: {
		padding: '0 100px',
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			padding: '0 16px',
		},
	},
}));

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

	const {classes} = useStyles();
	const isMobile = useMediaQuery('(max-width: 576px)');

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
		<Container id={slugify(section.header, {lower: true, strict: true})} fluid className={classes.container}>
			<Grid gutter='xl' align='center' pb={130} pt={isHeroSection || isMobile ? 0 : 100}>
				<Grid.Col orderMd={textColumnOrder} orderSm={1} lg={6} md={6} sm={12}>
					<Title order={titleOrdering}>{section.header}</Title>
					{Boolean(section.subHeader?.subHeader.length) && (
						<Text size={18} weight='bold' mt={20}>
							{section.subHeader.subHeader}
						</Text>
					)}
					<Text size={18} className={classes.body}>
						{renderRichText(section.body, options)}
					</Text>
					{Boolean(section.buttonText?.length) && (
						<Link to={getLink(section)}>
							<Button color={'dark'}>{section.buttonText}</Button>
						</Link>
					)}
				</Grid.Col>
				<Grid.Col orderMd={imageColumnOrder} orderSm={2} lg={6} md={6} sm={12}>
					<ImageContainer>
						<GatsbyImage image={pathToImage} alt={section.asset.title} />
					</ImageContainer>
				</Grid.Col>
			</Grid>
		</Container>
	);
};

export default BasicSection;
