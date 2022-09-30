import type {ISection} from './section';

export type ContentfulPage = {
	id: string;
	sections: ISection[];
	title: string;
};
