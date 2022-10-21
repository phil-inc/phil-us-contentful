import {
	Grid,
	Title,
	Button,
	Text,
	createStyles,
	Container,
	Anchor,
	Group,
	Loader,
	Center,
	Divider,
	Box,
} from '@mantine/core';
import ImageContainer from 'components/common/Container/ImageContainer';
import {getImage, GatsbyImage} from 'gatsby-plugin-image';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import React from 'react';
import {Link} from 'gatsby';
import type {ISection} from 'types/section';
import {BLOCKS} from '@contentful/rich-text-types';
import {useMediaQuery} from '@mantine/hooks';
import slugify from 'slugify';
import {getLink} from 'utils/getLink';
import Asset from 'components/common/Asset/Asset';

import {useHubspotForm} from '@aaronhayes/react-use-hubspot-form';
import {parseScript} from 'utils/parseScript';
import type {TParsedString} from 'types/resource';
import {documentToPlainTextString} from '@contentful/rich-text-plain-text-renderer';
import jsonFromText from 'json-from-text';
import Expanded from 'components/common/Expanded/Expanded';

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

	section: {
		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			display: 'none',
		},
	},

	largeSection: {
		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			display: 'none',
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

	const [hasRendered, setHasRendered] = React.useState<boolean>(false);
	const {classes} = useStyles();
	const isMobile = useMediaQuery('(max-width: 576px)');
	const {link, isExternal} = getLink(section);

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
				return <GatsbyImage style={{marginBottom: '32px'}} image={image} alt={''} />;
			},
			[BLOCKS.PARAGRAPH](node, children) {
				return <Text>{children}</Text>;
			},
		},
	};

	const textColumnOrder = index % NUMBER_OF_COLUMNS ? ORDER_SECOND : ORDER_FIRST;
	const imageColumnOrder = index % NUMBER_OF_COLUMNS ? ORDER_FIRST : ORDER_SECOND;

	const isHeroSection = index === HERO_SECTION_INDEX;
	const titleOrdering = isHeroSection ? HEADING_FIRST : HEADING_SECOND;

	// Create form if section has hubspot form
	if (section.isHubspotEmbed) {
		const object: any = parseScript(section.body);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const [formProps] = object;

		// Create form
		const {loaded, formCreated} = useHubspotForm({
			target: '#hubspotForm',
			...formProps,
		});

		// Handle loader
		if (loaded && formCreated && !hasRendered) {
			setHasRendered(true);
		}
	}

	return (
		// TODO: play around with padding for contact page style
		<Container id={slugify(section.header, {lower: true, strict: true})} fluid className={classes.container}>
			<Grid
				gutter={50}
				align={section.isHubspotEmbed ? 'flex-start' : 'center'}
				pb={130}
				pt={isHeroSection || isMobile ? 0 : 100}
			>
				<Grid.Col orderMd={textColumnOrder} orderSm={1} lg={6} md={6} sm={12}>
					{section.isHubspotEmbed ? (
						<>
							<Title order={titleOrdering}>{section.header}</Title>
							{Boolean(section.subHeader?.subHeader.length) && (
								<Title order={3} mt={40}>
									{section.subHeader.subHeader}
								</Title>
							)}
							<Divider size={3} variant='dashed' my={20} />
							{hasRendered ? (
								<div id='hubspotForm'></div>
							) : (
								<Center>
									<Loader mt={120} size='lg' />
								</Center>
							)}
						</>
					) : (
						<>
							<Title order={titleOrdering}>{section.header}</Title>
							{Boolean(section.subHeader?.subHeader.length) && (
								<Text size={18} weight='bold' mt={20}>
									{section.subHeader.subHeader}
								</Text>
							)}
							{Boolean(section.body) && (
								<Text size={18} className={classes.body} mt={16}>
									{renderRichText(section.body, options)}
								</Text>
							)}
							{Boolean(section.buttonText?.length) && (
								<Group mt={48}>
									{isExternal ? (
										<Anchor href={link} target='_blank'>
											<Button>{section.buttonText}</Button>
										</Anchor>
									) : (
										<Link to={link}>
											<Button>{section.buttonText}</Button>
										</Link>
									)}
								</Group>
							)}
						</>
					)}
				</Grid.Col>
				<Grid.Col orderMd={imageColumnOrder} orderSm={2} lg={6} md={6} sm={12}>
					<ImageContainer fluid>
						<Asset asset={section.asset} />
					</ImageContainer>
				</Grid.Col>
			</Grid>
		</Container>
	);
};

export default BasicSection;
