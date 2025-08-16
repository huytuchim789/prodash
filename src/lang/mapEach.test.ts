import mapEach from './mapEach';

describe('mapEach', () => {
  it('should iterate over Map entries', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    const result: number[] = [];

    mapEach(map, (value: number) => {
      result.push(value);
    });

    expect(result).toEqual([1, 2, 3]);
  });

  it('should pass correct parameters to callback', () => {
    const map = new Map([
      ['x', 'first'],
      ['y', 'second'],
    ]);
    const callback = jest.fn();

    mapEach(map, callback);

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith('first', 'x', map);
    expect(callback).toHaveBeenCalledWith('second', 'y', map);
  });

  it('should handle empty Maps', () => {
    const map = new Map();
    const callback = jest.fn();

    const result = mapEach(map, callback);

    expect(callback).not.toHaveBeenCalled();
    expect(result).toBe(map);
  });

  it('should handle Maps with single entry', () => {
    const map = new Map([['key', 'value']]);
    const result: string[] = [];

    mapEach(map, (value: string) => {
      result.push(value);
    });

    expect(result).toEqual(['value']);
  });

  it('should handle Maps with different key types', () => {
    const map = new Map([
      ['string', 'string value'],
      [42, 'number key'],
      [true, 'boolean key'],
      [Symbol('symbol'), 'symbol key'],
      [{ obj: 'key' }, 'object key'],
    ] as [unknown, string][]);
    const result: string[] = [];

    mapEach(map, (value: string) => {
      result.push(value);
    });

    expect(result).toEqual([
      'string value',
      'number key',
      'boolean key',
      'symbol key',
      'object key',
    ]);
  });

  it('should handle Maps with different value types', () => {
    const map = new Map([
      ['a', 1],
      ['b', 'string'],
      ['c', true],
      ['d', null],
      ['e', undefined],
      ['f', { obj: 'value' }],
    ] as [string, unknown][]);
    const result: any[] = [];

    mapEach(map, (value: any) => {
      result.push(value);
    });

    expect(result).toEqual([1, 'string', true, null, undefined, { obj: 'value' }]);
  });

  it('should bind thisArg correctly', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    const thisArg = { multiplier: 2 };
    const result: number[] = [];

    mapEach(
      map,
      function (this: any, value: number) {
        result.push(value * this.multiplier);
      },
      thisArg
    );

    expect(result).toEqual([2, 4, 6]);
  });

  it('should return the original Map', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    const callback = jest.fn();

    const result = mapEach(map, callback);

    expect(result).toBe(map);
    expect(result).toEqual(
      new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ])
    );
  });

  it('should handle early return from callback', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
      ['d', 4],
      ['e', 5],
    ]);
    const result: number[] = [];

    mapEach(map, (value: number) => {
      if (value === 3) return;
      result.push(value);
    });

    expect(result).toEqual([1, 2, 4, 5]);
  });

  it('should handle complex objects in Map', () => {
    const users = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
      { name: 'Bob', age: 35 },
    ];
    const map = new Map([
      ['user1', users[0]],
      ['user2', users[1]],
      ['user3', users[2]],
    ]);
    const names: string[] = [];

    mapEach(map, (user: any) => {
      names.push(user.name);
    });

    expect(names).toEqual(['John', 'Jane', 'Bob']);
  });

  it('should handle nested Maps', () => {
    const innerMap1 = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    const innerMap2 = new Map([
      ['c', 3],
      ['d', 4],
    ]);
    const outerMap = new Map([
      ['map1', innerMap1],
      ['map2', innerMap2],
    ]);
    const flattened: number[] = [];

    mapEach(outerMap, (innerMap: any) => {
      mapEach(innerMap, (value: number) => {
        flattened.push(value);
      });
    });

    expect(flattened).toEqual([1, 2, 3, 4]);
  });

  it('should handle edge cases', () => {
    // Map with undefined values
    const mapWithUndefined = new Map([
      ['a', undefined],
      ['b', 1],
      ['c', 2],
    ] as [string, unknown][]);
    const undefinedResult: any[] = [];
    mapEach(mapWithUndefined, (value: any) => undefinedResult.push(value));
    expect(undefinedResult).toEqual([undefined, 1, 2]);

    // Map with null values
    const mapWithNull = new Map([
      ['a', null],
      ['b', 'hello'],
      ['c', 42],
    ] as [string, unknown][]);
    const nullResult: any[] = [];
    mapEach(mapWithNull, (value: any) => nullResult.push(value));
    expect(nullResult).toEqual([null, 'hello', 42]);

    // Map with falsy values
    const mapWithFalsy = new Map([
      ['a', 0],
      ['b', false],
      ['c', ''],
      ['d', NaN],
    ] as [string, unknown][]);
    const falsyResult: any[] = [];
    mapEach(mapWithFalsy, (value: any) => falsyResult.push(value));
    expect(falsyResult).toEqual([0, false, '', NaN]);

    // Very large Map (performance test)
    const largeMap = new Map(Array.from({ length: 1000 }, (_, i) => [i, i * 2]));
    let count = 0;
    mapEach(largeMap, () => count++);
    expect(count).toBe(1000);
  });

  it('should handle callback mutations', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    const originalSize = map.size;

    mapEach(map, (_: number, key: unknown) => {
      if (key === 'b') {
        map.set('d', 4); // Mutate Map during iteration
      }
    });

    // Should still iterate over original elements
    expect(map.size).toBeGreaterThan(originalSize);
  });

  it('should handle Maps with Symbol keys', () => {
    const symbol1 = Symbol('test1');
    const symbol2 = Symbol('test2');
    const map = new Map([
      [symbol1, 'symbol value 1'],
      [symbol2, 'symbol value 2'],
      ['string', 'string value'],
    ] as [unknown, string][]);
    const result: string[] = [];

    mapEach(map, (value: string) => {
      result.push(value);
    });

    expect(result).toEqual(['symbol value 1', 'symbol value 2', 'string value']);
  });

  it('should handle Maps with object keys', () => {
    const objKey1 = { id: 1 };
    const objKey2 = { id: 2 };
    const map = new Map([
      [objKey1, 'object value 1'],
      [objKey2, 'object value 2'],
      ['string', 'string value'],
    ] as [unknown, string][]);
    const result: string[] = [];

    mapEach(map, (value: string) => {
      result.push(value);
    });

    expect(result).toEqual(['object value 1', 'object value 2', 'string value']);
  });
});
