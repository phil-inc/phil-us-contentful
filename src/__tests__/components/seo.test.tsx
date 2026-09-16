import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { SeoMeta } from "../../components/common/Seo/SeoMeta";
import { JsonLd } from "../../components/common/Seo/JsonLd";

/**
 * SeoMeta and JsonLd replace the ~15 head tags every page used to hand-write.
 * The regressions guarded here are the ones the hand-written copies shipped:
 * a missing canonical, canonical and og:url disagreeing, empty description tags,
 * and JSON-LD that content could break out of.
 */

const render = (element: React.ReactElement) => renderToStaticMarkup(element);

const metaContent = (html: string, attr: string, key: string) =>
  html.match(new RegExp(`<meta ${attr}="${key}" content="([^"]*)"/>`))?.[1];

const canonicalHref = (html: string) =>
  html.match(/<link rel="canonical" href="([^"]*)"\/>/)?.[1];

describe("SeoMeta", () => {
  const originalDeployUrl = process.env.GATSBY_DEPLOY_URL;

  beforeEach(() => {
    delete process.env.GATSBY_DEPLOY_URL;
  });

  afterAll(() => {
    process.env.GATSBY_DEPLOY_URL = originalDeployUrl;
  });

  const base = { title: "Press | PHIL", description: "Latest news.", path: "/press" };

  test("renders the title", () => {
    expect(render(<SeoMeta {...base} />)).toContain("<title>Press | PHIL</title>");
  });

  test("always renders a canonical built from the normalized path", () => {
    expect(canonicalHref(render(<SeoMeta {...base} />))).toBe(
      "https://phil.us/press/",
    );
  });

  test("og:url matches the canonical", () => {
    const html = render(<SeoMeta {...base} />);

    expect(metaContent(html, "property", "og:url")).toBe(canonicalHref(html));
  });

  test("renders the description for search, Open Graph and Twitter", () => {
    const html = render(<SeoMeta {...base} />);

    expect(metaContent(html, "name", "description")).toBe("Latest news.");
    expect(metaContent(html, "property", "og:description")).toBe("Latest news.");
    expect(metaContent(html, "name", "twitter:description")).toBe("Latest news.");
  });

  test("renders no description tags when the description is blank", () => {
    const html = render(<SeoMeta {...base} description="  " />);

    expect(html).not.toContain("description");
  });

  test("falls back to the site social card when no image is given", () => {
    const html = render(<SeoMeta {...base} />);

    expect(metaContent(html, "property", "og:image")).toBe(
      "https://phil.us/og-social-image.png",
    );
    expect(metaContent(html, "name", "twitter:image")).toBe(
      "https://phil.us/og-social-image.png",
    );
  });

  test("uses the given image", () => {
    const image = "https://images.ctfassets.net/hero.png";
    const html = render(<SeoMeta {...base} image={image} />);

    expect(metaContent(html, "property", "og:image")).toBe(image);
    expect(metaContent(html, "name", "twitter:image")).toBe(image);
  });

  test("defaults og:type to website", () => {
    expect(metaContent(render(<SeoMeta {...base} />), "property", "og:type")).toBe(
      "website",
    );
  });

  test("uses the given og:type", () => {
    expect(
      metaContent(render(<SeoMeta {...base} type="article" />), "property", "og:type"),
    ).toBe("article");
  });

  test("renders no robots tag on an indexable page", () => {
    expect(render(<SeoMeta {...base} />)).not.toContain('name="robots"');
  });

  test("a noindex page gets the robots tag and no canonical", () => {
    const html = render(<SeoMeta {...base} noindex />);

    expect(metaContent(html, "name", "robots")).toBe("noindex");
    expect(canonicalHref(html)).toBeUndefined();
  });
});

describe("JsonLd", () => {
  const scriptBodies = (html: string) =>
    [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(
      (match) => match[1],
    );

  test("renders a JSON-LD script whose content parses back to the data", () => {
    const data = { "@type": "WebPage", name: "Press" };
    const [body] = scriptBodies(render(<JsonLd data={data} />));

    expect(JSON.parse(body)).toEqual(data);
  });

  test("renders one script per node when given several", () => {
    const html = render(<JsonLd data={[{ "@type": "WebSite" }, { "@type": "WebPage" }]} />);

    expect(scriptBodies(html)).toHaveLength(2);
  });

  test("escapes markup characters so content cannot close the script tag", () => {
    const data = { name: 'AT&T </script><script>alert("x")</script>' };
    const html = render(<JsonLd data={data} />);
    const [body] = scriptBodies(html);

    expect(body).not.toMatch(/[<>&]/);
    expect(JSON.parse(body)).toEqual(data);
  });

  test("escapes line and paragraph separators", () => {
    const separators = String.fromCharCode(0x2028) + String.fromCharCode(0x2029);
    const data = { name: `one${separators}two` };
    const [body] = scriptBodies(render(<JsonLd data={data} />));

    expect(body).not.toContain(String.fromCharCode(0x2028));
    expect(body).not.toContain(String.fromCharCode(0x2029));
    expect(JSON.parse(body)).toEqual(data);
  });
});
