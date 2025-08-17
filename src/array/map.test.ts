import { map } from './map';

describe('map', () => {
  it('should map values correctly', () => {
    const result = map([1, 2, 3], (x: number) => x * 2);
    expect(result).toEqual([2, 4, 6]);
  });

  it('should pass index and array to iteratee', () => {
    const iteratee = jest.fn();
    const array = [1, 2, 3];
    map(array, iteratee);

    expect(iteratee).toHaveBeenCalledTimes(3);
    expect(iteratee).toHaveBeenCalledWith(1, 0, array);
    expect(iteratee).toHaveBeenCalledWith(2, 1, array);
    expect(iteratee).toHaveBeenCalledWith(3, 2, array);
  });

  it('should handle empty arrays', () => {
    const result = map([], (x: number) => x);
    expect(result).toEqual([]);
  });

  it('should throw TypeError for non-array input', () => {
    expect(() => map(null as any, (x: number) => x)).toThrow(TypeError);
    expect(() => map(undefined as any, (x: number) => x)).toThrow(TypeError);
  });

  it('should throw TypeError for non-function iteratee', () => {
    expect(() => map([1, 2, 3], null as any)).toThrow(TypeError);
  });

  it('should not mutate original array', () => {
    const original = [1, 2, 3];
    const originalCopy = [...original];
    map(original, (x: number) => x * 2);
    expect(original).toEqual(originalCopy);
  });

  it('should work with complex objects', () => {
    type User = { name: string; age: number };
    const users = [
      { name: 'john', age: 30 },
      { name: 'jane', age: 25 },
    ];
    const names = map(users, (user: User) => user.name);
    expect(names).toEqual(['john', 'jane']);
  });

  // New test cases for String
  it('should work with strings', () => {
    const str = 'hello';
    const result = map(str, (char: string) => char.toUpperCase());
    expect(result).toEqual(['H', 'E', 'L', 'L', 'O']);

    // Test with index
    const withIndex = map(str, (char: string, i: number) => `${char}${i}`);
    expect(withIndex).toEqual(['h0', 'e1', 'l2', 'l3', 'o4']);
  });
});
