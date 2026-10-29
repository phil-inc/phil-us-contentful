import GenerateMainPages from "../../strategies/GenerateMainPages";

/**
 * MRTG-1462 — /patient-dtp-research/ and /hcp-dtp-research/ are static file-based pages that replace the
 * Contentful pages "dtp-research" and "hcp-research". The Contentful entries still exist, so the strategy
 * must skip them: built, they would claim the old routes over the netlify.toml 301s.
 */

type ContentfulNode = { slug: string; id: string; title: string; sections: unknown[] };

const createdPaths = async (nodes: ContentfulNode[]): Promise<string[]> => {
  const created: string[] = [];
  const context = {
    actions: { createPage: ({ path }: { path: string }) => created.push(path) },
    graphql: async () => ({ data: { allContentfulPage: { nodes } } }),
  } as unknown as Parameters<typeof GenerateMainPages>[0];

  await GenerateMainPages(context);

  return created;
};

const page = (slug: string): ContentfulNode => ({ slug, id: `${slug}-page`, title: slug, sections: [] });

test("builds nothing from the retired dtp-research and hcp-research pages, and still builds the others", async () => {
  expect(await createdPaths([page("dtp-research"), page("hcp-research"), page("careers")])).toEqual(["careers"]);
});
