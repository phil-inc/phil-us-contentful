import type {Asset} from './asset';
import type {RenderRichTextData, ContentfulRichTextGatsbyReference} from 'gatsby-source-contentful/rich-text';
import type {TResource} from './resource';

type SectionType = 'Basic Section' | 'Referenced Section';

export type BodyType = RenderRichTextData<ContentfulRichTextGatsbyReference>;

export type ISection = {
	id: string;
	sectionType: SectionType;
	header: string;
	subHeader?: string;
	body: BodyType;
	buttonText: string;
	linkTo: string;
	asset: Asset;
};

type ReferenceType =
	| 'Article'
	| 'Customer Story'
	| 'Featured Resource'
	| 'Testimonial'
	| 'Team Member'
	| 'Press Release'
	| 'Location'
	| 'Upcoming Events'
	| 'Phil Blog'
	| 'Case Study'
	| 'White Paper';

export type IReferencedSection = {
	id: string;
	referenceType: ReferenceType;
	heading: string;
	references: TResource[];
	buttonText?: string;
	linkTo?: string;
	sectionType: SectionType;
};
