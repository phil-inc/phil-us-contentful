import {type ContentfulPage} from 'types/page';
import {type IReferencedSection} from 'types/section';

export const getFinalIndex = (page: ContentfulPage) =>
	page.sections.filter(
		item => !item.isHidden && !(item as IReferencedSection)?.hideNavigationAnchor && Boolean(item.header),
	).length - 1;
