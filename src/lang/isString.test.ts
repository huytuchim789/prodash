import isString from './isString';

describe('isString', () => {
  it('should return true for strings', () => {
    expect(isString('')).toBe(true);
    expect(isString('hello')).toBe(true);
    expect(isString('123')).toBe(true);
    expect(isString('true')).toBe(true);
    expect(isString('false')).toBe(true);
    expect(isString('null')).toBe(true);
    expect(isString('undefined')).toBe(true);
    expect(isString(' ')).toBe(true);
    expect(isString('\n')).toBe(true);
    expect(isString('\t')).toBe(true);
    expect(isString('🎉')).toBe(true);
    expect(isString('中文')).toBe(true);
    expect(isString('привет')).toBe(true);
  });

  it('should return true for String objects', () => {
    expect(isString(new String())).toBe(true);
    expect(isString(new String('hello'))).toBe(true);
    expect(isString(new String('123'))).toBe(true);
    expect(isString(Object('hello'))).toBe(true);
    expect(isString(Object(''))).toBe(true);
  });

  it('should return false for non-strings', () => {
    // Primitives
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString(true)).toBe(false);
    expect(isString(false)).toBe(false);
    expect(isString(0)).toBe(false);
    expect(isString(1)).toBe(false);
    expect(isString(-1)).toBe(false);
    expect(isString(0.5)).toBe(false);
    expect(isString(NaN)).toBe(false);
    expect(isString(Infinity)).toBe(false);
    expect(isString(-Infinity)).toBe(false);

    // Objects
    expect(isString({})).toBe(false);
    expect(isString([])).toBe(false);
    expect(isString([])).toBe(false);
    expect(isString(new Date())).toBe(false);
    expect(isString(new RegExp(''))).toBe(false);
    expect(isString(new Error())).toBe(false);
    expect(isString(new Map())).toBe(false);
    expect(isString(new Set())).toBe(false);
    expect(isString(new Promise(() => {}))).toBe(false);

    // Functions
    expect(isString(() => {})).toBe(false);
    expect(isString(function () {})).toBe(false);
    expect(isString(Array)).toBe(false);
    expect(isString(Object)).toBe(false);
    expect(isString(String)).toBe(false);

    // Symbols and BigInts
    expect(isString(Symbol())).toBe(false);
    expect(isString(Symbol('symbol'))).toBe(false);
    expect(isString(BigInt(0))).toBe(false);
    expect(isString(BigInt(1))).toBe(false);
  });

  it('should handle special cases', () => {
    // String-like objects that aren't strings
    const stringLike = {
      toString: () => 'hello',
      valueOf: () => 'hello',
    };
    expect(isString(stringLike)).toBe(false);

    // Objects with string properties
    const objWithString = { str: 'hello' };
    expect(isString(objWithString)).toBe(false);

    // Arrays with strings
    const arrWithStrings = ['hello', 'world'];
    expect(isString(arrWithStrings)).toBe(false);

    // Built-in objects
    expect(isString(Math)).toBe(false);
    expect(isString(JSON)).toBe(false);
    expect(isString(console)).toBe(false);
    expect(isString(global)).toBe(false);
    expect(isString(globalThis)).toBe(false);
  });

  it('should handle edge cases', () => {
    // String objects with custom properties
    const stringWithProps = new String('hello') as any;
    stringWithProps.customProp = 'value';
    expect(isString(stringWithProps)).toBe(true);

    // String objects with modified prototype
    const stringWithProto = new String('hello');
    Object.setPrototypeOf(stringWithProto, Object.prototype);
    expect(isString(stringWithProto)).toBe(true);

    // String objects with Symbol.toStringTag
    const stringWithTag = new String('hello') as any;
    stringWithTag[Symbol.toStringTag] = 'CustomString';
    expect(isString(stringWithTag)).toBe(true);

    // Template literals
    const template = `hello ${'world'}`;
    expect(isString(template)).toBe(true);

    // String with unicode
    const unicodeString = '🚀🌟🎉';
    expect(isString(unicodeString)).toBe(true);

    // Very long strings
    const longString = 'a'.repeat(10000);
    expect(isString(longString)).toBe(true);
  });
});
