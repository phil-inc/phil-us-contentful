import React from 'react';
import {Grid, useMantineTheme} from '@mantine/core';
import {ResourceCarousel} from 'components/common/Carousel/ResourceCarousel';
import {type IReferencedSection, ReferenceTypeEnum} from 'types/section';
import {TResource} from 'types/resource';
import RenderResource from './RenderResource';

const GRID_COLUMNS = 100;

type ReferencedSectionBodyProps = {
	section: IReferencedSection;
	getSpan: (referenceType: string) => {
		xl: number;
		lg: number;
		md: number;
		sm: number;
		xs?: number;
	};
};

const ReferencedSectionBody: React.FC<ReferencedSectionBodyProps> = ({section, getSpan}) => {
	const theme = useMantineTheme();

	switch (section.referenceType) {
		case ReferenceTypeEnum['Image Carousel']:
			return <ResourceCarousel imageCaraouselSection={section} />;

		default:
			return (
				<Grid
					grow={
						section.referenceType === ReferenceTypeEnum.Investors
						|| section.referenceType === ReferenceTypeEnum.FAQs
					}
					columns={GRID_COLUMNS}
					gutter={36}
					// m={section.referenceType === ReferenceTypeEnum.Banner ? -16 : 0}
					// mx={section.referenceType === ReferenceTypeEnum.Banner ? -16 : -10}
					mt={80}
				>
					{section.references.map((resource, index, array) => (
						<Grid.Col
							p={section.referenceType === ReferenceTypeEnum.Investors ? 0 : undefined}
							key={resource.id + 'mapReferencedSectionResource'}
							span={getSpan(section.referenceType)}
						>
							<RenderResource
								arrayLength={array.length}
								index={index}
								referenceType={section.referenceType}
								resource={resource}
								sectionHeader={section.header}
							/>
						</Grid.Col>
					))}
				</Grid>
			);
	}
};

export default ReferencedSectionBody;
