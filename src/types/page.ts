import type {IReferencedSection, ISection} from './section';

export type ContentfulPage = {
	id: string;
	description?: string;
	sections: Array<ISection | IReferencedSection>;
	title: string;
	displayTitle: string;
	noindex: boolean;
	slug: string;
};
