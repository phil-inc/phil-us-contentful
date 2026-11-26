import GenerateMainPages from "../../strategies/GenerateMainPages";

/**
 * The /partners/ page is retired, and netlify.toml 301s its address to the home page. Its Contentful
 * entry ("partners") still exists, so the strategy must skip it: built, it would bring the old page back.
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

test("builds nothing from the retired partners page, and still builds the others", async () => {
  const sibling = "partners-in-patient-access-drive-value-for-your-biopharma-clients-with";

  expect(await createdPaths([page("partners"), page(sibling), page("careers")])).toEqual([sibling, "careers"]);
});
