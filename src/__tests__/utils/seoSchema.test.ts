import {
  articleSchema,
  faqPageSchema,
  organizationSchema,
  serviceSchema,
  webPageSchema,
  webSiteSchema,
} from "../../utils/seo/schema";

/**
 * Schema builders for schema.org JSON-LD.
 *
 * The rules guarded here are the ones hand-written schema kept breaking:
 * restating the company inline instead of referencing the sitewide node,
 * emitting empty strings, and building URLs without the slashes Gatsby serves.
 */

const ORGANIZATION_REF = { "@id": "https://phil.us/#organization" };

describe("organizationSchema", () => {
  test("describes PHIL under the sitewide organization id", () => {
    expect(organizationSchema()).toEqual({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://phil.us/#organization",
      name: "PHIL",
      legalName: "Phil, Inc.",
      url: "https://phil.us",
      logo: {
        "@type": "ImageObject",
        url: "https://phil.us/icons/icon-512x512.png",
        width: 512,
        height: 512,
      },
      description:
        "PHIL simplifies the prescription journey for patients and providers — solving medication access and GTN challenges for pharma brands.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "14500 N Northsight Blvd, Suite 307",
        addressLocality: "Scottsdale",
        addressRegion: "AZ",
        postalCode: "85260",
        addressCountry: "US",
      },
      sameAs: ["https://www.linkedin.com/company/phil-inc-"],
    });
  });
});

describe("webSiteSchema", () => {
  test("identifies the site and references the organization as publisher", () => {
    expect(webSiteSchema()).toEqual({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://phil.us/#website",
      url: "https://phil.us/",
      name: "PHIL",
      publisher: ORGANIZATION_REF,
    });
  });
});

describe("webPageSchema", () => {
  const base = {
    path: "/press",
    name: "Press | PHIL",
    description: "Latest news.",
    image: "https://phil.us/og-social-image.png",
  };

  test("builds a WebPage with a normalized absolute url as its @id", () => {
    const schema = webPageSchema(base);

    expect(schema["@type"]).toBe("WebPage");
    expect(schema["@id"]).toBe("https://phil.us/press/");
    expect(schema.url).toBe("https://phil.us/press/");
  });

  test("uses the requested page type", () => {
    expect(webPageSchema({ ...base, type: "CollectionPage" })["@type"]).toBe(
      "CollectionPage",
    );
  });

  test("references the organization and website by @id instead of restating them", () => {
    const schema = webPageSchema(base);

    expect(schema.publisher).toEqual(ORGANIZATION_REF);
    expect(schema.isPartOf).toEqual({ "@id": "https://phil.us/#website" });
  });

  test("omits a blank description", () => {
    expect(webPageSchema({ ...base, description: "   " })).not.toHaveProperty(
      "description",
    );
  });

  test("omits a missing image", () => {
    expect(webPageSchema({ ...base, image: null })).not.toHaveProperty("image");
  });

  test("references its main entity by @id only", () => {
    const service = serviceSchema({ path: "/solution/hub/", name: "PHIL Digital Hub" });

    expect(webPageSchema({ ...base, mainEntity: service }).mainEntity).toEqual({
      "@id": "https://phil.us/solution/hub/#service",
    });
  });

  test("omits mainEntity when none is given", () => {
    expect(webPageSchema(base)).not.toHaveProperty("mainEntity");
  });
});

describe("faqPageSchema", () => {
  const base = {
    path: "/faqs",
    name: "Frequently Asked Questions",
    description: "Answers.",
    questions: [
      { question: "What does PHIL do?", answer: '<p>See <a href="/demo/">a demo</a>.</p>' },
      { question: "How?", answer: "<ol><li>One</li><li>Two</li></ol>" },
    ],
  };

  test("is an FAQPage carrying the same page identity as webPageSchema", () => {
    const schema = faqPageSchema(base);

    expect(schema["@type"]).toBe("FAQPage");
    expect(schema["@id"]).toBe("https://phil.us/faqs/");
    expect(schema.url).toBe("https://phil.us/faqs/");
    expect(schema.publisher).toEqual(ORGANIZATION_REF);
    expect(schema.isPartOf).toEqual({ "@id": "https://phil.us/#website" });
  });

  test("lists every question in order with a plain-text answer", () => {
    expect(faqPageSchema(base).mainEntity).toEqual([
      {
        "@type": "Question",
        name: "What does PHIL do?",
        acceptedAnswer: { "@type": "Answer", text: "See a demo." },
      },
      {
        "@type": "Question",
        name: "How?",
        acceptedAnswer: { "@type": "Answer", text: "One\nTwo" },
      },
    ]);
  });
});

describe("serviceSchema", () => {
  const base = {
    path: "/solution/direct",
    name: "PHIL Direct-to-Patient",
    description: "Direct-to-Patient access.",
  };

  test("describes the service under an @id on its page url", () => {
    expect(serviceSchema(base)).toEqual({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://phil.us/solution/direct/#service",
      name: "PHIL Direct-to-Patient",
      description: "Direct-to-Patient access.",
      url: "https://phil.us/solution/direct/",
      provider: ORGANIZATION_REF,
    });
  });

  test("omits a blank description", () => {
    expect(serviceSchema({ ...base, description: "" })).not.toHaveProperty(
      "description",
    );
  });
});

describe("articleSchema", () => {
  const base = {
    path: "insights/case-studies/example",
    headline: "Example study",
    description: "What happened.",
    image: "https://images.ctfassets.net/example.png",
  };

  test("defaults to Article and points mainEntityOfPage at the page url", () => {
    const schema = articleSchema(base);

    expect(schema["@type"]).toBe("Article");
    expect(schema.url).toBe("https://phil.us/insights/case-studies/example/");
    expect(schema.mainEntityOfPage).toEqual({
      "@type": "WebPage",
      "@id": "https://phil.us/insights/case-studies/example/",
    });
  });

  test("uses the requested article type", () => {
    expect(articleSchema({ ...base, type: "BlogPosting" })["@type"]).toBe(
      "BlogPosting",
    );
  });

  test("references the organization as publisher", () => {
    expect(articleSchema(base).publisher).toEqual(ORGANIZATION_REF);
  });

  test("omits an empty description", () => {
    expect(articleSchema({ ...base, description: "" })).not.toHaveProperty(
      "description",
    );
  });

  test("emits the publication date when one is given", () => {
    expect(
      articleSchema({ ...base, datePublished: "2024-03-01" }).datePublished,
    ).toBe("2024-03-01");
  });

  test("omits the publication date when there is none", () => {
    expect(articleSchema({ ...base, datePublished: null })).not.toHaveProperty(
      "datePublished",
    );
  });

  test("never emits dateModified", () => {
    // Contentful's updatedAt moves on bulk republishes, so it cannot stand in
    // for a meaningful content change; the builder takes no modified date.
    const input = { ...base, datePublished: "2024-03-01", dateModified: "2024-05-01" };

    expect(articleSchema(input)).not.toHaveProperty("dateModified");
  });

  test("adds the author as a Person when a name is given", () => {
    expect(articleSchema({ ...base, authorName: "Jane Doe" }).author).toEqual({
      "@type": "Person",
      name: "Jane Doe",
    });
  });

  test("omits the author when no name is given", () => {
    expect(articleSchema(base)).not.toHaveProperty("author");
  });
});
