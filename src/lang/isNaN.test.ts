import isNaN from './isNaN';

describe('isNaN', () => {
  it('should return true for NaN values', () => {
    expect(isNaN(NaN)).toBe(true);
    expect(isNaN(Number.NaN)).toBe(true);
    expect(isNaN(0 / 0)).toBe(true);
    expect(isNaN(Number('invalid'))).toBe(true);
    expect(isNaN(Math.sqrt(-1))).toBe(true);
    expect(isNaN(Math.log(-1))).toBe(true);
    expect(isNaN(Math.asin(2))).toBe(true);
    expect(isNaN(Math.acos(2))).toBe(true);
  });

  it('should return false for valid numbers', () => {
    expect(isNaN(0)).toBe(false);
    expect(isNaN(1)).toBe(false);
    expect(isNaN(-1)).toBe(false);
    expect(isNaN(0.5)).toBe(false);
    expect(isNaN(-0.5)).toBe(false);
    expect(isNaN(123.456)).toBe(false);
    expect(isNaN(-123.456)).toBe(false);
    expect(isNaN(Infinity)).toBe(false);
    expect(isNaN(-Infinity)).toBe(false);
    expect(isNaN(Number.MAX_VALUE)).toBe(false);
    expect(isNaN(Number.MIN_VALUE)).toBe(false);
    expect(isNaN(Number.MAX_SAFE_INTEGER)).toBe(false);
    expect(isNaN(Number.MIN_SAFE_INTEGER)).toBe(false);
  });

  it('should return false for Number objects', () => {
    expect(isNaN(new Number(NaN))).toBe(true);
    expect(isNaN(new Number(0))).toBe(false);
    expect(isNaN(new Number(1))).toBe(false);
    expect(isNaN(new Number(-1))).toBe(false);
    expect(isNaN(Object(NaN))).toBe(true);
    expect(isNaN(Object(0))).toBe(false);
    expect(isNaN(Object(1))).toBe(false);
  });

  it('should return false for non-numbers', () => {
    // Primitives
    expect(isNaN(null)).toBe(false);
    expect(isNaN(undefined)).toBe(false);
    expect(isNaN(true)).toBe(false);
    expect(isNaN(false)).toBe(false);
    expect(isNaN('')).toBe(false);
    expect(isNaN('0')).toBe(false);
    expect(isNaN('1')).toBe(false);
    expect(isNaN('123.456')).toBe(false);
    expect(isNaN('hello')).toBe(false);
    expect(isNaN('NaN')).toBe(false);
    expect(isNaN('true')).toBe(false);
    expect(isNaN('false')).toBe(false);

    // Objects
    expect(isNaN({})).toBe(false);
    expect(isNaN([])).toBe(false);
    expect(isNaN([])).toBe(false);
    expect(isNaN(new Date())).toBe(false);
    expect(isNaN(new RegExp(''))).toBe(false);
    expect(isNaN(new Error())).toBe(false);
    expect(isNaN(new Map())).toBe(false);
    expect(isNaN(new Set())).toBe(false);
    expect(isNaN(new Promise(() => {}))).toBe(false);

    // Functions
    expect(isNaN(() => {})).toBe(false);
    expect(isNaN(function () {})).toBe(false);
    expect(isNaN(Array)).toBe(false);
    expect(isNaN(Object)).toBe(false);
    expect(isNaN(Number)).toBe(false);

    // Symbols and BigInts
    expect(isNaN(Symbol())).toBe(false);
    expect(isNaN(Symbol('symbol'))).toBe(false);
    expect(isNaN(BigInt(0))).toBe(false);
    expect(isNaN(BigInt(1))).toBe(false);
  });

  it('should handle special cases', () => {
    // NaN-like objects that aren't NaN
    const nanLike = {
      toString: () => 'NaN',
      valueOf: () => NaN,
    };
    expect(isNaN(nanLike)).toBe(false);

    // Objects with NaN properties
    const objWithNaN = { nan: NaN };
    expect(isNaN(objWithNaN)).toBe(false);

    // Arrays with NaN
    const arrWithNaN = [NaN, 1, 2];
    expect(isNaN(arrWithNaN)).toBe(false);

    // Built-in objects
    expect(isNaN(Math)).toBe(false);
    expect(isNaN(JSON)).toBe(false);
    expect(isNaN(console)).toBe(false);
    expect(isNaN(global)).toBe(false);
    expect(isNaN(globalThis)).toBe(false);
  });

  it('should handle edge cases', () => {
    // Numbers that produce NaN through operations
    const divisionByZero = 1 / 0;
    expect(isNaN(divisionByZero)).toBe(false); // Infinity, not NaN

    const negativeZero = -0;
    expect(isNaN(negativeZero)).toBe(false); // -0, not NaN

    // Very large numbers that might cause issues
    const veryLarge = Number.MAX_VALUE * 2;
    expect(isNaN(veryLarge)).toBe(false); // Infinity, not NaN

    // Very small numbers
    const verySmall = Number.MIN_VALUE / 2;
    expect(isNaN(verySmall)).toBe(false); // 0, not NaN

    // Numbers with precision issues
    const precisionIssue = 0.1 + 0.2;
    expect(isNaN(precisionIssue)).toBe(false); // 0.30000000000000004, not NaN
  });
});
