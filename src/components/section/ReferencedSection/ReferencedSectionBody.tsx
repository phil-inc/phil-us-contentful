import React from 'react';
import {Grid} from '@mantine/core';
import {ResourceCarousel} from 'components/common/Carousel/ResourceCarousel';
import {type IReferencedSection, ReferenceTypeEnum} from 'types/section';
import RenderResource from './RenderResource';

const GRID_COLUMNS = 100;

import * as classes from './referencedSection.module.css';

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
	const span = 12 / (section?.renderOptions?.layoutOptions?.numberOfColumns ?? 1);

	const addMargin = section?.header?.length > 0 || section?.subHeading?.subHeading?.length > 0;

	switch (section.referenceType) {
		case ReferenceTypeEnum['Image Carousel']:
			return <ResourceCarousel imageCaraouselSection={section} />;

		default:
			return (
				<Grid
					grow
					className={classes.grid}
					gutter={section.referenceType === ReferenceTypeEnum['Stepper Cards'] ? 0 : 36}
					justify="center"
					align="stretch"
					data-add-margin={addMargin}
					// mx={section.referenceType === ReferenceTypeEnum.Banner ? -16 : -10}
					// M={section.referenceType === ReferenceTypeEnum.Banner ? -16 : 0}
				>
					{section.references.map((resource, index, array) => (
						<Grid.Col
							className={classes.column}
							p={section.referenceType === ReferenceTypeEnum.Investors ? 0 : undefined}
							key={resource.id + 'mapReferencedSectionResource'}
							span={section.v2flag ? {base: 12, md: span} : getSpan(section.referenceType)}
							data-reference-type={section.referenceType}
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
