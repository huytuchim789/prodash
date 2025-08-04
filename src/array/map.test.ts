import { map } from './map';

describe('map', () => {
  it('should map values correctly', () => {
    const result = map([1, 2, 3], x => x * 2);
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
    const result = map([], x => x);
    expect(result).toEqual([]);
  });

  it('should throw TypeError for non-array input', () => {
    expect(() => map(null as any, x => x)).toThrow(TypeError);
    expect(() => map(undefined as any, x => x)).toThrow(TypeError);
    expect(() => map('string' as any, x => x)).toThrow(TypeError);
  });

  it('should throw TypeError for non-function iteratee', () => {
    expect(() => map([1, 2, 3], null as any)).toThrow(TypeError);
    expect(() => map([1, 2, 3], 'string' as any)).toThrow(TypeError);
  });

  it('should not mutate original array', () => {
    const original = [1, 2, 3];
    const originalCopy = [...original];
    map(original, x => x * 2);
    expect(original).toEqual(originalCopy);
  });

  it('should work with complex objects', () => {
    const users = [{ name: 'john', age: 30 }, { name: 'jane', age: 25 }];
    const names = map(users, user => user.name);
    expect(names).toEqual(['john', 'jane']);
  });
});