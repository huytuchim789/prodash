import isObject from './isObject';

describe('isObject', () => {
  it('should return true for objects', () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ a: 1 })).toBe(true);
    expect(isObject(new Object())).toBe(true);
    expect(isObject(Object.create(null))).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject(new Date())).toBe(true);
    expect(isObject(new RegExp(''))).toBe(true);
    expect(isObject(new Error())).toBe(true);
    expect(isObject(new Map())).toBe(true);
    expect(isObject(new Set())).toBe(true);
    expect(isObject(new WeakMap())).toBe(true);
    expect(isObject(new WeakSet())).toBe(true);
    expect(isObject(new Promise(() => {}))).toBe(true);
    expect(isObject(new Int8Array())).toBe(true);
  });

  it('should return true for functions', () => {
    expect(isObject(() => {})).toBe(true);
    expect(isObject(function () {})).toBe(true);
    expect(isObject(function* () {})).toBe(true);
    expect(isObject(async function () {})).toBe(true);
    expect(isObject(async () => {})).toBe(true);
    expect(isObject(class {})).toBe(true);
    expect(isObject(Array)).toBe(true);
    expect(isObject(Object)).toBe(true);
    expect(isObject(Date)).toBe(true);
    expect(isObject(RegExp)).toBe(true);
  });

  it('should return false for primitives', () => {
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(false)).toBe(false);
    expect(isObject(0)).toBe(false);
    expect(isObject(1)).toBe(false);
    expect(isObject(-1)).toBe(false);
    expect(isObject(0.5)).toBe(false);
    expect(isObject(NaN)).toBe(false);
    expect(isObject(Infinity)).toBe(false);
    expect(isObject(-Infinity)).toBe(false);
    expect(isObject('')).toBe(false);
    expect(isObject('string')).toBe(false);
    expect(isObject('0')).toBe(false);
    expect(isObject('true')).toBe(false);
  });

  it('should return false for symbols and bigints', () => {
    expect(isObject(Symbol())).toBe(false);
    expect(isObject(Symbol('symbol'))).toBe(false);
    expect(isObject(BigInt(0))).toBe(false);
    expect(isObject(BigInt(1))).toBe(false);
    expect(isObject(BigInt(-1))).toBe(false);
  });

  it('should handle special cases', () => {
    // Null prototype objects
    const nullProto = Object.create(null);
    expect(isObject(nullProto)).toBe(true);

    // Objects with custom properties
    const customObj = { custom: 'property' };
    expect(isObject(customObj)).toBe(true);

    // Arrays with properties
    const arrWithProps = [1, 2, 3] as any;
    arrWithProps.customProp = 'value';
    expect(isObject(arrWithProps)).toBe(true);

    // Functions with properties
    const funcWithProps = function () {} as any;
    funcWithProps.customProp = 'value';
    expect(isObject(funcWithProps)).toBe(true);

    // Built-in objects
    expect(isObject(Math)).toBe(true);
    expect(isObject(JSON)).toBe(true);
    expect(isObject(console)).toBe(true);
    expect(isObject(global)).toBe(true);
    expect(isObject(globalThis)).toBe(true);
  });

  it('should handle edge cases', () => {
    // Objects with getters/setters
    const objWithGetter = {};
    Object.defineProperty(objWithGetter, 'getter', {
      get: () => 'value',
      enumerable: true,
    });
    expect(isObject(objWithGetter)).toBe(true);

    // Objects with non-enumerable properties
    const objWithNonEnum = {};
    Object.defineProperty(objWithNonEnum, 'nonEnum', {
      value: 'test',
      enumerable: false,
    });
    expect(isObject(objWithNonEnum)).toBe(true);

    // Proxy objects
    const proxy = new Proxy({}, {});
    expect(isObject(proxy)).toBe(true);

    // Objects with Symbol properties
    const objWithSymbol: Record<symbol, string> = {};
    objWithSymbol[Symbol('test')] = 'value';
    expect(isObject(objWithSymbol)).toBe(true);
  });
});
