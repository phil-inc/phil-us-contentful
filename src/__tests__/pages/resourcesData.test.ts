import { RESOURCES_DATA, TOPICS, TYPES } from "../../pages/resources/_data";
import { PRESS_DATA } from "../../pages/press/_data";

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

it("lists the Okhati Group press release once in the press library and resources hub", () => {
  const title = "PHIL Partners with Okhati Group to power all in one paracetamol";
  const press = PRESS_DATA.filter((item) => item.title === title);
  const resources = RESOURCES_DATA.filter((item) => item.title === title);

  expect(press).toEqual([expect.objectContaining({ outlet: "Press Release", type: "Release", date: "2026-11-02" })]);
  expect(resources).toEqual([expect.objectContaining({ topics: ["direct"], type: "press", url: press[0]?.url })]);
});
