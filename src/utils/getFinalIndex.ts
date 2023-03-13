import {type ContentfulPage} from 'types/page';

export const getFinalIndex = (page: ContentfulPage) =>
	page.sections.filter(item => !item.isHidden && Boolean(item.header)).length - 1;
