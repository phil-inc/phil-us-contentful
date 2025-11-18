


import { getDescriptionFromRichtext } from '../../utils/getDescription';

describe('getDescriptionFromRichtext', () => {
  test('should return the first three sentences from the rich text field', () => {
    const rawRichText = JSON.stringify({
      nodeType: 'document',
      data: {},
      content: [
        { nodeType: 'text', value: 'This is the first sentence.' },
        { nodeType: 'text', value: 'This is the second sentence.' },
        { nodeType: 'text', value: 'This is the third sentence.' },
        { nodeType: 'text', value: 'This is the fourth sentence.' },
      ],
    });

    const result = getDescriptionFromRichtext(rawRichText);
    expect(result).toBe('This is the first sentence.This is the second sentence.This is the third sentence.This is the fourth sentence.');
  });

  test('should return less than three sentences if there are not enough sentences', () => {
    const rawRichText = JSON.stringify({
      nodeType: 'document',
      data: {},
      content: [
        { nodeType: 'text', value: 'This is the only sentence.' },
      ],
    });

    const result = getDescriptionFromRichtext(rawRichText);
    expect(result).toBe('This is the only sentence.');
  });

  test('should return an empty string for malformed JSON', () => {
    const malformedRichText = "{ invalid json }";
    const result = getDescriptionFromRichtext(malformedRichText);
    expect(result).toBe('');
  });

  test('should return an empty string for empty input', () => {
    const result = getDescriptionFromRichtext('');
    expect(result).toBe('');
  });

});
