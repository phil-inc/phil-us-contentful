import {useInternalPaths} from 'hooks/useInternalPaths';
import slugify from 'slugify';
import type {TResource} from 'types/resource';
import type {IReferencedSection, ISection} from 'types/section';

/**
 * GetLink is a utility function to get a hyperlink.
 * @param section A section or resource
 * @returns a link string
 */
export const getLink = (section: ISection | IReferencedSection | TResource): string => {
	const link: string[] = [];
	const sanitizeLink = (link: string[]) =>
		`/${link.filter((piece, index) => !(index === 0 && piece === 'home')).join('/')}`;

	if (section.internalLink) {
		if (
			section.internalLink.sys.contentType.sys.id === 'section'
			|| section.internalLink.sys.contentType.sys.id === 'referencedSection'
		) {
			if (section.internalLink.page[0]) {
				link.push(slugify(section.internalLink.page[0].title, {lower: true, strict: true}));
				link.push(
					`#${slugify(section.internalLink.header ?? section.internalLink.id, {lower: true, strict: true})}`,
				);
			}
		} else if (section.internalLink.sys.contentType.sys.id === 'page') {
			link.push(slugify(section.internalLink.title, {lower: true, strict: true}));
		} else if (section.internalLink.sys.contentType.sys.id === 'resource') {
			const paths = useInternalPaths();
			const [blog] = paths.filter(path => path.title === section.internalLink.heading);

			return blog.path;
		}

		if (link.length <= 0) {
			return '#';
		}

		return sanitizeLink(link);
	}

	if (section.externalLink) {
		return slugify(section.externalLink, {strict: true});
	}

	return '#';
};
