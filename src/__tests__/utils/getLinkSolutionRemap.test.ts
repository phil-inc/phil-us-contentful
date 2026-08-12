import fs from "fs";
import path from "path";
import ts from "typescript";
import slugify from "slugify";

/**
 * MRTG-1444 — getLink remaps the removed "solution" Contentful page to the
 * live Digital Hub. The target changed from /solution/core/ to /solution/hub/.
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

  test("current behavior: the solution/core slug is not remapped", () => {
    // The remap table keys on the "solution" slug only. A Contentful entry with
    // the old "solution/core" slug resolves to "#", the same as before the move.
    // The netlify redirect does not cover this in-app link.
    const result = getLink({
      link: [{ internalContent: { slug: "solution/core", id: "core-id" }, linkLabel: "Old" }],
    });

    expect(result.link).toBe("#");
  });
});
