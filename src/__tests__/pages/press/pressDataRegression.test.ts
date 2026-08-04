import { PRESS_DATA, PressItem } from "../../../pages/press/_data";

/**
 * Adversarial tests probing regressions in PRESS_DATA ordering and integrity.
 * These go beyond the basic checks to verify no existing data was corrupted
 * by the insertion of new entries at positions 0 and 1.
 */
describe("PRESS_DATA ordering and regression checks", () => {
  // ─── Verify existing entries were not displaced incorrectly ────────────────

  test("third entry should still be the original first entry (Protecting Gross-to-Net)", () => {
    expect(PRESS_DATA[2].title).toBe(
      "Protecting Gross-to-Net Performance Through Single-Channel Ecosystems"
    );
    expect(PRESS_DATA[2].type).toBe("Thought Leadership");
    expect(PRESS_DATA[2].outlet).toBe("Drug Channels");
  });

  test("fourth entry should be PHIL Invests (original second entry)", () => {
    expect(PRESS_DATA[3].title).toContain("PHIL Invests in State-of-the-Art Cash Dispense");
    expect(PRESS_DATA[3].type).toBe("Release");
  });

  test("last entry should still be Duchesnay USA item", () => {
    const last = PRESS_DATA[PRESS_DATA.length - 1];
    expect(last.title).toContain("Duchesnay USA");
    expect(last.type).toBe("Release");
  });

  // ─── Verify no data corruption in existing entries ─────────────────────────

  test("all original entries (indices 2-13) should have unchanged URLs", () => {
    // Snapshot of original URLs in order
    const expectedOriginalUrls = [
      "https://www.drugchannels.net/2026/05/protecting-gross-to-net-performance.html",
      "https://www.businesswire.com/news/home/20260421670832/en/PHIL-Invests-in-State-of-the-Art-Cash-Dispense-Capabilities-Expanding-Direct-to-Patient-Fulfillment-for-Pharma",
      "https://www.businesswire.com/news/home/20260402677480/en/Tenpoint-Therapeutics-Ltd-and-PHIL-Partner-to-Launch-YUVEZZI-Direct-to-Patient-Cash-Program-to-Make-Novel-Presbyopia-Therapy-More-Accessible-and-Affordable",
      "https://www.prnewswire.com/news-releases/phil-and-sprout-pharmaceuticals-expand-their-affordable-direct-to-patient-access-program-for-addyiflibanserin-302655793.html",
      "https://www.fiercepharma.com/sponsored/hidden-gtn-drain-why-specialty-lite-brands-need-streamline-their-pa-process-optimal",
      "https://www.lifescienceleader.com/doc/pharma-direct-to-patient-from-experiment-to-imperative-0001",
      "https://www.drugchannels.net/2025/02/from-data-gaps-to-revenue-gains.html",
      "https://www.biopharmadive.com/spons/redefining-commercial-success-in-specialty-lite-with-alternative-channels/753650/",
      "https://www.biopharmadive.com/spons/bridging-the-data-gaps-that-impact-retail-and-specialty-lite-success/747704/",
      "https://www.businesswire.com/news/home/20250922836527/en/PHIL-Launches-Direct-to-Patient-2.0-Platform-to-Transform-Access-Affordability-and-Adherence-in-Pharma",
      "https://www.prnewswire.com/news-releases/phil-secures-60-million-growth-capital-facility-from-k2-healthventures-to-accelerate-ai-integration-302499313.html",
      "https://www.businesswire.com/news/home/20230109005280/en/Phil-Inc.-Adds-Duchesnay-USAs-Womens-Healthcare-Product-to-Its-Patient-Access-Platform",
    ];

    for (let i = 0; i < expectedOriginalUrls.length; i++) {
      expect(PRESS_DATA[i + 2].url).toBe(expectedOriginalUrls[i]);
    }
  });

  // ─── Verify type counts are correct ───────────────────────────────────────

  test("should have exactly 7 Release entries", () => {
    const releases = PRESS_DATA.filter((d) => d.type === "Release");
    expect(releases).toHaveLength(7);
  });

  test("should have exactly 7 Thought Leadership entries", () => {
    const thought = PRESS_DATA.filter((d) => d.type === "Thought Leadership");
    expect(thought).toHaveLength(7);
  });

  // ─── Verify FEATURED_RELEASES reflects new ordering ────────────────────────

  test("first three Releases in order should be: new entry, PHIL Invests, Tenpoint", () => {
    const releases = PRESS_DATA.filter((d) => d.type === "Release");
    expect(releases[0].title).toBe(
      "Why brands fail as a medical service. Phil will help you"
    );
    expect(releases[1].title).toContain("PHIL Invests");
    expect(releases[2].title).toContain("Tenpoint Therapeutics");
  });

  test("first three Thought Leadership in order should be: new entry, Drug Channels, Fierce Pharma", () => {
    const thought = PRESS_DATA.filter((d) => d.type === "Thought Leadership");
    expect(thought[0].title).toBe(
      "Designing a Transformative Direct-to-Patient Program to Drive Brand Growth"
    );
    expect(thought[1].title).toContain("Protecting Gross-to-Net");
    expect(thought[2].title).toContain("Hidden GTN Drain");
  });

  // ─── New entry field completeness ─────────────────────────────────────────

  test("new entries should have all required PressItem fields", () => {
    const requiredKeys: (keyof PressItem)[] = ["title", "outlet", "type", "url"];

    [PRESS_DATA[0], PRESS_DATA[1]].forEach((item) => {
      requiredKeys.forEach((key) => {
        expect(item).toHaveProperty(key);
        expect(item[key]).toBeDefined();
        expect(typeof item[key]).toBe("string");
      });
    });
  });

  test("new entries should not have unexpected extra properties", () => {
    const allowedKeys = ["title", "description", "outlet", "type", "url"];

    [PRESS_DATA[0], PRESS_DATA[1]].forEach((item) => {
      Object.keys(item).forEach((key) => {
        expect(allowedKeys).toContain(key);
      });
    });
  });

  // ─── Boundary: duplicate URL at exact positions ────────────────────────────

  test("the duplicate URL occurs at exactly indices 1 and 3 (nowhere else)", () => {
    const duplicateUrl = PRESS_DATA[1].url;
    const indicesWithThisUrl = PRESS_DATA
      .map((item, i) => (item.url === duplicateUrl ? i : -1))
      .filter((i) => i !== -1);
    expect(indicesWithThisUrl).toEqual([1, 3]);
  });

  // ─── All non-duplicate URLs should be unique ──────────────────────────────

  test("aside from the intentional duplicate, all other URLs should be unique", () => {
    const duplicateUrl = PRESS_DATA[1].url;
    const otherUrls = PRESS_DATA.filter((item) => item.url !== duplicateUrl).map(
      (item) => item.url
    );
    const uniqueOthers = new Set(otherUrls);
    expect(uniqueOthers.size).toBe(otherUrls.length);
  });
});
