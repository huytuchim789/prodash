import setEach from './setEach';

describe('setEach', () => {
  it('should iterate over Set values', () => {
    const set = new Set([1, 2, 3]);
    const result: number[] = [];

    setEach(set, (value: number) => {
      result.push(value);
    });

    expect(result).toEqual([1, 2, 3]);
  });

  it('should pass correct parameters to callback', () => {
    const set = new Set(['a', 'b', 'c']);
    const callback = jest.fn();

    setEach(set, callback);

    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledWith('a', 0, set);
    expect(callback).toHaveBeenCalledWith('b', 1, set);
    expect(callback).toHaveBeenCalledWith('c', 2, set);
  });

  it('should handle empty Sets', () => {
    const set = new Set();
    const callback = jest.fn();

    const result = setEach(set, callback);

    expect(callback).not.toHaveBeenCalled();
    expect(result).toBe(set);
  });

  it('should handle Sets with single element', () => {
    const set = new Set([42]);
    const result: number[] = [];

    setEach(set, (value: number) => {
      result.push(value);
    });

    expect(result).toEqual([42]);
  });

  it('should handle Sets with duplicate values', () => {
    const set = new Set([1, 1, 2, 2, 3, 3]);
    const result: number[] = [];

    setEach(set, (value: number) => {
      result.push(value);
    });

    expect(result).toEqual([1, 2, 3]);
  });

  it('should handle Sets with mixed types', () => {
    const set = new Set([1, 'string', true, null, { key: 'value' }]);
    const result: any[] = [];

    setEach(set, (value: any) => {
      result.push(value);
    });

    expect(result).toEqual([1, 'string', true, null, { key: 'value' }]);
  });

  it('should bind thisArg correctly', () => {
    const set = new Set([1, 2, 3]);
    const thisArg = { multiplier: 2 };
    const result: number[] = [];

    setEach(
      set,
      function (this: any, value: number) {
        result.push(value * this.multiplier);
      },
      thisArg
    );

    expect(result).toEqual([2, 4, 6]);
  });

  it('should return the original Set', () => {
    const set = new Set([1, 2, 3]);
    const callback = jest.fn();

    const result = setEach(set, callback);

    expect(result).toBe(set);
    expect(result).toEqual(new Set([1, 2, 3]));
  });

  it('should handle early return from callback', () => {
    const set = new Set([1, 2, 3, 4, 5]);
    const result: number[] = [];

    setEach(set, (value: number) => {
      if (value === 3) return;
      result.push(value);
    });

    expect(result).toEqual([1, 2, 4, 5]);
  });

  it('should handle complex objects in Set', () => {
    const users = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
      { name: 'Bob', age: 35 },
    ];
    const set = new Set(users);
    const names: string[] = [];

    setEach(set, (user: any) => {
      names.push(user.name);
    });

    expect(names).toEqual(['John', 'Jane', 'Bob']);
  });

  it('should handle nested Sets', () => {
    const innerSet1 = new Set([1, 2]);
    const innerSet2 = new Set([3, 4]);
    const outerSet = new Set([innerSet1, innerSet2]);
    const flattened: number[] = [];

    setEach(outerSet, (innerSet: any) => {
      setEach(innerSet, (value: number) => {
        flattened.push(value);
      });
    });

    expect(flattened).toEqual([1, 2, 3, 4]);
  });

  it('should handle edge cases', () => {
    // Set with undefined values
    const setWithUndefined = new Set([undefined, 1, 2]);
    const undefinedResult: any[] = [];
    setEach(setWithUndefined, (value: any) => undefinedResult.push(value));
    expect(undefinedResult).toEqual([undefined, 1, 2]);

    // Set with null values
    const setWithNull = new Set([null, 'hello', 42]);
    const nullResult: any[] = [];
    setEach(setWithNull, (value: any) => nullResult.push(value));
    expect(nullResult).toEqual([null, 'hello', 42]);

    // Set with falsy values
    const setWithFalsy = new Set([0, false, '', NaN]);
    const falsyResult: any[] = [];
    setEach(setWithFalsy, (value: any) => falsyResult.push(value));
    expect(falsyResult).toEqual([0, false, '', NaN]);

    // Very large Set (performance test)
    const largeSet = new Set(Array.from({ length: 1000 }, (_, i) => i));
    let count = 0;
    setEach(largeSet, () => count++);
    expect(count).toBe(1000);
  });

  it('should handle callback mutations', () => {
    const set = new Set([1, 2, 3]);
    const originalSize = set.size;

    setEach(set, (_: number, index: number) => {
      if (index === 1) {
        set.add(4); // Mutate Set during iteration
      }
    });

    // Should still iterate over original elements
    expect(set.size).toBeGreaterThan(originalSize);
  });

  it('should handle non-function callbacks', () => {
    const set = new Set([1, 2, 3]);
    const nonFunction = 'not a function' as any;

    const result = setEach(set, nonFunction);

    expect(result).toBe(set);
  });

  it('should handle Sets with Symbol values', () => {
    const symbol1 = Symbol('test1');
    const symbol2 = Symbol('test2');
    const set = new Set([symbol1, symbol2, 'string']);
    const result: any[] = [];

    setEach(set, (value: any) => {
      result.push(value);
    });

    expect(result).toEqual([symbol1, symbol2, 'string']);
  });

  it('should handle Sets with BigInt values', () => {
    const set = new Set([BigInt(1), BigInt(2), BigInt(3)]);
    const result: bigint[] = [];

    setEach(set, (value: bigint) => {
      result.push(value);
    });

    expect(result).toEqual([BigInt(1), BigInt(2), BigInt(3)]);
  });
});
