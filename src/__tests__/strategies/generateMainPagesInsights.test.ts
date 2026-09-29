import GenerateMainPages from "../../strategies/GenerateMainPages";
import { INSIGHTS } from "../../constants/page";

/**
 * The News & Insights Contentful page used to be turned into /insights/<section>/
 * listing pages. Those are retired (netlify.toml 301s them to the Resources and
 * Press hubs), so this strategy must build nothing from that page, while still
 * building the other Contentful pages. The articles the listings linked to are
 * built by the other strategies.
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

test("builds no listing pages from the News & Insights page, and still builds the others", async () => {
  const insights: ContentfulNode = {
    slug: "insights",
    id: "insights-page",
    title: INSIGHTS,
    sections: [
      { id: "blog", header: "Phil Blog", references: Array.from({ length: 20 }, (_, i) => ({ id: `post-${i}` })) },
      { id: "releases", header: "Press Releases", references: [{ id: "release-1" }] },
    ],
  };
  const careers: ContentfulNode = { slug: "careers", id: "careers-page", title: "Careers", sections: [] };

  expect(await createdPaths([insights, careers])).toEqual(["careers"]);
});
