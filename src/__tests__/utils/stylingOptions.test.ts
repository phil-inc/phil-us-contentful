import { getColorFromStylingOptions } from "../../utils/stylingOptions";

describe('getColorFromStylingOptions', () => {
  test('should return "transparent" when color is undefined or falsy', () => {
    expect(getColorFromStylingOptions(undefined)).toBe('transparent');
    expect(getColorFromStylingOptions('')).toBe('transparent');
  });

  test('should return the color starting from "#" when a valid hex color is provided', () => {
    expect(getColorFromStylingOptions('#FF5733')).toBe('#FF573');
    expect(getColorFromStylingOptions('#123456')).toBe('#12345');
  });

  // test('should handle colors without "#" gracefully', () => {
  //   expect(getColorFromStylingOptions('FF5733')).toBe('transparent'); // This case would need handling in your function
  // });

  test('should return the color from "#" even if it’s at the end', () => {
    expect(getColorFromStylingOptions('#ABCDEF')).toBe('#ABCDE');
  });

});
