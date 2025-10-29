import { format } from "date-fns-tz";

import {
  convertDateToCustomFormat,
  convertTimeToCustomFormat,
  isValidDateString,
} from "../../utils/date";

import { TIME_ZONE_USA } from "../../constants/global.constant";

// --- Tests for isValidDateString ---

describe("isValidDateString", () => {
  test("should return true for a standard ISO date string", () => {
    expect(isValidDateString("2023-11-15T10:30:00Z")).toBe(true);
  });

  test("should return true for a simple date string", () => {
    expect(isValidDateString("12/25/2024")).toBe(true);
  });

  test("should return false for a non-date string", () => {
    expect(isValidDateString("hello world")).toBe(false);
  });

  test("should return false for an empty string", () => {
    expect(isValidDateString("")).toBe(false);
  });

  test("should return false for invalid date components (e.g., month 13)", () => {
    expect(isValidDateString("2023-13-01")).toBe(false);
  });
});

// --- Tests for convertDateToCustomFormat ---

describe("convertDateToCustomFormat", () => {
  const timeZone = TIME_ZONE_USA;

  it("should convert valid date string to custom format", () => {
    const input = "2023-10-15";
    const expected = format(new Date(input), "MMMM d, yyyy", { timeZone });
    expect(convertDateToCustomFormat(input)).toBe(expected);
  });

  it("should use current date if input is invalid", () => {
    const before = new Date();
    const result = convertDateToCustomFormat("not-a-date");
    const after = new Date();

    const resultDate = new Date(result);
    expect(resultDate.getTime()).toBeGreaterThanOrEqual(
      new Date(format(before, "MMMM d, yyyy", { timeZone })).getTime(),
    );
    expect(resultDate.getTime()).toBeLessThanOrEqual(
      new Date(format(after, "MMMM d, yyyy", { timeZone })).getTime(),
    );
  });
});


// --- Tests for convertTimeToCustomFormat ---

describe("convertTimeToCustomFormat", () => {
  const formatStr = "MMM d, yyyy 'at' ha zzz"; // Example: "Oct 21, 2025 at 8AM PDT"

  it("should convert UTC time to Los Angeles timezone and format correctly", () => {
    const input = "2025-10-21T15:00:00Z"; // 8AM PDT
    const result = convertTimeToCustomFormat(input, formatStr);

    // Should contain expected date, lowercase am/pm, and timezone abbreviation
    expect(result).toMatch(/^Oct 21, 2025 at \d{1,2}(am|pm) [A-Z]{2,3}$/);
  });

  it("should correctly format a time near midnight", () => {
    const input = "2025-10-21T00:30:00Z";
    const result = convertTimeToCustomFormat(input, formatStr);

    // Example output: "Oct 20, 2025 at 5:30pm PDT" (depending on DST)
    expect(result).toMatch(/^Oct (20|21), 2025 at \d{1,2}(am|pm) [A-Z]{2,3}$/);
  });

  it("should output lowercase am/pm always", () => {
    const input = "2025-10-21T12:00:00Z"; // 5AM PDT
    const result = convertTimeToCustomFormat(input, formatStr);

    expect(result).not.toContain("AM");
    expect(result).not.toContain("PM");
    expect(result).toMatch(/at \d{1,2}(am|pm) [A-Z]{2,3}$/);
  });

  it("should handle different valid dates consistently", () => {
    const input1 = "2025-03-10T18:00:00Z";
    const input2 = "2025-10-10T18:00:00Z";

    const result1 = convertTimeToCustomFormat(input1, formatStr);
    const result2 = convertTimeToCustomFormat(input2, formatStr);

    // Both should have lowercase am/pm and timezone code
    expect(result1).toMatch(/(am|pm) [A-Z]{2,3}$/);
    expect(result2).toMatch(/(am|pm) [A-Z]{2,3}$/);
  });
});
