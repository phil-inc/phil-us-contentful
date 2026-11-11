import { PRESS_DATA } from "../../pages/press/_data";
import { RESOURCES_DATA } from "../../pages/resources/_data";

const TITLE = "PHIL Partners with Harrow to Power HarrowRx, An All-in-One Prescribing Destination for Eye Care";

describe("MRTG-1463: Harrow press release", () => {
  const pressRows = PRESS_DATA.filter((item) => item.title === TITLE);
  const resourceRows = RESOURCES_DATA.filter((item) => item.title === TITLE);

  it("is in the press library once, as a press release dated 2026-11-02", () => {
    expect(pressRows).toHaveLength(1);
    expect(pressRows[0]).toMatchObject({ outlet: "Press Release", type: "Release", date: "2026-11-02" });
  });

  it("sits above the 2026-10-20 release, so the library stays newest first", () => {
    const harrow = PRESS_DATA.findIndex((item) => item.title === TITLE);
    const previous = PRESS_DATA.findIndex((item) => item.date === "2026-10-20");

    expect(harrow).toBeGreaterThanOrEqual(0);
    expect(harrow).toBeLessThan(previous);
  });

  it("is in the resources hub once, as a Press item tagged Direct-to-Patient", () => {
    expect(resourceRows).toHaveLength(1);
    expect(resourceRows[0]).toMatchObject({ topics: ["direct"], type: "press", buttonLabel: "Read" });
  });

  it("links both listings to the same absolute https URL", () => {
    expect(pressRows[0]?.url).toMatch(/^https:\/\//);
    expect(resourceRows[0]?.url).toBe(pressRows[0]?.url);
  });
});

describe("MRTG-1471: Okhati Group press release", () => {
  const OKHATI = "PHIL Partners with Okhati Group to power all in one paracetamol";

  it("is first in the press library and in the resources hub as Direct-to-Patient press", () => {
    expect(PRESS_DATA[0]).toMatchObject({ title: OKHATI, type: "Release", date: "2026-11-02" });
    const resource = RESOURCES_DATA.find((item) => item.title === OKHATI);
    expect(resource).toMatchObject({ topics: ["direct"], type: "press", url: PRESS_DATA[0].url });
  });
});
