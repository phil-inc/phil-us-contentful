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

describe("RESOURCES_DATA: Drug Channels and Fierce Pharma coverage (MRTG-1474)", () => {
  it.each([
    "https://www.drugchannels.net/2026/11/the-direct-to-patient-opportunity.html",
    "https://www.fiercepharma.com/marketing/direct-patient-pharma-programs-transform-drug-access-survey",
    "https://www.drugchannels.net/2026/11/the-direct-to-opportunit.html",
    "https://www.fiercepharma.com/marketing/direct-patient-pharma-transform-drug-access",
  ])("lists %s once in the resources hub as Press and once in the press library", (url) => {
    expect(RESOURCES_DATA.filter((item) => item.url === url && item.type === "press")).toHaveLength(1);
    expect(PRESS_DATA.filter((item) => item.url === url)).toHaveLength(1);
  });
});
