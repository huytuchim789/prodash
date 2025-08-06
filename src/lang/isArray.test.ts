import isArray from './isArray';

describe('isArray', () => {
  it('should return true for arrays', () => {
    expect(isArray([])).toBe(true);
    expect(isArray([1, 2, 3])).toBe(true);
    // eslint-disable-next-line @typescript-eslint/no-array-constructor
    expect(isArray(new Array())).toBe(true);
    expect(isArray(Array(3))).toBe(true);
    expect(isArray([null])).toBe(true);
    expect(isArray([undefined])).toBe(true);
    expect(isArray([false])).toBe(true);
    expect(isArray([0])).toBe(true);
    expect(isArray([''])).toBe(true);
    expect(isArray([{}])).toBe(true);
    expect(isArray([[]])).toBe(true);
    expect(isArray([function () {}])).toBe(true);
  });

  it('should return false for non-arrays', () => {
    // Primitives
    expect(isArray(null)).toBe(false);
    expect(isArray(undefined)).toBe(false);
    expect(isArray(true)).toBe(false);
    expect(isArray(false)).toBe(false);
    expect(isArray(0)).toBe(false);
    expect(isArray(1)).toBe(false);
    expect(isArray(-1)).toBe(false);
    expect(isArray(0.5)).toBe(false);
    expect(isArray(NaN)).toBe(false);
    expect(isArray(Infinity)).toBe(false);
    expect(isArray(-Infinity)).toBe(false);
    expect(isArray('')).toBe(false);
    expect(isArray('string')).toBe(false);
    expect(isArray('0')).toBe(false);
    expect(isArray('1')).toBe(false);
    expect(isArray('true')).toBe(false);
    expect(isArray('false')).toBe(false);
    expect(isArray('null')).toBe(false);
    expect(isArray('undefined')).toBe(false);

    // Objects
    expect(isArray({})).toBe(false);
    expect(isArray({ length: 0 })).toBe(false);
    expect(isArray({ 0: 1, length: 1 })).toBe(false);
    expect(isArray({ 0: 'a', 1: 'b', length: 2 })).toBe(false);

    // Functions
    expect(isArray(() => {})).toBe(false);
    expect(isArray(function () {})).toBe(false);
    expect(isArray(function* () {})).toBe(false);
    expect(isArray(async function () {})).toBe(false);
    expect(isArray(async () => {})).toBe(false);

    // Built-in objects
    expect(isArray(new Date())).toBe(false);
    expect(isArray(new Error())).toBe(false);
    expect(isArray(/regex/)).toBe(false);
    expect(isArray(new Map())).toBe(false);
    expect(isArray(new Set())).toBe(false);
    expect(isArray(new WeakMap())).toBe(false);
    expect(isArray(new WeakSet())).toBe(false);
    expect(isArray(new Promise(() => {}))).toBe(false);
    expect(isArray(new Int8Array())).toBe(false);
    expect(isArray(new Uint8Array())).toBe(false);
    expect(isArray(new Uint8ClampedArray())).toBe(false);
    expect(isArray(new Int16Array())).toBe(false);
    expect(isArray(new Uint16Array())).toBe(false);
    expect(isArray(new Int32Array())).toBe(false);
    expect(isArray(new Uint32Array())).toBe(false);
    expect(isArray(new Float32Array())).toBe(false);
    expect(isArray(new Float64Array())).toBe(false);
    expect(isArray(new BigInt64Array())).toBe(false);
    expect(isArray(new BigUint64Array())).toBe(false);
    expect(isArray(new DataView(new ArrayBuffer(8)))).toBe(false);

    // Symbols and BigInts
    expect(isArray(Symbol())).toBe(false);
    expect(isArray(Symbol('symbol'))).toBe(false);
    expect(isArray(BigInt(0))).toBe(false);
    expect(isArray(BigInt(1))).toBe(false);
    expect(isArray(BigInt(-1))).toBe(false);

    // Global objects
    expect(isArray(global)).toBe(false);
    expect(isArray(globalThis)).toBe(false);
    expect(isArray(window)).toBe(false);
    expect(isArray(self)).toBe(false);

    // Math and other built-ins
    expect(isArray(Math)).toBe(false);
    expect(isArray(JSON)).toBe(false);
    expect(isArray(console)).toBe(false);
    expect(isArray(process)).toBe(false);
  });

  it('should handle array-like objects', () => {
    // Array-like objects are not arrays
    expect(isArray({ length: 0 })).toBe(false);
    expect(isArray({ length: 1, 0: 'a' })).toBe(false);
    expect(isArray({ length: 2, 0: 'a', 1: 'b' })).toBe(false);

    // String objects
    expect(isArray(new String('string'))).toBe(false);
    expect(isArray(Object('string'))).toBe(false);

    // Number objects
    expect(isArray(new Number(1))).toBe(false);
    expect(isArray(Object(1))).toBe(false);

    // Boolean objects
    expect(isArray(new Boolean(true))).toBe(false);
    expect(isArray(Object(true))).toBe(false);
  });

  it('should handle edge cases', () => {
    // Sparse arrays
    const sparse = new Array(3);
    sparse[1] = 'b';
    expect(isArray(sparse)).toBe(true);

    // Arrays with non-enumerable properties
    const arrayWithNonEnum = [1, 2, 3];
    Object.defineProperty(arrayWithNonEnum, 'nonEnum', {
      value: 'test',
      enumerable: false,
    });
    expect(isArray(arrayWithNonEnum)).toBe(true);

    // Arrays with getters/setters
    const arrayWithGetter = [1, 2, 3];
    Object.defineProperty(arrayWithGetter, 'getter', {
      get: () => 'value',
      enumerable: true,
    });
    expect(isArray(arrayWithGetter)).toBe(true);
  });

  it('should handle prototype pollution attempts', () => {
    // Attempt to modify Array.prototype
    const originalToString = Object.prototype.toString;

    try {
      // This shouldn't affect our isArray function
      Object.prototype.toString = function () {
        return '[object Array]';
      };

      expect(isArray({})).toBe(false);
      expect(isArray([])).toBe(true);
    } finally {
      // Restore original
      Object.prototype.toString = originalToString;
    }
  });

  it('should handle arrays with modified constructor', () => {
    const arr = [1, 2, 3];
    arr.constructor = Object;
    expect(isArray(arr)).toBe(true); // Should still be true

    const obj = { 0: 1, 1: 2, 2: 3, length: 3 };
    obj.constructor = Array;
    expect(isArray(obj)).toBe(false); // Should still be false
  });

  it('should handle arrays with modified prototype', () => {
    const arr = [1, 2, 3];
    Object.setPrototypeOf(arr, Object.prototype);
    expect(isArray(arr)).toBe(true); // Should still be true

    const obj = { 0: 1, 1: 2, 2: 3, length: 3 };
    Object.setPrototypeOf(obj, Array.prototype);
    expect(isArray(obj)).toBe(false); // Should still be false
  });
});
