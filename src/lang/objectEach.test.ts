import objectEach from './objectEach';

describe('objectEach', () => {
  it('should iterate over object properties', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result: number[] = [];

    objectEach(obj, (value: number) => {
      result.push(value);
    });

    expect(result).toEqual([1, 2, 3]);
  });

  it('should pass correct parameters to callback', () => {
    const obj = { x: 'first', y: 'second' };
    const callback = jest.fn();

    objectEach(obj, callback);

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith('first', 'x', obj);
    expect(callback).toHaveBeenCalledWith('second', 'y', obj);
  });

  it('should handle empty objects', () => {
    const obj = {};
    const callback = jest.fn();

    const result = objectEach(obj, callback);

    expect(callback).not.toHaveBeenCalled();
    expect(result).toBe(obj);
  });

  it('should handle objects with mixed values', () => {
    const obj = { a: 1, b: 0, c: 'hello', d: false, e: 42 };
    const result: any[] = [];

    objectEach(obj, (value: any) => {
      result.push(value);
    });

    expect(result).toEqual([1, 'hello', 42]);
  });

  it('should return the original object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const callback = jest.fn();

    const result = objectEach(obj, callback);

    expect(result).toBe(obj);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should handle early return from callback', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
    const result: number[] = [];

    objectEach(obj, (value: number) => {
      if (value === 3) return;
      result.push(value);
    });

    expect(result).toEqual([1, 2, 4, 5]);
  });

  it('should handle complex objects', () => {
    const users = {
      user1: { name: 'John', age: 30 },
      user2: { name: 'Jane', age: 25 },
      user3: { name: 'Bob', age: 35 },
    };
    const names: string[] = [];

    objectEach(users, (user: any) => {
      names.push(user.name);
    });

    expect(names).toEqual(['John', 'Jane', 'Bob']);
  });

  it('should handle nested objects', () => {
    const nested = {
      level1: { a: 1, b: 2 },
      level2: { c: 3, d: 4 },
    };
    const flattened: number[] = [];

    objectEach(nested, (level: any) => {
      objectEach(level, (value: number) => {
        flattened.push(value);
      });
    });

    expect(flattened).toEqual([1, 2, 3, 4]);
  });

  it('should handle edge cases', () => {
    // Single property object
    const single = { key: 'value' };
    const singleResult: string[] = [];
    objectEach(single, (value: string) => singleResult.push(value));
    expect(singleResult).toEqual(['value']);

    // Object with only falsy values
    const falsyOnly = { a: 0, b: false, c: null };
    const falsyResult: any[] = [];
    objectEach(falsyOnly, (value: any) => falsyResult.push(value));
    expect(falsyResult).toEqual([]);

    // Object with numeric keys
    const numericKeys = { 0: 'zero', 1: 'one', string: 'string value' };
    const numericResult: string[] = [];
    objectEach(numericKeys, (value: string) => numericResult.push(value));
    expect(numericResult).toEqual(['zero', 'one', 'string value']);
  });

  it('should handle callback mutations', () => {
    const obj: any = { a: 1, b: 2, c: 3 };
    const originalKeys = Object.keys(obj).length;

    objectEach(obj, (_: number, key: string | number) => {
      if (key === 'b') {
        obj['d'] = 4; // Mutate object during iteration
      }
    });

    // Should still iterate over original properties
    expect(Object.keys(obj).length).toBeGreaterThan(originalKeys);
  });

  it('should handle non-function callbacks', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const nonFunction = 'not a function' as any;

    const result = objectEach(obj, nonFunction);

    expect(result).toBe(obj);
  });

  it('should handle objects with getters', () => {
    const obj = {
      get computed() {
        return 'computed value';
      },
      normal: 'normal value',
    };
    const result: string[] = [];

    objectEach(obj, (value: string) => {
      result.push(value);
    });

    expect(result).toEqual(['computed value', 'normal value']);
  });

  it('should handle objects with non-enumerable properties', () => {
    const obj = { a: 1, b: 2 };
    Object.defineProperty(obj, 'hidden', {
      value: 'hidden value',
      enumerable: false,
    });
    const result: any[] = [];

    objectEach(obj, (value: number) => {
      result.push(value);
    });

    // Should only iterate over enumerable properties
    expect(result).toEqual([1, 2]);
  });
});
