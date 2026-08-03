/**
 * Adversarial tests for src/pages/patients/index.tsx
 *
 * These tests verify the two changes made in the branch:
 * 1. Hero h1 text changed from "Easy, Affordable" to "Very Easy, Affordable"
 * 2. VpCheckIcon removed from the "Affordable Medications" feature head
 *
 * Since the project uses testEnvironment: "node" and has no React Testing Library,
 * we parse the source to validate content and structural correctness.
 */
import * as fs from "fs";
import * as path from "path";

const SRC_PATH = path.resolve(
  __dirname,
  "../../../pages/patients/index.tsx",
);
const source = fs.readFileSync(SRC_PATH, "utf-8");

describe("patients/index.tsx — HeroSection h1 text", () => {
  test("h1 contains 'Very Easy, Affordable' (updated copy)", () => {
    expect(source).toContain("Very Easy, Affordable");
  });

  test("h1 does NOT contain old copy 'Easy, Affordable' without 'Very' prefix", () => {
    // The string "Very Easy, Affordable" contains "Easy, Affordable" as a substring,
    // so we check that there's no standalone occurrence of the old phrase.
    // Remove all occurrences of the new phrase, then check old phrase is absent.
    const withoutNew = source.replace(/Very Easy, Affordable/g, "");
    expect(withoutNew).not.toContain("Easy, Affordable");
  });

  test("h1 still contains 'Prescriptions with' on the second line", () => {
    expect(source).toContain("Prescriptions with");
  });

  test("h1 still contains PHILRx brand name", () => {
    // Inside the h1 span
    expect(source).toMatch(/className=\{classes\.accent\}\s*>\s*PHILRx/);
  });
});

describe("patients/index.tsx — ValueProp feature icons", () => {
  /**
   * Extract the three vpFeature blocks from the ValueProp section.
   * Each feature block is delimited by <div className={classes.vpFeature}>.
   */
  function extractFeatureBlocks(): string[] {
    const featurePattern = /<div className=\{classes\.vpFeature\}>/g;
    const indices: number[] = [];
    let match: RegExpExecArray | null;
    while ((match = featurePattern.exec(source)) !== null) {
      indices.push(match.index);
    }
    // Each block ends where the next one starts (or at end of file for last)
    const blocks: string[] = [];
    for (let i = 0; i < indices.length; i++) {
      const end = i + 1 < indices.length ? indices[i + 1] : source.length;
      blocks.push(source.slice(indices[i], end));
    }
    return blocks;
  }

  test("there are exactly 3 vpFeature blocks", () => {
    const blocks = extractFeatureBlocks();
    expect(blocks).toHaveLength(3);
  });

  test("'Affordable Medications' feature does NOT have VpCheckIcon", () => {
    const blocks = extractFeatureBlocks();
    const affordableBlock = blocks.find((b) =>
      b.includes("Affordable Medications"),
    );
    expect(affordableBlock).toBeDefined();
    expect(affordableBlock).not.toContain("<VpCheckIcon />");
  });

  test("'Convenient Access' feature DOES have VpCheckIcon", () => {
    const blocks = extractFeatureBlocks();
    const convenientBlock = blocks.find((b) =>
      b.includes("Convenient Access"),
    );
    expect(convenientBlock).toBeDefined();
    expect(convenientBlock).toContain("<VpCheckIcon />");
  });

  test("'Seamless Experience' feature DOES have VpCheckIcon", () => {
    const blocks = extractFeatureBlocks();
    const seamlessBlock = blocks.find((b) =>
      b.includes("Seamless Experience"),
    );
    expect(seamlessBlock).toBeDefined();
    expect(seamlessBlock).toContain("<VpCheckIcon />");
  });

  test("VpCheckIcon component is still defined in the file (not accidentally deleted)", () => {
    expect(source).toMatch(/const VpCheckIcon\s*=\s*\(\)/);
  });

  test("VpCheckIcon is used exactly 2 times in JSX (not 3)", () => {
    const usages = source.match(/<VpCheckIcon\s*\/>/g);
    expect(usages).toHaveLength(2);
  });

  test("'Affordable Medications' feature head contains only h3 (no icon sibling)", () => {
    const blocks = extractFeatureBlocks();
    const affordableBlock = blocks.find((b) =>
      b.includes("Affordable Medications"),
    );
    // Extract the vpFeatureHead div content for Affordable Medications
    const headMatch = affordableBlock!.match(
      /<div className=\{classes\.vpFeatureHead\}>([\s\S]*?)<\/div>/,
    );
    expect(headMatch).not.toBeNull();
    const headContent = headMatch![1];
    // Should contain h3 but no VpCheckIcon
    expect(headContent).toContain("<h3>Affordable Medications</h3>");
    expect(headContent).not.toContain("VpCheckIcon");
    expect(headContent).not.toContain("vpFicon");
  });
});

describe("patients/index.tsx — design consistency of feature items", () => {
  function extractFeatureBlocks(): string[] {
    const featurePattern = /<div className=\{classes\.vpFeature\}>/g;
    const indices: number[] = [];
    let match: RegExpExecArray | null;
    while ((match = featurePattern.exec(source)) !== null) {
      indices.push(match.index);
    }
    const blocks: string[] = [];
    for (let i = 0; i < indices.length; i++) {
      const end = i + 1 < indices.length ? indices[i + 1] : source.length;
      blocks.push(source.slice(indices[i], end));
    }
    return blocks;
  }

  test("each vpFeature block has a vpFeatureHead with an h3", () => {
    const blocks = extractFeatureBlocks();
    blocks.forEach((block) => {
      expect(block).toMatch(
        /<div className=\{classes\.vpFeatureHead\}>[\s\S]*?<h3>/,
      );
    });
  });

  test("icon removal is intentional — only first feature (Affordable Medications) lacks icon", () => {
    const blocks = extractFeatureBlocks();
    // The first block should NOT have an icon
    const firstHasIcon = blocks[0].includes("<VpCheckIcon />");
    // The second and third blocks SHOULD have icons
    const secondHasIcon = blocks[1].includes("<VpCheckIcon />");
    const thirdHasIcon = blocks[2].includes("<VpCheckIcon />");

    expect(firstHasIcon).toBe(false);
    expect(secondHasIcon).toBe(true);
    expect(thirdHasIcon).toBe(true);
  });

  test("all three feature blocks have paragraph descriptions", () => {
    const blocks = extractFeatureBlocks();
    blocks.forEach((block, i) => {
      const hasParagraph = /<p>[\s\S]+?<\/p>/.test(block);
      expect(hasParagraph).toBe(true);
    });
  });
});

describe("patients/index.tsx — structural integrity", () => {
  test("file still exports a default component or page (HeadFC usage indicates page)", () => {
    expect(source).toContain("HeadFC");
  });

  test("Layout wrapper is still present", () => {
    expect(source).toContain("<Layout");
  });

  test("HeroSection component is still rendered", () => {
    expect(source).toContain("<HeroSection");
  });

  test("ValueProp component is still rendered", () => {
    expect(source).toContain("<ValueProp");
  });
});
