import { MIGRATED_STATIC_PATHS } from "../../constants/migratedStaticPaths";
import { MIGRATED_STATIC_SLUGS } from "../../constants/migratedStaticSlugs";

// A Contentful link to a migrated post is resolved by entry id (useInternalPaths -> getLink).
// If a slug is migrated without its id here, that link silently becomes "#".
describe("MIGRATED_STATIC_PATHS", () => {
  const entries = Object.entries(MIGRATED_STATIC_PATHS);

  it("has exactly one entry for every migrated slug, at /<slug>/", () => {
    const slugsWithId = entries.map(([, path]) => path.replace(/^\/|\/$/g, ""));
    expect(slugsWithId.sort()).toEqual([...MIGRATED_STATIC_SLUGS].sort());
    for (const [, path] of entries) expect(path).toMatch(/^\/[a-z0-9]+(-[a-z0-9]+)*\/$/);
  });

  it("uses Gatsby node ids (UUIDs), one per post", () => {
    for (const [id] of entries) expect(id).toMatch(/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/);
    expect(new Set(entries.map(([, path]) => path)).size).toBe(entries.length);
  });

  it("maps the three /company/ spotlight entries to their pages", () => {
    expect(MIGRATED_STATIC_PATHS["beb9bee8-c51e-5d1c-81df-de06685d2d54"]).toBe(
      "/meet-neil-dean-director-of-product-management-at-phil/",
    );
    expect(MIGRATED_STATIC_PATHS["2291a094-fa1a-5ae5-9ef5-2fa7edf12732"]).toBe(
      "/meet-molly-fields-director-of-patient-support-at-phil/",
    );
    expect(MIGRATED_STATIC_PATHS["722562c4-bd4f-5ded-bef8-3dcc4fe49ea5"]).toBe(
      "/meet-abhyuday-polineni-director-of-engineering-at-phil/",
    );
  });
});
