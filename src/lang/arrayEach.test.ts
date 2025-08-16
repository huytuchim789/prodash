import arrayEach from './arrayEach';

describe('arrayEach', () => {
  it('should iterate over array elements', () => {
    const array = [1, 2, 3];
    const result: number[] = [];

    arrayEach(array, value => {
      result.push(value);
    });

    expect(result).toEqual([1, 2, 3]);
  });

  it('should pass correct parameters to callback', () => {
    const array = ['a', 'b', 'c'];
    const callback = jest.fn();

    arrayEach(array, callback);

    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledWith('a', 0, array);
    expect(callback).toHaveBeenCalledWith('b', 1, array);
    expect(callback).toHaveBeenCalledWith('c', 2, array);
  });

  it('should handle empty arrays', () => {
    const array: number[] = [];
    const callback = jest.fn();

    const result = arrayEach(array, callback);

    expect(callback).not.toHaveBeenCalled();
    expect(result).toBe(array);
  });

  it('should handle sparse arrays', () => {
    // eslint-disable-next-line no-sparse-arrays
    const array = [1, , 3];
    const callback = jest.fn();

    arrayEach(array, callback);

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith(1, 0, array);
    expect(callback).toHaveBeenCalledWith(3, 2, array);
  });

  it('should handle arrays with holes', () => {
    const array = new Array(3);
    array[0] = 'a';
    array[2] = 'c';
    const callback = jest.fn();

    arrayEach(array, callback);

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith('a', 0, array);
    expect(callback).toHaveBeenCalledWith('c', 2, array);
  });

  it('should handle arrays with undefined values', () => {
    const array = [1, undefined, 3];
    const callback = jest.fn();

    arrayEach(array, callback);

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith(1, 0, array);
    expect(callback).toHaveBeenCalledWith(3, 2, array);
  });

  it('should bind thisArg correctly', () => {
    const array = [1, 2, 3];
    const thisArg = { multiplier: 2 };
    const result: number[] = [];

    arrayEach(
      array,
      function (this: any, value) {
        result.push(value * this.multiplier);
      },
      thisArg
    );

    expect(result).toEqual([2, 4, 6]);
  });

  it('should return the original array', () => {
    const array = [1, 2, 3];
    const callback = jest.fn();

    const result = arrayEach(array, callback);

    expect(result).toBe(array);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should handle early return from callback', () => {
    const array = [1, 2, 3, 4, 5];
    const result: number[] = [];

    arrayEach(array, value => {
      if (value === 3) return;
      result.push(value);
    });

    expect(result).toEqual([1, 2, 4, 5]);
  });

  it('should handle complex objects', () => {
    const users = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
      { name: 'Bob', age: 35 },
    ];
    const names: string[] = [];

    arrayEach(users, user => {
      names.push(user.name);
    });

    expect(names).toEqual(['John', 'Jane', 'Bob']);
  });

  it('should handle nested arrays', () => {
    const matrix = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const flattened: number[] = [];

    arrayEach(matrix, row => {
      arrayEach(row, value => {
        flattened.push(value);
      });
    });

    expect(flattened).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should handle edge cases', () => {
    // Single element array
    const single = [42];
    const singleResult: number[] = [];
    arrayEach(single, value => singleResult.push(value));
    expect(singleResult).toEqual([42]);

    // Array with one element being undefined
    const undefinedSingle = [undefined];
    const undefinedResult: any[] = [];
    arrayEach(undefinedSingle, value => undefinedResult.push(value));
    expect(undefinedResult).toEqual([undefined]);

    // Very large array (performance test)
    const largeArray = Array.from({ length: 1000 }, (_, i) => i);
    let count = 0;
    arrayEach(largeArray, () => count++);
    expect(count).toBe(1000);

    // Array with mixed types
    const mixedArray = [1, 'string', true, null, { key: 'value' }];
    const mixedResult: any[] = [];
    arrayEach(mixedArray, value => mixedResult.push(value));
    expect(mixedResult).toEqual([1, 'string', true, null, { key: 'value' }]);
  });

  it('should handle callback mutations', () => {
    const array = [1, 2, 3];
    const originalLength = array.length;

    arrayEach(array, (_, index) => {
      if (index === 1) {
        array.push(4); // Mutate array during iteration
      }
    });

    // Should still iterate over original elements
    expect(array.length).toBeGreaterThan(originalLength);
  });

  it('should handle non-function callbacks', () => {
    const array = [1, 2, 3];
    const nonFunction = 'not a function' as any;

    const result = arrayEach(array, nonFunction);

    expect(result).toBe(array);
  });
});
