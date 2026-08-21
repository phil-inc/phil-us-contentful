import fs from "fs";
import path from "path";
import ts from "typescript";
import slugify from "slugify";

/**
 * MRTG-1444 — end to end check of a Contentful internal link.
 *
 * The ticket states that no internal or external link may reach a broken page.
 * A Contentful link passes through two layers: getLink builds a path, then
 * netlify applies its rules. The sibling tests check each layer alone. These
 * tests join the two layers and check the final destination, so a gap between
 * them cannot pass.
 *
 * getLink carries pre-existing type errors that make a plain `import` fail
 * under ts-jest. It is therefore transpiled without type checks and run with
 * stub modules, which also removes the Gatsby dependency.
 */

const repoRoot = path.resolve(__dirname, "../../..");
const getLinkPath = path.join(repoRoot, "src", "utils", "getLink.ts");
const netlifyTomlPath = path.join(repoRoot, "netlify.toml");
const pagesRoot = path.join(repoRoot, "src", "pages");

/* ── Layer 1: getLink ── */

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
  const { outputText } = ts.transpileModule(
    fs.readFileSync(getLinkPath, "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2019,
        esModuleInterop: true,
      },
      fileName: getLinkPath,
    },
  );

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

/* ── Layer 2: netlify rules ── */

type Redirect = { from: string; to: string; status?: number };

const parseRedirects = (): Redirect[] =>
  fs
    .readFileSync(netlifyTomlPath, "utf8")
    .split(/^\[\[redirects\]\]\s*$/m)
    .slice(1)
    .map((block) => {
      const body = block.split(/^\[/m)[0];
      const read = (key: string): string | undefined =>
        new RegExp(`^${key}\\s*=\\s*"([^"]*)"`, "m").exec(body)?.[1];
      const status = /^status\s*=\s*(\d+)/m.exec(body);

      return {
        from: read("from") ?? "",
        to: read("to") ?? "",
        status: status ? Number(status[1]) : undefined,
      };
    })
    .filter((rule) => rule.from.startsWith("/"));

const redirects = parseRedirects();

const toMatcher = (from: string): RegExp => {
  const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^${escaped.replace(/\\\*/g, "(?:.*)")}$`);
};

/** Follow the netlify rules until no rule matches. */
const followRedirects = (requestPath: string): string => {
  let current = requestPath;

  for (let hop = 0; hop < 10; hop += 1) {
    const rule = redirects.find((candidate) =>
      toMatcher(candidate.from).test(current),
    );
    if (!rule) return current;
    current = rule.to;
  }

  throw new Error(`The rules loop for ${requestPath}`);
};

/* ── Layer 3: the routes that the build produces ── */

const collectFilePageRoutes = (
  directory: string,
  prefix = "",
  found: string[] = [],
): string[] => {
  fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (entry.name.startsWith("_")) return;
      collectFilePageRoutes(entryPath, `${prefix}/${entry.name}`, found);
      return;
    }

    if (entry.name === "index.tsx" || entry.name === "index.ts") {
      found.push(`${prefix}/`);
    }
  });

  return found;
};

const filePageRoutes = collectFilePageRoutes(pagesRoot);

/** Gatsby sets trailingSlash: 'always', so compare with a trailing slash. */
const withTrailingSlash = (route: string): string => {
  const [pathPart] = route.split("#");
  return pathPart.endsWith("/") ? pathPart : `${pathPart}/`;
};

/** The destination a visitor reaches after both layers run. */
const resolveDestination = (section: unknown): string =>
  followRedirects(getLink(section).link);

beforeEach(() => {
  stubbedPaths = [{ path: "/company/", id: "company-id" }];
});

const pageEntry = (fields: { slug?: string; title?: string }) => ({
  internalLink: {
    sys: { contentType: { sys: { id: "page" } } },
    id: "entry-id",
    ...fields,
  },
});

describe("MRTG-1444 — a Contentful link reaches the live hub page", () => {
  const oldSlugShapes: Array<[string, unknown]> = [
    ["a page entry with the old slug", pageEntry({ slug: "solution/core" })],
    [
      "a page entry with a mixed case old slug",
      pageEntry({ slug: "Solution/Core" }),
    ],
    [
      "a page entry with the old slug and a trailing slash",
      pageEntry({ slug: "solution/core/" }),
    ],
    [
      "a page entry with the removed overview slug",
      pageEntry({ slug: "solution" }),
    ],
    [
      "a page entry that carries a title only",
      pageEntry({ title: "Solution" }),
    ],
    [
      "a link entry with the old slug",
      { link: [{ internalContent: { slug: "solution/core", id: "core-id" }, linkLabel: "Hub" }] },
    ],
    [
      "a hyperlink entry with the old slug",
      { hyperlink: { internalContent: { slug: "solution/core", id: "core-id" }, linkLabel: "Hub" } },
    ],
    [
      "a typed section link with the old slug",
      { __typename: "ContentfulResource", link: { internalContent: { slug: "solution/core", id: "core-id" } } },
    ],
  ];

  test.each(oldSlugShapes)("%s ends at the built hub page", (_label, section) => {
    const destination = resolveDestination(section);

    // The link must not die at "#", and the final path must be a route that the
    // build produces. On the old code the destination was /solution/core/,
    // which no longer exists as a page.
    expect(destination).not.toBe("#");
    expect(withTrailingSlash(destination)).toBe("/solution/hub/");
    expect(filePageRoutes).toContain(withTrailingSlash(destination));
    expect(destination).not.toContain("/solution/core");
  });

  test("a stale allSitePage entry for the old page cannot win", () => {
    // A cached build could still list the old path. The remap must beat it.
    stubbedPaths = [{ path: "/solution/core/", id: "core-id" }];

    const shapes: unknown[] = [
      { link: [{ internalContent: { slug: "solution/core", id: "core-id" }, linkLabel: "Hub" }] },
      { hyperlink: { internalContent: { slug: "solution/core", id: "core-id" }, linkLabel: "Hub" } },
      pageEntry({ slug: "solution/core" }),
    ];

    shapes.forEach((shape) => {
      expect(getLink(shape).link).toBe("/solution/hub/");
    });
  });

  test("the remap stays narrow and still moves the old hub slug", () => {
    stubbedPaths = [{ path: "/solution/direct/", id: "direct-id" }];

    // The moved page goes to the new route.
    expect(withTrailingSlash(resolveDestination(pageEntry({ slug: "solution/core" })))).toBe(
      "/solution/hub/",
    );
    // A sibling page and an unrelated page keep their own route.
    expect(withTrailingSlash(resolveDestination(pageEntry({ slug: "solution/direct" })))).toBe(
      "/solution/direct/",
    );
    expect(withTrailingSlash(resolveDestination(pageEntry({ slug: "pharma" })))).toBe(
      "/pharma/",
    );
  });

  test("the harness reads real data, so an empty read cannot pass", () => {
    expect(redirects.length).toBeGreaterThan(30);
    expect(filePageRoutes).toContain("/solution/hub/");
    expect(typeof getLink).toBe("function");
  });
});
