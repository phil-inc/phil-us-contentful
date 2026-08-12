import fs from "fs";
import path from "path";
import ts from "typescript";
import slugify from "slugify";
import { pagination } from "../../utils/pagination";
import { POSTS_PER_SECTION } from "../../constants/section";
import { createPageObject } from "../../utils/pageObjectCreator";
import { templateFactory } from "../../factories/templateFactory";
import { HOME, INSIGHTS } from "../../constants/page";
import { FEATURES } from "../../config/feature.config";

/**
 * MRTG-1444 — GenerateMainPages must not create a Contentful page at
 * solution/hub, because a static file-based page serves that route. It must
 * also keep skipping the old solution/core slug, so a stale Contentful entry
 * cannot re-create the moved page and defeat the netlify redirect.
 *
 * The strategy file carries pre-existing type errors that make a plain
 * `import` fail under ts-jest. It is therefore transpiled without type checks
 * and run with stub modules, which also isolates it from Gatsby.
 */

const strategyPath = path.resolve(__dirname, "../../strategies/GenerateMainPages.ts");

const moduleStubs: Record<string, unknown> = {
  slugify: { default: slugify, __esModule: true },
  "../utils/pagination": { pagination },
  "../constants/section": { POSTS_PER_SECTION },
  "../utils/pageObjectCreator": { createPageObject },
  "../factories/templateFactory": { templateFactory },
  "../constants/page": { HOME, INSIGHTS },
  "../config/feature.config": { FEATURES },
  gatsby: {},
  "../types/page": {},
  "../types/section": {},
};

type GenerateMainPages = (
  context: { actions: unknown; graphql: unknown },
  callback: (resourceSubPages: string[]) => void,
) => Promise<void>;

const loadGenerateMainPages = (): GenerateMainPages => {
  const source = fs.readFileSync(strategyPath, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2019,
      esModuleInterop: true,
    },
    fileName: strategyPath,
  });

  const exportsObject: Record<string, unknown> = {};
  const moduleObject = { exports: exportsObject };
  const stubRequire = (request: string): unknown => {
    if (request in moduleStubs) return moduleStubs[request];
    throw new Error(`GenerateMainPages required an unexpected module: ${request}`);
  };

  // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
  const factory = new Function("require", "exports", "module", outputText);
  factory(stubRequire, exportsObject, moduleObject);

  return (moduleObject.exports as { default: GenerateMainPages }).default;
};

type ContentfulNode = {
  slug: string;
  id: string;
  title: string;
  sections: unknown[];
};

const makeNode = (slug: string, title = "Some Page"): ContentfulNode => ({
  slug,
  id: `id-${slug}`,
  title,
  sections: [],
});

const runStrategy = async (nodes: ContentfulNode[]): Promise<string[]> => {
  const generateMainPages = loadGenerateMainPages();
  const createdPaths: string[] = [];
  const actions = {
    createPage: (pageObject: { path: string }) => createdPaths.push(pageObject.path),
  };
  const graphql = async () => ({ data: { allContentfulPage: { nodes } } });

  await generateMainPages({ actions, graphql }, () => {});

  return createdPaths;
};

describe("GenerateMainPages — solution slug guards", () => {
  test("skips solution/hub, so the static page serves the route", async () => {
    const created = await runStrategy([makeNode("solution/hub", "Solution Hub")]);

    expect(created).toEqual([]);
  });

  test("still skips the old solution/core slug", async () => {
    const created = await runStrategy([makeNode("solution/core", "Core Hub")]);

    expect(created).toEqual([]);
  });

  test("still skips the removed solution overview slug", async () => {
    const created = await runStrategy([makeNode("solution", "Our Solution")]);

    expect(created).toEqual([]);
  });

  test("skips solution/direct, which the sibling static page serves", async () => {
    const created = await runStrategy([makeNode("solution/direct", "PHIL Direct")]);

    expect(created).toEqual([]);
  });

  test("creates other pages, so the guards are not too wide", async () => {
    const created = await runStrategy([
      makeNode("solution/hub"),
      makeNode("solution/core"),
      makeNode("solution"),
      makeNode("solution/direct"),
      makeNode("careers", "Careers"),
      makeNode("company", "Company"),
    ]);

    expect(created).toEqual(["careers", "company"]);
  });

  test("a similar slug is not caught by the guards", async () => {
    // The guards use exact equality. A different slug must still get a page.
    const created = await runStrategy([
      makeNode("solution/hubs", "Hubs"),
      makeNode("solution/hub/extra", "Extra"),
      makeNode("solutions", "Solutions"),
    ]);

    expect(created).toEqual(["solution/hubs", "solution/hub/extra", "solutions"]);
  });

  test("the guard is case sensitive, which documents current behavior", async () => {
    const created = await runStrategy([makeNode("Solution/Hub", "Hub")]);

    expect(created).toEqual(["Solution/Hub"]);
  });

  test("the source file guards both hub and core slugs", () => {
    const source = fs.readFileSync(strategyPath, "utf8");

    expect(source).toContain('if (page.slug === "solution/hub") return;');
    expect(source).toContain('if (page.slug === "solution/core") return;');
  });
});
