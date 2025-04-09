import { useInternalPaths } from "hooks/useInternalPaths";
import { type ContentfulButton } from "layouts/Layout/CHeader/CHeader";
import slugify from "slugify";
import { CaseStudy } from "templates/case-study";
import type { TResource } from "types/resource";
import type { IReferencedSection, ISection } from "types/section";

/**
 * Get internal and external hyperlinks from contentful data models.
 * @param section A section or resource.
 * @returns a link string.
 */
export const getLink = (
  section: ISection | IReferencedSection | TResource | ContentfulButton | CaseStudy,
  v2 = false,
): { link: string; isExternal: boolean; linkLabel: string } => {
  const link: string[] = [];
  const sanitizeLink = (link: string[]) =>
    `/${link.filter((piece, index) => !(index === 0 && piece === "home")).join("/")}`;

  if (section?.internalLink) {
    if (
      section.internalLink?.sys?.contentType?.sys?.id === "section" ||
      section.internalLink.sys?.contentType?.sys?.id === "referencedSection"
    ) {
      const paths = useInternalPaths();
      const staticPage = paths.find(
        (path) => path.id === section?.internalLink?.id,
      );

      // Can happen only for resources pages
      if (staticPage) {
        return { link: staticPage.path, isExternal: false };
      }

      if (section.internalLink?.page?.[0]) {
        link.push(
          slugify(section.internalLink.page[0].title, {
            lower: true,
            strict: true,
          }),
        );
        link.push(
          `#${slugify(section.internalLink.header ?? section.internalLink.id, { lower: true, strict: true })}`,
        );
      }
    } else if (section.internalLink?.sys?.contentType?.sys?.id === "page") {
      link.push(
        slugify(
          (section as IReferencedSection)?.internalLink?.slug ??
            section.internalLink.title!,
          {
            lower: true,
            strict: true,
          },
        ),
      );
    } else if (
      section.internalLink?.sys?.contentType?.sys?.id === "resource" ||
      section.internalLink?.sys?.contentType?.sys?.id ===
        "downloadableResource" ||
      section.internalLink?.sys?.contentType?.sys?.id === "eventRegistration"
    ) {
      const paths = useInternalPaths();
      const [staticPage] = paths.filter(
        (path) => path.id === section.internalLink.id,
      );

      // Referencing a internal link but not relating it to a section
      // can cause issues which is mitigated by # link
      return { link: staticPage?.path ?? "#", isExternal: false };
    }

    if (link.length <= 0) {
      return { link: "#", isExternal: true };
    }

    return { link: sanitizeLink(link), isExternal: false };
  }

  if (section?.externalLink) {
    return { link: section.externalLink, isExternal: true };
  }

  if (section?.__typename) {
    const paths = useInternalPaths();
    switch (section?.link?.internalContent?.__typename) {
      case "ContentfulSection":
      case "ContentfulReferencedSection":
        const sectionLink = section?.link?.internalContent?.page?.[0];

        const icid = section.link.internalContent.id 
        const existingPage = paths.find((path)=> path.id === icid);
        
        // check if the existing page is a resource section page
        if (existingPage?.path.startsWith("/insights/")) {
          link.push(existingPage.path.slice(1));
          break;
        }
        
        if (sectionLink) {
          link.push(slugify(sectionLink.title, { lower: true, strict: true }));

          link.push(
            `#${slugify(sectionLink.header ?? sectionLink.id, { lower: true, strict: true })}`,
          );
        }

        break;

      default:
        const staticPage = paths.find(
          (path) =>
            path.id === (section?.link?.internalContent?.id ?? section?.id),
        );

        // Referencing a internal link but not relating it to a section
        // can cause issues which is mitigated by # link
        return { link: staticPage?.path ?? "#", isExternal: false };
    }

    if (link.length <= 0) {
      return { link: "#", isExternal: true };
    }

    return { link: sanitizeLink(link), isExternal: false };
  }

  if (section?.link) {
    if (section.link[0].internalContent) {
      const paths = useInternalPaths();
      const staticPage = paths.find(
        (path) => path.id === section.link[0].internalContent.id,
      );

      // Referencing a internal link but not relating it to a section
      // can cause issues which is mitigated by # link
      return {
        link: staticPage?.path ?? "#",
        isExternal: false,
        linkLabel: section.link[0].linkLabel,
      };
    }

    return {
      link: section.link.externalUrl ?? "#",
      isExternal: true,
      linkLabel: section.link[0].linkLabel,
    };
  }

  if (section?.sys?.__typename === "ContentfulResourceSys") {
    const paths = useInternalPaths();
    const [staticPage] = paths.filter((path) => path.id === section.id);

    return {
      link: staticPage?.path ?? "#",
      isExternal: false,
      linkLabel: section.buttonText ?? "Learn more",
    };
  }

  if (section?.hyperlink?.internalContent) {
    const paths = useInternalPaths();
    const staticPage = paths.find(
      (path) => path.id === section.hyperlink.internalContent.id,
    );

    // Referencing a internal link but not relating it to a section
    // can cause issues which is mitigated by # link
    return {
      link: staticPage?.path ?? "#",
      isExternal: false,
      linkLabel: section.hyperlink.linkLabel,
    };
  }

  if (section?.hyperlink?.externalUrl) {
    return {
      link: section.hyperlink.externalUrl,
      isExternal: true,
      linkLabel: section.hyperlink.linkLabel,
    };
  }

  return { link: "#", isExternal: true, linkLabel: "Learn more" };
};
