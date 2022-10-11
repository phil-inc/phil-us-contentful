import type {ISection} from './section';

export type ContentfulPage = {
	id: string;
	description?: string;
	sections: ISection[];
	title: string;
};
