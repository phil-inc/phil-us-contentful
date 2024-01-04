import React from 'react';
import {Grid, useMantineTheme} from '@mantine/core';
import {ResourceCarousel} from 'components/common/Carousel/ResourceCarousel';
import {type IReferencedSection, ReferenceTypeEnum} from 'types/section';
import {TResource} from 'types/resource';
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
	const theme = useMantineTheme();

	switch (section.referenceType) {
		case ReferenceTypeEnum['Image Carousel']:
			return <ResourceCarousel imageCaraouselSection={section} />;

		default:
			// TODO: Manage columns from layout options
			return (
				<Grid
					grow={
						section.referenceType === ReferenceTypeEnum.Investors
						|| section.referenceType === ReferenceTypeEnum.FAQs 
					}
					columns={GRID_COLUMNS}
					gutter={section.referenceType === ReferenceTypeEnum['Stepper Cards'] ? 0 : 36}
					// M={section.referenceType === ReferenceTypeEnum.Banner ? -16 : 0}
					// mx={section.referenceType === ReferenceTypeEnum.Banner ? -16 : -10}
					mt={80}
					justify='center'
					align='stretch'
				>
					{section.references.map((resource, index, array) => (
						<Grid.Col
							className={classes.column}
							p={section.referenceType === ReferenceTypeEnum.Investors ? 0 : undefined}
							key={resource.id + 'mapReferencedSectionResource'}
							span={getSpan(section.referenceType)}
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
