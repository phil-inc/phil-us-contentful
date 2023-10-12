import {HOME, RESOURCES} from 'constants/page';
import slugify from 'slugify';

export const getPathForSectionAndPage = (pageTitle: string, sectionHeader: string, slug: string): string => {
	// Set path based on page and section
	let path = '';
	if (pageTitle !== HOME) {
		const pageSlug = slugify(slug, {lower: true, strict: true});
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

const URLPatterns = [
	/youtu.be\/([^#&?]{11})/, // Youtu.be/<id>
	/\?v=([^#&?]{11})/, // ?v=<id>
	/&v=([^#&?]{11})/, // &v=<id>
	/embed\/([^#&?]{11})/, // Embed/<id>
	/\/v\/([^#&?]{11})/, // /v/<id>
];

export const getYouTubeId = (url: string): string => {
	if (typeof url !== 'string') {
		throw new TypeError('The URL must be a string');
	}

	for (const pattern of URLPatterns) {
		const match = url.match(pattern);
		if (match?.[1]) {
			return match[1];
		}
	}

	return '';
};
