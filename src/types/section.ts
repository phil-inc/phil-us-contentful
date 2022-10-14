import type {Asset} from './asset';
import type {RenderRichTextData, ContentfulRichTextGatsbyReference} from 'gatsby-source-contentful/rich-text';
import type {TResource} from './resource';

type SectionType = 'Basic Section' | 'Referenced Section';

export type BodyType = RenderRichTextData<ContentfulRichTextGatsbyReference>;

export type ISection = {
	id: string;
	sectionType: SectionType;
	header: string;
	subHeader?: {subHeader: string};
	body: BodyType;
	buttonText: string;
	internalLink: {
		id: string;
		page: Array<{title: string}>;
		header: string;
		title: string;
		sys: {
			contentType: {
				sys: {
					id: string;
				};
			};
		};
	};
	externalLink: string;
	asset: Asset;
	subNavigationSection?: TResource[];
	isHidden: boolean;
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
	| 'White Paper'
	| 'Banner'
	| 'Stats Card'
	| 'Prescriber Journey'
	| 'Info Card'
	| 'FAQs'
	| 'Image Carousel'
	| 'Investors';

export type IReferencedSection = {
	id: string;
	hideHeader: boolean;
	referenceType: ReferenceType;
	header: string;
	references: TResource[];
	buttonText?: string;
	externalLink?: string;
	sectionType: SectionType;
	isHidden: boolean;
};
