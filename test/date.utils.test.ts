import { format } from "date-fns-tz";
import {
  convertDateToCustomFormat,
  isValidDateString,
} from "./../src/utils/date";
import { TIME_ZONE_USA } from "../src/constants/global.constant";

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

    // Parse the result back to a Date object (best-effort) and check it falls between `before` and `after`
    const resultDate = new Date(result);
    expect(resultDate.getTime()).toBeGreaterThanOrEqual(
      new Date(format(before, "MMMM d, yyyy", { timeZone })).getTime(),
    );
    expect(resultDate.getTime()).toBeLessThanOrEqual(
      new Date(format(after, "MMMM d, yyyy", { timeZone })).getTime(),
    );
  });
});
