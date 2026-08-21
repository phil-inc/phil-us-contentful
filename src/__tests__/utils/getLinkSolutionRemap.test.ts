import fs from "fs";
import path from "path";
import ts from "typescript";
import slugify from "slugify";

/**
 * MRTG-1444 — getLink remaps the removed "solution" page and the moved
 * "solution/core" page to the live Digital Hub at /solution/hub/.
 *
 * getLink carries pre-existing type errors that make a plain `import` fail
 * under ts-jest. It is therefore transpiled without type checks and run with a
 * stubbed useInternalPaths hook, which also removes the Gatsby dependency.
 */

const getLinkPath = path.resolve(__dirname, "../../utils/getLink.ts");

type InternalPath = { path: string; id: string };

let stubbedPaths: InternalPath[] = [];

const moduleStubs: Record<string, unknown> = {
  "hooks/useInternalPaths": { useInternalPaths: () => stubbedPaths },
  "layouts/Layout/CHeader/CHeader": {},
  "templates/case-study": { CaseStudy: class {} },
  "types/resource": {},
  "types/section": {},
  slugify: { default: slugify, __esModule: true },
};

type GetLink = (
  section: unknown,
  v2?: boolean,
) => { link: string; isExternal: boolean; linkLabel?: string };

const loadGetLink = (): GetLink => {
  const source = fs.readFileSync(getLinkPath, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2019,
      esModuleInterop: true,
    },
    fileName: getLinkPath,
  });

  const exportsObject: Record<string, unknown> = {};
  const moduleObject = { exports: exportsObject };
  const stubRequire = (request: string): unknown => {
    if (request in moduleStubs) return moduleStubs[request];
    throw new Error(`getLink required an unexpected module: ${request}`);
  };

  // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
  const factory = new Function("require", "exports", "module", outputText);
  factory(stubRequire, exportsObject, moduleObject);

  return (moduleObject.exports as { getLink: GetLink }).getLink;
};

const getLink = loadGetLink();

beforeEach(() => {
  stubbedPaths = [{ path: "/company/", id: "company-id" }];
});

describe("getLink — the removed solution page maps to /solution/hub/", () => {
  test("a link entry with the solution slug resolves to /solution/hub/", () => {
    const result = getLink({
      link: [
        {
          internalContent: { slug: "solution", id: "solution-id" },
          linkLabel: "Explore Our Solution",
        },
      ],
    });

    expect(result.link).toBe("/solution/hub/");
    expect(result.isExternal).toBe(false);
    expect(result.linkLabel).toBe("Explore Our Solution");
  });

  test("a hyperlink entry with the solution slug resolves to /solution/hub/", () => {
    const result = getLink({
      hyperlink: {
        internalContent: { slug: "solution", id: "solution-id" },
        linkLabel: "Learn more",
      },
    });

    expect(result.link).toBe("/solution/hub/");
    expect(result.isExternal).toBe(false);
  });

  test("a typed section link with the solution slug resolves to /solution/hub/", () => {
    const result = getLink({
      __typename: "ContentfulResource",
      link: { internalContent: { slug: "solution", id: "solution-id" } },
    });

    expect(result.link).toBe("/solution/hub/");
    expect(result.isExternal).toBe(false);
  });

  test("the remap wins over an allSitePage entry for the same id", () => {
    // A stale /solution/ page must not beat the remap.
    stubbedPaths = [{ path: "/solution/", id: "solution-id" }];

    const result = getLink({
      link: [{ internalContent: { slug: "solution", id: "solution-id" }, linkLabel: "Go" }],
    });

    expect(result.link).toBe("/solution/hub/");
  });

  test("the remap never returns the old /solution/core/ path", () => {
    const shapes: unknown[] = [
      { link: [{ internalContent: { slug: "solution", id: "a" }, linkLabel: "x" }] },
      { hyperlink: { internalContent: { slug: "solution", id: "a" }, linkLabel: "x" } },
      { __typename: "ContentfulResource", link: { internalContent: { slug: "solution", id: "a" } } },
    ];

    shapes.forEach((shape) => {
      expect(getLink(shape).link).not.toContain("/solution/core");
    });
  });

  test("other slugs are not remapped", () => {
    stubbedPaths = [{ path: "/solution/direct/", id: "direct-id" }];

    const result = getLink({
      link: [{ internalContent: { slug: "solution/direct", id: "direct-id" }, linkLabel: "Direct" }],
    });

    expect(result.link).toBe("/solution/direct/");
  });

  test("a link without a slug falls back to the page lookup", () => {
    stubbedPaths = [{ path: "/company/", id: "company-id" }];

    const result = getLink({
      link: [{ internalContent: { id: "company-id" }, linkLabel: "Company" }],
    });

    expect(result.link).toBe("/company/");
  });

  test("an unknown internal link still falls back to #", () => {
    const result = getLink({
      link: [{ internalContent: { slug: "missing", id: "missing-id" }, linkLabel: "Missing" }],
    });

    expect(result.link).toBe("#");
  });

  test("a link entry with the old solution/core slug resolves to /solution/hub/", () => {
    const result = getLink({
      link: [{ internalContent: { slug: "solution/core", id: "core-id" }, linkLabel: "Old" }],
    });

    expect(result.link).toBe("/solution/hub/");
    expect(result.isExternal).toBe(false);
    expect(result.linkLabel).toBe("Old");
  });

  test("a hyperlink entry with the old solution/core slug resolves to /solution/hub/", () => {
    const result = getLink({
      hyperlink: {
        internalContent: { slug: "solution/core", id: "core-id" },
        linkLabel: "Old",
      },
    });

    expect(result.link).toBe("/solution/hub/");
    expect(result.isExternal).toBe(false);
  });

  test("a typed section link with the old solution/core slug resolves to /solution/hub/", () => {
    const result = getLink({
      __typename: "ContentfulResource",
      link: { internalContent: { slug: "solution/core", id: "core-id" } },
    });

    expect(result.link).toBe("/solution/hub/");
    expect(result.isExternal).toBe(false);
  });
});

