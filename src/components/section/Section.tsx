import React from 'react';
import PageContext from 'contexts/PageContext';
import type {IReferencedSection, ISection} from 'types/section';
import BasicSection from './BasicSection';
import ReferencedSection from './ReferencedSection';

type SectionProps = {
	section: ISection | IReferencedSection;
	index?: number;
};

/**
 * Section is a section on a page.
 * @param props - {section, index}
 * @returns Section based on reference type.
 */
const Section: React.FC<SectionProps> = ({section, index}) => {
	switch (section.sectionType) {
		case 'Basic Section':
			// Return <></>;
			return <BasicSection section={section as ISection} index={index!} />;
		case 'Referenced Section':
			// Return <></>;
			return <ReferencedSection section={section as IReferencedSection} />;
		default:
			break;
	}
};

export default React.memo(Section);
