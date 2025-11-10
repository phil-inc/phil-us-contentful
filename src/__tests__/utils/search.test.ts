import { generateSearchParams } from "../../utils/search";

describe('generateSearchParams', () => {
  it('should generate search params with the search term and filters', () => {
    const filterOptions = ['filter1', 'filter2'];
    const searchTerm = 'example';
    
    const result = generateSearchParams(filterOptions, searchTerm);
    const expected = '?q=example&filter=filter1&filter=filter2';
    
    expect(result).toBe(expected);
  });

  it('should ignore empty or whitespace filters', () => {
    const filterOptions = ['filter1', '', ' ', 'filter2'];
    const searchTerm = 'example';
    
    const result = generateSearchParams(filterOptions, searchTerm);
    const expected = '?q=example&filter=filter1&filter=filter2';
    
    expect(result).toBe(expected);
  });

  it('should generate only the search term if no filters are provided', () => {
    const filterOptions: string[] = [];
    const searchTerm = 'example';
    
    const result = generateSearchParams(filterOptions, searchTerm);
    const expected = '?q=example';
    
    expect(result).toBe(expected);
  });

  it('should handle an empty search term', () => {
    const filterOptions = ['filter1'];
    const searchTerm = '';
    
    const result = generateSearchParams(filterOptions, searchTerm);
    const expected = '?q=&filter=filter1';
    
    expect(result).toBe(expected);
  });

//   it('should handle only whitespace search term', () => {
//     const filterOptions = ['filter1'];
//     const searchTerm = '   ';
    
//     const result = generateSearchParams(filterOptions, searchTerm);
//     const expected = '?q=   &filter=filter1';
    
//     expect(result).toBe(expected);
//   });
});
