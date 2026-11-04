import { RESOURCES_DATA, TOPICS, TYPES } from "../../pages/resources/_data";

describe("RESOURCES_DATA: pharma DTP research report (MRTG-1461)", () => {
  const rows = RESOURCES_DATA.filter((item) => item.url === "/pharma-dtp-research/");

  it("lists the report exactly once, with the ticket's tags (Reports, Direct-to-Patient)", () => {
    expect(rows).toHaveLength(1);
    expect(rows[0]).toEqual({
      title: "Pharma Perspectives on Direct-to-Patient: The Future of DTP Success",
      topics: ["direct"],
      type: "report",
      url: "/pharma-dtp-research/",
      buttonLabel: "Download",
    });
  });

  it("uses a type and topics the page's filters know", () => {
    const typeKeys = TYPES.map((t) => t.key as string);
    const topicKeys = TOPICS.map((t) => t.key as string);

    expect(typeKeys).toContain(rows[0]?.type);
    rows[0]?.topics.forEach((topic) => expect(topicKeys).toContain(topic));
  });
});

describe("RESOURCES_DATA: Okhati Group press release", () => {
  it("lists the release once as a Press item tagged Direct-to-Patient", () => {
    const rows = RESOURCES_DATA.filter((item) => item.title === "PHIL Partners with Okhati Group to power all in one paracetamol");

    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ topics: ["direct"], type: "press", url: "https://www.businesswire.com/news/home/20261102003021/en/PHIL-Partners-with-Okhati-Group" });
  });
});