describe("getLink — an internalLink to a page entry", () => {
  const pageInternalLink = (slug: string) => ({
    internalLink: {
      sys: { contentType: { sys: { id: "page" } } },
      id: "entry-id",
      slug,
      title: "Some Title",
    },
  });

  test("the old solution/core slug resolves to /solution/hub/", () => {
    const result = getLink(pageInternalLink("solution/core"));

    expect(result.link).toBe("/solution/hub/");
    expect(result.isExternal).toBe(false);
  });

  test("the removed solution slug resolves to /solution/hub/", () => {
    const result = getLink(pageInternalLink("solution"));

    expect(result.link).toBe("/solution/hub/");
    expect(result.isExternal).toBe(false);
  });

  test("a mixed case old slug resolves to /solution/hub/", () => {
    // The branch slugifies the raw Contentful slug before the remap lookup.
    const result = getLink(pageInternalLink("Solution/Core"));

    expect(result.link).toBe("/solution/hub/");
  });

  test("the sibling solution/direct slug keeps its own path", () => {
    const result = getLink(pageInternalLink("solution/direct"));

    expect(result.link).toBe("/solution/direct");
    expect(result.isExternal).toBe(false);
  });

  test("an unrelated slug keeps its own path", () => {
    const result = getLink(pageInternalLink("company"));

    expect(result.link).toBe("/company");
  });

  test("no page internalLink resolves to a path under the old core route", () => {
    ["solution", "solution/core", "Solution/Core"].forEach((slug) => {
      expect(getLink(pageInternalLink(slug)).link).not.toContain("/solution/core");
    });
  });

  test("a prototype key slug returns a string, not a prototype member", () => {
    // The remap table is an object literal, so a lookup must not read the prototype.
    ["constructor", "toString", "valueOf", "hasOwnProperty"].forEach((slug) => {
      const result = getLink(pageInternalLink(slug));

      expect(typeof result.link).toBe("string");
      expect(result.link).toBe(`/${slug.toLowerCase()}`);
    });
  });

  test("a prototype key slug in a link entry falls back to the page lookup", () => {
    stubbedPaths = [{ path: "/company/", id: "company-id" }];

    const result = getLink({
      link: [{ internalContent: { slug: "constructor", id: "missing" }, linkLabel: "x" }],
    });

    expect(result.link).toBe("#");
  });

  test("an old slug with a trailing slash resolves to /solution/hub/", () => {
    // A Contentful editor can save the slug with a trailing slash.
    expect(getLink(pageInternalLink("solution/core/")).link).toBe("/solution/hub/");
    expect(getLink(pageInternalLink("solution/")).link).toBe("/solution/hub/");
  });
});

describe("getLink — a link entry with an old slug that has a trailing slash", () => {
  test("the link entry shape resolves to /solution/hub/", () => {
    const result = getLink({
      link: [{ internalContent: { slug: "solution/core/", id: "core-id" }, linkLabel: "Old" }],
    });

    expect(result.link).toBe("/solution/hub/");
  });

  test("the hyperlink shape resolves to /solution/hub/", () => {
    const result = getLink({
      hyperlink: {
        internalContent: { slug: "solution/core/", id: "core-id" },
        linkLabel: "Old",
      },
    });

    expect(result.link).toBe("/solution/hub/");
  });
});
