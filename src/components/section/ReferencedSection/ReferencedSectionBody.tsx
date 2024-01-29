import React, { useContext } from 'react';
import {Box, Center, Grid} from '@mantine/core';
import {ResourceCarousel} from 'components/common/Carousel/ResourceCarousel';
import {type IReferencedSection, ReferenceTypeEnum} from 'types/section';
import RenderResource from './RenderResource';

import * as classes from './referencedSection.module.css';
import {Carousel} from '@mantine/carousel';
import useDeviceType from 'hooks/useView';
import PageContext from 'contexts/PageContext';

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

	const isMobile = useDeviceType('xs');

	const {title} = useContext(PageContext);

	if (section.renderOptions?.layoutOptions.shouldRenderCarousel) {
		const columns = section.renderOptions.layoutOptions.numberOfColumns ?? 1;

		return (
			<Center>
				<Carousel
					classNames={{root: classes.root, container: classes.carouselContainer}}
					mt={80}
					slideGap={30}
					slideSize={{base: '95%', sm: `${100 / columns}%`}}
					slidesToScroll={isMobile ? 1 : columns}
					data-has-media-item={section.references.some(
						reference => reference?.sys?.contentType?.sys?.id === 'mediaItem' ?? false,
					)}
				>
					{section.references.map((resource, index, array) => (
						<Carousel.Slide key={resource.id + 'carouselItem'}>
							<RenderResource
								arrayLength={array.length}
								index={index}
								referenceType={section.referenceType}
								resource={resource}
								sectionHeader={section.header}
							/>
						</Carousel.Slide>
					))}
				</Carousel>
			</Center>
		);
	}

	return (
		<Grid
			grow
			className={classes.grid}
			gutter={section.referenceType === ReferenceTypeEnum['Stepper Cards'] ? 0 : 36}
			justify='center'
			align='stretch'
			data-add-margin={addMargin}
			data-context={title}
			// Mx={section.referenceType === ReferenceTypeEnum.Banner ? -16 : -10}
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
};

export default ReferencedSectionBody;
