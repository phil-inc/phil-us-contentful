import {Grid, Title, Button, Group} from '@mantine/core';
import {Article} from 'components/common/Article';
import {Banner} from 'components/common/Banner/Banner';
import Expanded from 'components/common/Expanded/Expanded';
import {Featured} from 'components/common/Featured';
import {StatsCard} from 'components/common/statsCard/StatsCard';
import {Testimonial} from 'components/common/Testimonial';
import {Link} from 'gatsby';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import React from 'react';
import type {TResource} from 'types/resource';
import type {IReferencedSection} from 'types/section';

type ReferencedSectionProps = {
	section: IReferencedSection;
};

/**
 * ReferencedSection is a Section Component that renders referenced resources.
 * @param props - {section} Section to be reference rendered
 * @returns Referenced Resources
 */
const ReferencedSection: React.FC<ReferencedSectionProps> = ({section}) => {
	console.log(section);
	const GRID_COLUMNS = 100;
	const SPAN_LG = GRID_COLUMNS / section.references.length;

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

			case 'Banner':
				return <Banner resource={resource} />;

			case 'Stats Card':
				return <StatsCard resource={resource} />;

			default:
				break;
		}
	};

	const getSectionColors = () => {
		switch (section.referenceType) {
			case 'Customer Story':
				return ['#29A5B4', 'white']; // Green Background

			case 'Banner':
			case 'Article':
			case 'Stats Card':
				return ['#F4F4F4', 'black']; // Gray Background

			default:
				return ['#FFFFFF', 'black']; // White Background
		}
	};

	const [background, textColor] = getSectionColors();

	return (
		<Expanded background={background} py={section.referenceType === 'Banner' ? 0 : 116}>
			{Boolean(section.header?.length) && (
				<Group position='center' mb={60}>
					<Title order={2} color={textColor}>
						{section.header}
					</Title>
				</Group>
			)}
			<Grid columns={GRID_COLUMNS}>
				{section.references.map((resource, index) => (
					<Grid.Col py={60} key={index} lg={SPAN_LG} sm={GRID_COLUMNS} md={50}>
						{renderResource(resource, index)}
					</Grid.Col>
				))}
			</Grid>
			{Boolean(section.buttonText?.length) && Boolean(section.linkTo?.length) && (
				<Group position='center'>
					<Link to={section.linkTo}>
						<Button color={'dark'}>{section.buttonText}</Button>
					</Link>
				</Group>
			)}
		</Expanded>
	);
};

export default ReferencedSection;
