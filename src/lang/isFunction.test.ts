import isFunction from './isFunction';

describe('isFunction', () => {
  it('should return true for functions', () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(function () {})).toBe(true);
    expect(isFunction(function* () {})).toBe(true);
    expect(isFunction(async function () {})).toBe(true);
    expect(isFunction(async () => {})).toBe(true);
    expect(isFunction(function test() {})).toBe(true);
    expect(isFunction(async function test() {})).toBe(true);
    expect(isFunction(function* test() {})).toBe(true);
  });

  it('should return true for function constructors', () => {
    expect(isFunction(Array)).toBe(true);
    expect(isFunction(Object)).toBe(true);
    expect(isFunction(String)).toBe(true);
    expect(isFunction(Number)).toBe(true);
    expect(isFunction(Boolean)).toBe(true);
    expect(isFunction(Date)).toBe(true);
    expect(isFunction(RegExp)).toBe(true);
    expect(isFunction(Error)).toBe(true);
    expect(isFunction(Map)).toBe(true);
    expect(isFunction(Set)).toBe(true);
    expect(isFunction(Promise)).toBe(true);
    expect(isFunction(Proxy)).toBe(true);
  });

  it('should return true for custom classes', () => {
    class TestClass {}
    expect(isFunction(TestClass)).toBe(true);
    expect(isFunction(class {})).toBe(true);
    expect(isFunction(class Test {})).toBe(true);
  });

  it('should return false for non-functions', () => {
    // Primitives
    expect(isFunction(null)).toBe(false);
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction(true)).toBe(false);
    expect(isFunction(false)).toBe(false);
    expect(isFunction(0)).toBe(false);
    expect(isFunction(1)).toBe(false);
    expect(isFunction(-1)).toBe(false);
    expect(isFunction(0.5)).toBe(false);
    expect(isFunction(NaN)).toBe(false);
    expect(isFunction(Infinity)).toBe(false);
    expect(isFunction(-Infinity)).toBe(false);
    expect(isFunction('')).toBe(false);
    expect(isFunction('hello')).toBe(false);
    expect(isFunction('function')).toBe(false);

    // Objects
    expect(isFunction({})).toBe(false);
    expect(isFunction([])).toBe(false);
    expect(isFunction([])).toBe(false);
    expect(isFunction(new Date())).toBe(false);
    expect(isFunction(new RegExp(''))).toBe(false);
    expect(isFunction(new Error())).toBe(false);
    expect(isFunction(new Map())).toBe(false);
    expect(isFunction(new Set())).toBe(false);
    expect(isFunction(new Promise(() => {}))).toBe(false);

    // Symbols and BigInts
    expect(isFunction(Symbol())).toBe(false);
    expect(isFunction(Symbol('symbol'))).toBe(false);
    expect(isFunction(BigInt(0))).toBe(false);
    expect(isFunction(BigInt(1))).toBe(false);
  });

  it('should handle special cases', () => {
    // Function-like objects that aren't functions
    const functionLike = {
      call: () => {},
      apply: () => {},
      bind: () => {},
    };
    expect(isFunction(functionLike)).toBe(false);

    // Objects with function properties
    const objWithFunction = { func: () => {} };
    expect(isFunction(objWithFunction)).toBe(false);

    // Arrays with functions
    const arrWithFunctions = [() => {}, function () {}];
    expect(isFunction(arrWithFunctions)).toBe(false);

    // Built-in objects
    expect(isFunction(Math)).toBe(false);
    expect(isFunction(JSON)).toBe(false);
    expect(isFunction(console)).toBe(false);
    expect(isFunction(global)).toBe(false);
    expect(isFunction(globalThis)).toBe(false);
  });

  it('should handle edge cases', () => {
    // Functions with custom properties
    const funcWithProps = function () {} as any;
    funcWithProps.customProp = 'value';
    expect(isFunction(funcWithProps)).toBe(true);

    // Functions with modified prototype
    const funcWithProto = function () {};
    Object.setPrototypeOf(funcWithProto, Object.prototype);
    expect(isFunction(funcWithProto)).toBe(true);

    // Functions with Symbol.toStringTag
    const funcWithTag = function () {} as any;
    funcWithTag[Symbol.toStringTag] = 'CustomFunction';
    expect(isFunction(funcWithTag)).toBe(true);

    // Arrow functions with properties
    const arrowWithProps = (() => {}) as any;
    arrowWithProps.customProp = 'value';
    expect(isFunction(arrowWithProps)).toBe(true);

    // Generator functions
    const generator = function* () {
      yield 1;
      yield 2;
    };
    expect(isFunction(generator)).toBe(true);

    // Async generator functions
    const asyncGenerator = async function* () {
      yield 1;
      yield 2;
    };
    expect(isFunction(asyncGenerator)).toBe(true);
  });
});
