import {HOME, RESOURCES} from 'constants/page';
import slugify from 'slugify';

export const getPathForSectionAndPage = (pageTitle: string, sectionHeader: string): string => {
	// Set path based on page and section
	let path = '';
	if (pageTitle !== HOME) {
		const pageSlug = slugify(pageTitle, {lower: true, strict: true});
		path = `/${pageSlug}`;
	}

	if (pageTitle === RESOURCES) {
		const sectionSlug = slugify(sectionHeader, {lower: true, strict: true});
		path += `/${sectionSlug}`;
	} else {
		const sectionSlug = slugify(sectionHeader, {lower: true, strict: true});
		path += `/#${sectionSlug}`;
	}

	return path || '#';
};
