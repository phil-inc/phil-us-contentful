import { getTitle } from "../../utils/getTitle";


describe('getTitle', () => {
  test('should return displayTitle if it is not empty', () => {
    const titleId = '123';
    const displayTitle = 'Custom Title';
    const result = getTitle(titleId, displayTitle);
    expect(result).toBe(displayTitle);
  });

  test('should return titleId if displayTitle is an empty string', () => {
    const titleId = '123';
    const displayTitle = '';
    const result = getTitle(titleId, displayTitle);
    expect(result).toBe(titleId);
  });

});
