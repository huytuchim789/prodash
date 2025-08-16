import forEach from './forEach';

describe('forEach', () => {
  describe('Array handling', () => {
    it('should iterate over array elements', () => {
      const array = [1, 2, 3];
      const result: number[] = [];

      forEach(array, (value: number) => {
        result.push(value);
      });

      expect(result).toEqual([1, 2, 3]);
    });

    it('should pass correct parameters to callback', () => {
      const array = ['a', 'b', 'c'];
      const callback = jest.fn();

      forEach(array, callback);

      expect(callback).toHaveBeenCalledTimes(3);
      expect(callback).toHaveBeenCalledWith('a', 0, array);
      expect(callback).toHaveBeenCalledWith('b', 1, array);
      expect(callback).toHaveBeenCalledWith('c', 2, array);
    });

    it('should handle empty arrays', () => {
      const array: number[] = [];
      const callback = jest.fn();

      const result = forEach(array, callback);

      expect(callback).not.toHaveBeenCalled();
      expect(result).toBe(array);
    });

    it('should handle sparse arrays', () => {
      // eslint-disable-next-line no-sparse-arrays
      const array = [1, , 3];
      const callback = jest.fn();

      forEach(array, callback);

      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenCalledWith(1, 0, array);
      expect(callback).toHaveBeenCalledWith(3, 2, array);
    });

    it('should handle arrays with undefined values', () => {
      const array = [1, undefined, 3];
      const callback = jest.fn();

      forEach(array, callback);

      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenCalledWith(1, 0, array);
      expect(callback).toHaveBeenCalledWith(3, 2, array);
    });
  });

  describe('String handling', () => {
    it('should iterate over string characters', () => {
      const string = 'hello';
      const result: string[] = [];

      forEach(string, (char: string) => {
        result.push(char);
      });

      expect(result).toEqual(['h', 'e', 'l', 'l', 'o']);
    });

    it('should pass correct parameters for strings', () => {
      const string = 'abc';
      const callback = jest.fn();

      forEach(string, callback);

      expect(callback).toHaveBeenCalledTimes(3);
      expect(callback).toHaveBeenCalledWith('a', 0, string);
      expect(callback).toHaveBeenCalledWith('b', 1, string);
      expect(callback).toHaveBeenCalledWith('c', 2, string);
    });

    it('should handle empty strings', () => {
      const string = '';
      const callback = jest.fn();

      const result = forEach(string, callback);

      expect(callback).not.toHaveBeenCalled();
      expect(result).toBe(string);
    });

    it('should handle unicode strings', () => {
      const string = '🎉🌟🚀';
      const result: string[] = [];

      forEach(string, (char: string) => {
        result.push(char);
      });

      expect(result).toEqual(['🎉', '🌟', '🚀']);
    });
  });

  describe('Map handling', () => {
    it('should iterate over Map entries', () => {
      const map = new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ]);
      const result: number[] = [];

      forEach(map, (value: number) => {
        result.push(value);
      });

      expect(result).toEqual([1, 2, 3]);
    });

    it('should pass correct parameters for Maps', () => {
      const map = new Map([
        ['x', 'first'],
        ['y', 'second'],
      ]);
      const callback = jest.fn();

      forEach(map, callback);

      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenCalledWith('first', 'x', map);
      expect(callback).toHaveBeenCalledWith('second', 'y', map);
    });

    it('should handle empty Maps', () => {
      const map = new Map();
      const callback = jest.fn();

      const result = forEach(map, callback);

      expect(callback).not.toHaveBeenCalled();
      expect(result).toBe(map);
    });
  });

  describe('Set handling', () => {
    it('should iterate over Set values', () => {
      const set = new Set([1, 2, 3]);
      const result: number[] = [];

      forEach(set, (value: number) => {
        result.push(value);
      });

      expect(result).toEqual([1, 2, 3]);
    });

    it('should pass correct parameters for Sets', () => {
      const set = new Set(['a', 'b']);
      const callback = jest.fn();

      forEach(set, callback);

      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenCalledWith('a', 0, set);
      expect(callback).toHaveBeenCalledWith('b', 1, set);
    });

    it('should handle empty Sets', () => {
      const set = new Set();
      const callback = jest.fn();

      const result = forEach(set, callback);

      expect(callback).not.toHaveBeenCalled();
      expect(result).toBe(set);
    });
  });

  describe('Object handling', () => {
    it('should iterate over object properties', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result: number[] = [];

      forEach(obj, (value: number) => {
        result.push(value);
      });

      expect(result).toEqual([1, 2, 3]);
    });

    it('should pass correct parameters for objects', () => {
      const obj = { x: 'first', y: 'second' };
      const callback = jest.fn();

      forEach(obj, callback);

      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenCalledWith('first', 'x', obj);
      expect(callback).toHaveBeenCalledWith('second', 'y', obj);
    });

    it('should handle empty objects', () => {
      const obj = {};
      const callback = jest.fn();

      const result = forEach(obj, callback);

      expect(callback).not.toHaveBeenCalled();
      expect(result).toBe(obj);
    });

    it('should handle objects with undefined values', () => {
      const obj = { a: 1, b: undefined, c: 3 };
      const callback = jest.fn();

      forEach(obj, callback);

      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenCalledWith(1, 'a', obj);
      expect(callback).toHaveBeenCalledWith(3, 'c', obj);
    });
  });

  describe('General functionality', () => {
    it('should bind thisArg correctly', () => {
      const array = [1, 2, 3];
      const thisArg = { multiplier: 2 };
      const result: number[] = [];

      forEach(
        array,
        function (this: any, value: number) {
          result.push(value * this.multiplier);
        },
        thisArg
      );

      expect(result).toEqual([2, 4, 6]);
    });

    it('should return the original value', () => {
      const array = [1, 2, 3];
      const callback = jest.fn();

      const result = forEach(array, callback);

      expect(result).toBe(array);
      expect(result).toEqual([1, 2, 3]);
    });

    it('should handle early return from callback', () => {
      const array = [1, 2, 3, 4, 5];
      const result: number[] = [];

      forEach(array, (value: number) => {
        if (value === 3) return;
        result.push(value);
      });

      expect(result).toEqual([1, 2, 4, 5]);
    });

    it('should handle complex nested structures', () => {
      const matrix = [
        [1, 2],
        [3, 4],
        [5, 6],
      ];
      const flattened: number[] = [];

      forEach(matrix, (row: number[]) => {
        forEach(row, (value: number) => {
          flattened.push(value);
        });
      });

      expect(flattened).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should handle edge cases', () => {
      // Single element collections
      const singleArray = [42];
      const singleArrayResult: number[] = [];
      forEach(singleArray, (value: number) => singleArrayResult.push(value));
      expect(singleArrayResult).toEqual([42]);

      const singleString = 'x';
      const singleStringResult: string[] = [];
      forEach(singleString, (char: string) => singleStringResult.push(char));
      expect(singleStringResult).toEqual(['x']);

      const singleMap = new Map([['key', 'value']]);
      const singleMapResult: string[] = [];
      forEach(singleMap, (value: string) => singleMapResult.push(value));
      expect(singleMapResult).toEqual(['value']);

      const singleSet = new Set([42]);
      const singleSetResult: number[] = [];
      forEach(singleSet, (value: number) => singleSetResult.push(value));
      expect(singleSetResult).toEqual([42]);

      const singleObj = { key: 'value' };
      const singleObjResult: string[] = [];
      forEach(singleObj, (value: string) => singleObjResult.push(value));
      expect(singleObjResult).toEqual(['value']);
    });
  });
});
