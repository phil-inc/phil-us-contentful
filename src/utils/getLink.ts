import { INSIGHTS } from "constants/page";
import { useInternalPaths } from "hooks/useInternalPaths";
import { type ContentfulButton } from "layouts/Layout/CHeader/CHeader";
import slugify from "slugify";
import { CaseStudy } from "templates/case-study";
import type { TResource } from "types/resource";
import type { IReferencedSection, ISection } from "types/section";

/**
 * Pages removed or moved on the site but still referenced by Contentful
 * internal links. Maps the old page's slug to its live replacement so links
 * resolve to the new page instead of "#"/404 (the old page is no longer in
 * allSitePage).
 */
const REMOVED_PAGE_REDIRECTS: Record<string, string> = {
  // /solution/ (Overview) removed; replaced by the Digital Hub.
  solution: "/solution/hub/",
  // The Digital Hub moved from the old core path to /solution/hub/.
  "solution/core": "/solution/hub/",
  // The patient and HCP research reports moved to new URLs (MRTG-1462).
  "dtp-research": "/patient-dtp-research/",
  "hcp-research": "/hcp-dtp-research/",
};

const remapRemovedPage = (
  internalContent?: { slug?: string } | null,
): string | undefined => {
  // A Contentful slug can carry a trailing slash, so the lookup normalizes it.
  const slug = internalContent?.slug?.replace(/\/+$/, "");

  // hasOwnProperty keeps a slug such as "constructor" from reading the prototype.
  if (
    !slug ||
    !Object.prototype.hasOwnProperty.call(REMOVED_PAGE_REDIRECTS, slug)
  ) {
    return undefined;
  }

  return REMOVED_PAGE_REDIRECTS[slug];
};

/**
 * The News & Insights page's sections used to be built as /insights/<section>/
 * listings. They no longer are, so a link to one of those sections goes where its
 * listing now redirects (the 301s in netlify.toml), keyed by the section header's slug.
 */
const RETIRED_INSIGHTS_LISTINGS: Record<string, string> = {
  resources: "/resources/",
  "phil-blog": "/resources/?type=blog",
  events: "/resources/?type=webinar",
  "press-releases": "/press/",
  "case-studies": "/customer-success/",
};

const remapRetiredInsightsSection = (
  pageTitle?: string | null,
  header?: string | null,
): string | undefined => {
  if (pageTitle !== INSIGHTS || typeof header !== "string") return undefined;

  const headerSlug = slugify(header, { lower: true, strict: true });
  return Object.prototype.hasOwnProperty.call(RETIRED_INSIGHTS_LISTINGS, headerSlug)
    ? RETIRED_INSIGHTS_LISTINGS[headerSlug]
    : undefined;
};

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
        const str = (section as IReferencedSection)?.internalLink?.slug ?? section.internalLink.title!;
        const hasSlash = str.includes("/");
        const slug = hasSlash
          ? slugify(str, { lower: true, remove: /[^a-zA-Z0-9/ ]/g  })
          : slugify(str, { lower: true, strict: true });

      // A moved or removed page keeps its old slug in Contentful.
      const removedPageLink = remapRemovedPage({ slug });
      if (removedPageLink) {
        return { link: removedPageLink, isExternal: false };
      }

      link.push(
        slug,
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
        
        const retiredListing = remapRetiredInsightsSection(
          sectionLink?.title,
          section.link.internalContent.header,
        );
        if (retiredListing) {
          return { link: retiredListing, isExternal: false };
        }

        if (typeof sectionLink?.title === "string") {
          link.push(slugify(sectionLink.title, { lower: true, strict: true }));

          // Anchor on the linked section, as the internalLink branch does: the page
          // object here carries only its title, so its header and id are undefined.
          const anchor = section.link.internalContent.header ?? icid;
          if (typeof anchor === "string") {
            link.push(`#${slugify(anchor, { lower: true, strict: true })}`);
          }
        }

        break;

      default:
        const removedPageLink = remapRemovedPage(section?.link?.internalContent);
        if (removedPageLink) {
          return { link: removedPageLink, isExternal: false };
        }

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
      const removedPageLink = remapRemovedPage(section.link[0].internalContent);
      if (removedPageLink) {
        return {
          link: removedPageLink,
          isExternal: false,
          linkLabel: section.link[0].linkLabel,
        };
      }

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
    const removedPageLink = remapRemovedPage(section.hyperlink.internalContent);
    if (removedPageLink) {
      return {
        link: removedPageLink,
        isExternal: false,
        linkLabel: section.hyperlink.linkLabel,
      };
    }

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
