import * as fs from "fs";
import * as path from "path";

/**
 * Adversarial tests for the MegaFooter ZIP code change (85260 → 85265).
 *
 * Since the footer is a React component with Mantine dependencies,
 * we test the source file directly as text to verify:
 * 1. The new ZIP code is present
 * 2. The old ZIP code is NOT present
 * 3. Both Desktop and Mobile footers are consistent
 */
describe("MegaFooter ZIP code", () => {
  let footerSource: string;

  beforeAll(() => {
    const filePath = path.resolve(
      __dirname,
      "../../layouts/Layout/MegaFooter/megaFooter.tsx"
    );
    footerSource = fs.readFileSync(filePath, "utf-8");
  });

  test("should contain the new ZIP code 85265", () => {
    expect(footerSource).toContain("85265");
  });

  test("should NOT contain the old ZIP code 85260", () => {
    expect(footerSource).not.toContain("85260");
  });

  test("should have the new ZIP code in exactly 2 places (Desktop and Mobile)", () => {
    const matches = footerSource.match(/85265/g);
    expect(matches).not.toBeNull();
    expect(matches!.length).toBe(2);
  });

  test("both instances should be part of the full Scottsdale address", () => {
    const matches = footerSource.match(/Scottsdale, AZ 85265/g);
    expect(matches).not.toBeNull();
    expect(matches!.length).toBe(2);
  });

  test("full address should include correct street (14500 N Northsight Blvd, Suite 307)", () => {
    // Desktop uses <br /> between street and city, mobile has them on one line
    // Both should reference the correct street number and suite
    const streetMatches = footerSource.match(/14500 N Northsight Blvd, Suite 307/g);
    expect(streetMatches).not.toBeNull();
    expect(streetMatches!.length).toBe(2);
  });

  test("DesktopFooter component should contain the updated ZIP", () => {
    // DesktopFooter is defined first in the file
    const desktopMatch = footerSource.match(
      /const DesktopFooter[\s\S]*?(?=const MobileFooter)/
    );
    expect(desktopMatch).not.toBeNull();
    expect(desktopMatch![0]).toContain("85265");
    expect(desktopMatch![0]).not.toContain("85260");
  });

  test("MobileFooter component should contain the updated ZIP", () => {
    // MobileFooter is defined after DesktopFooter
    const mobileMatch = footerSource.match(/const MobileFooter[\s\S]*/);
    expect(mobileMatch).not.toBeNull();
    expect(mobileMatch![0]).toContain("85265");
    expect(mobileMatch![0]).not.toContain("85260");
  });

  test("should not have any other ZIP codes that look like the old one (8526x pattern check)", () => {
    // Make sure we didn't accidentally leave partial edits (e.g., 85261, 85262)
    const otherZips = footerSource.match(/8526[0-46-9]/g);
    expect(otherZips).toBeNull();
  });
});
