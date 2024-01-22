import {useInternalPaths} from 'hooks/useInternalPaths';
import {type ContentfulButton} from 'layouts/Layout/CHeader/CHeader';
import slugify from 'slugify';
import type {TResource} from 'types/resource';
import type {IReferencedSection, ISection} from 'types/section';

/**
 * Get internal and external hyperlinks from contentful data models.
 * @param section A section or resource.
 * @returns a link string.
 */
export const getLink = (
	section: ISection | IReferencedSection | TResource | ContentfulButton,
	v2 = false,
): {link: string; isExternal: boolean} => {
	const link: string[] = [];
	const sanitizeLink = (link: string[]) =>
		`/${link.filter((piece, index) => !(index === 0 && piece === 'home')).join('/')}`;

	if (section.internalLink) {
		if (
			section.internalLink?.sys?.contentType?.sys?.id === 'section'
			|| section.internalLink.sys?.contentType?.sys?.id === 'referencedSection'
		) {
			if (section.internalLink?.page?.[0]) {
				link.push(slugify(section.internalLink.page[0].title, {lower: true, strict: true}));
				link.push(
					`#${slugify(section.internalLink.header ?? section.internalLink.id, {lower: true, strict: true})}`,
				);
			}
		} else if (section.internalLink?.sys?.contentType?.sys?.id === 'page') {
			link.push(
				slugify((section as IReferencedSection)?.internalLink?.slug ?? section.internalLink.title!, {
					lower: true,
					strict: true,
				}),
			);
		} else if (
			section.internalLink?.sys?.contentType?.sys?.id === 'resource'
			|| section.internalLink?.sys?.contentType?.sys?.id === 'downloadableResource'
			|| section.internalLink?.sys?.contentType?.sys?.id === 'eventRegistration'
		) {
			const paths = useInternalPaths();
			const [staticPage] = paths.filter(path => path.id === section.internalLink.id);

			// Referencing a internal link but not relating it to a section
			// can cause issues which is mitigated by # link
			return {link: staticPage?.path ?? '#', isExternal: false};
		}

		if (link.length <= 0) {
			return {link: '#', isExternal: true};
		}

		return {link: sanitizeLink(link), isExternal: false};
	}

	if (section.externalLink) {
		return {link: section.externalLink, isExternal: true};
	}

	if (section?.__typename) {
		switch (section?.link?.internalContent?.__typename) {
			case 'ContentfulSection':
			case 'ContentfulReferencedSection':
				const sectionLink = section?.link?.internalContent?.page?.[0];
				if (sectionLink) {
					link.push(slugify(sectionLink.title, {lower: true, strict: true}));
					link.push(`#${slugify(sectionLink.header ?? sectionLink.id, {lower: true, strict: true})}`);
				}

				break;

			default:
				const paths = useInternalPaths();
				const staticPage = paths.find(path => path.id === section?.link?.internalContent?.id);

				// Referencing a internal link but not relating it to a section
				// can cause issues which is mitigated by # link
				return {link: staticPage?.path ?? '#', isExternal: false};
		}

		if (link.length <= 0) {
			return {link: '#', isExternal: true};
		}

		return {link: sanitizeLink(link), isExternal: false};
	}

	return {link: '#', isExternal: true};
};
