import {Grid, Title, Button, Text} from '@mantine/core';
import ImageContainer from 'components/common/Container/ImageContainer';
import {getImage, GatsbyImage} from 'gatsby-plugin-image';
import {renderRichText} from 'gatsby-source-contentful/rich-text';
import React from 'react';
import type {IReferencedSection, ISection} from 'types/section';
import BasicSection from './BasicSection';
import ReferencedSection from './ReferencedSection';

type SectionProps = {
	section: ISection | IReferencedSection;
	index?: number;
};

const Section: React.FC<SectionProps> = ({section, index}) => {
	switch (section.sectionType) {
		case 'Basic Section':
			return <BasicSection section={section as ISection} index={index} />;
		case 'Referenced Section':
			return <ReferencedSection section={section as IReferencedSection} />;
		default:
			break;
	}
};

export default Section;
