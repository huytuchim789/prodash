import isNumber from './isNumber';

describe('isNumber', () => {
  it('should return true for numbers', () => {
    expect(isNumber(0)).toBe(true);
    expect(isNumber(1)).toBe(true);
    expect(isNumber(-1)).toBe(true);
    expect(isNumber(0.5)).toBe(true);
    expect(isNumber(-0.5)).toBe(true);
    expect(isNumber(123.456)).toBe(true);
    expect(isNumber(-123.456)).toBe(true);
    expect(isNumber(Number.MAX_VALUE)).toBe(true);
    expect(isNumber(Number.MIN_VALUE)).toBe(true);
    expect(isNumber(Number.MAX_SAFE_INTEGER)).toBe(true);
    expect(isNumber(Number.MIN_SAFE_INTEGER)).toBe(true);
    expect(isNumber(Infinity)).toBe(true);
    expect(isNumber(-Infinity)).toBe(true);
  });

  it('should return true for Number objects', () => {
    expect(isNumber(new Number())).toBe(true);
    expect(isNumber(new Number(0))).toBe(true);
    expect(isNumber(new Number(1))).toBe(true);
    expect(isNumber(new Number(-1))).toBe(true);
    expect(isNumber(new Number(0.5))).toBe(true);
    expect(isNumber(Object(0))).toBe(true);
    expect(isNumber(Object(1))).toBe(true);
    expect(isNumber(Object(-1))).toBe(true);
  });

  it('should return false for non-numbers', () => {
    // Primitives
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber(false)).toBe(false);
    expect(isNumber('')).toBe(false);
    expect(isNumber('0')).toBe(false);
    expect(isNumber('1')).toBe(false);
    expect(isNumber('123.456')).toBe(false);
    expect(isNumber('hello')).toBe(false);
    expect(isNumber('true')).toBe(false);
    expect(isNumber('false')).toBe(false);

    // Objects
    expect(isNumber({})).toBe(false);
    expect(isNumber([])).toBe(false);
    expect(isNumber([])).toBe(false);
    expect(isNumber(new Date())).toBe(false);
    expect(isNumber(new RegExp(''))).toBe(false);
    expect(isNumber(new Error())).toBe(false);
    expect(isNumber(new Map())).toBe(false);
    expect(isNumber(new Set())).toBe(false);
    expect(isNumber(new Promise(() => {}))).toBe(false);

    // Functions
    expect(isNumber(() => {})).toBe(false);
    expect(isNumber(function () {})).toBe(false);
    expect(isNumber(Array)).toBe(false);
    expect(isNumber(Object)).toBe(false);
    expect(isNumber(Number)).toBe(false);

    // Symbols and BigInts
    expect(isNumber(Symbol())).toBe(false);
    expect(isNumber(Symbol('symbol'))).toBe(false);
    expect(isNumber(BigInt(0))).toBe(false);
    expect(isNumber(BigInt(1))).toBe(false);
    expect(isNumber(BigInt(-1))).toBe(false);
  });

  it('should handle special cases', () => {
    // NaN is not a number
    expect(isNumber(NaN)).toBe(false);

    // Number-like objects that aren't numbers
    const numberLike = {
      toString: () => '123',
      valueOf: () => 123,
    };
    expect(isNumber(numberLike)).toBe(false);

    // Objects with number properties
    const objWithNumber = { num: 123 };
    expect(isNumber(objWithNumber)).toBe(false);

    // Arrays with numbers
    const arrWithNumbers = [1, 2, 3];
    expect(isNumber(arrWithNumbers)).toBe(false);

    // Built-in objects
    expect(isNumber(Math)).toBe(false);
    expect(isNumber(JSON)).toBe(false);
    expect(isNumber(console)).toBe(false);
    expect(isNumber(global)).toBe(false);
    expect(isNumber(globalThis)).toBe(false);
  });

  it('should handle edge cases', () => {
    // Number objects with custom properties
    const numberWithProps = new Number(123) as any;
    numberWithProps.customProp = 'value';
    expect(isNumber(numberWithProps)).toBe(true);

    // Number objects with modified prototype
    const numberWithProto = new Number(123);
    Object.setPrototypeOf(numberWithProto, Object.prototype);
    expect(isNumber(numberWithProto)).toBe(true);

    // Number objects with Symbol.toStringTag
    const numberWithTag = new Number(123) as any;
    numberWithTag[Symbol.toStringTag] = 'CustomNumber';
    expect(isNumber(numberWithTag)).toBe(true);

    // Very large numbers
    const largeNumber = Number.MAX_VALUE;
    expect(isNumber(largeNumber)).toBe(true);

    // Very small numbers
    const smallNumber = Number.MIN_VALUE;
    expect(isNumber(smallNumber)).toBe(true);

    // Negative zero
    expect(isNumber(-0)).toBe(true);

    // Scientific notation
    expect(isNumber(1e10)).toBe(true);
    expect(isNumber(1e-10)).toBe(true);
    expect(isNumber(-1e10)).toBe(true);
    expect(isNumber(-1e-10)).toBe(true);
  });
});
