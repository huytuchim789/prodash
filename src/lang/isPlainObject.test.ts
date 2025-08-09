import isPlainObject from './isPlainObject';

describe('isPlainObject', () => {
  describe('should return true for plain objects', () => {
    it('should return true for object literals', () => {
      expect(isPlainObject({})).toBe(true);
      expect(isPlainObject({ a: 1 })).toBe(true);
      expect(isPlainObject({ a: 1, b: 2, c: 3 })).toBe(true);
      expect(isPlainObject({ nested: { object: true } })).toBe(true);
    });

    it('should return true for objects created with Object constructor', () => {
      expect(isPlainObject(new Object())).toBe(true);
      expect(isPlainObject(new Object({ a: 1 }))).toBe(true);
      expect(isPlainObject(Object.create(Object.prototype))).toBe(true);
    });

    it('should return true for objects created with Object.create(null)', () => {
      expect(isPlainObject(Object.create(null))).toBe(true);

      const nullProtoObj = Object.create(null);
      nullProtoObj.a = 1;
      expect(isPlainObject(nullProtoObj)).toBe(true);
    });

    it('should return true for objects with only data properties', () => {
      const obj = { name: 'test', value: 42, flag: true };
      expect(isPlainObject(obj)).toBe(true);
    });

    it('should return true for objects with mixed property types', () => {
      const obj = {
        string: 'hello',
        number: 123,
        boolean: true,
        array: [1, 2, 3],
        object: { nested: true },
        func: () => {},
        date: new Date(),
        regex: /test/,
      };
      expect(isPlainObject(obj)).toBe(true);
    });
  });

  describe('should return false for non-plain objects', () => {
    it('should return false for primitives', () => {
      expect(isPlainObject(null)).toBe(false);
      expect(isPlainObject(undefined)).toBe(false);
      expect(isPlainObject(true)).toBe(false);
      expect(isPlainObject(false)).toBe(false);
      expect(isPlainObject(0)).toBe(false);
      expect(isPlainObject(1)).toBe(false);
      expect(isPlainObject(-1)).toBe(false);
      expect(isPlainObject(NaN)).toBe(false);
      expect(isPlainObject(Infinity)).toBe(false);
      expect(isPlainObject('')).toBe(false);
      expect(isPlainObject('string')).toBe(false);
      expect(isPlainObject(Symbol('sym'))).toBe(false);
      expect(isPlainObject(BigInt(123))).toBe(false);
    });

    it('should return false for arrays', () => {
      expect(isPlainObject([])).toBe(false);
      expect(isPlainObject([1, 2, 3])).toBe(false);
      expect(isPlainObject(['a', 'b', 'c'])).toBe(false);
      expect(isPlainObject(new Array(5))).toBe(false);
      expect(isPlainObject(Array.from([1, 2, 3]))).toBe(false);
    });

    it('should return false for functions', () => {
      expect(isPlainObject(function () {})).toBe(false);
      expect(isPlainObject(() => {})).toBe(false);
      expect(isPlainObject(class MyClass {})).toBe(false);
      expect(isPlainObject(async function () {})).toBe(false);
      expect(isPlainObject(function* generator() {})).toBe(false);
    });

    it('should return false for built-in objects', () => {
      expect(isPlainObject(new Date())).toBe(false);
      expect(isPlainObject(/regex/)).toBe(false);
      expect(isPlainObject(new RegExp('pattern'))).toBe(false);
      expect(isPlainObject(new Error('error'))).toBe(false);
      expect(isPlainObject(new Map())).toBe(false);
      expect(isPlainObject(new Set())).toBe(false);
      expect(isPlainObject(new WeakMap())).toBe(false);
      expect(isPlainObject(new WeakSet())).toBe(false);
      expect(isPlainObject(Promise.resolve())).toBe(false);
      expect(isPlainObject(new ArrayBuffer(8))).toBe(false);
      expect(isPlainObject(new Int8Array(8))).toBe(false);
    });

    it('should return false for class instances', () => {
      class TestClass {
        constructor(public value: number) {}
      }
      expect(isPlainObject(new TestClass(1))).toBe(false);

      class ExtendedClass extends TestClass {
        constructor(
          value: number,
          public extra: string
        ) {
          super(value);
        }
      }
      expect(isPlainObject(new ExtendedClass(1, 'test'))).toBe(false);
    });

    it('should return false for objects with custom prototypes', () => {
      const customProto = { customMethod: () => {} };
      const objWithCustomProto = Object.create(customProto);
      expect(isPlainObject(objWithCustomProto)).toBe(false);

      const anotherCustomProto = Object.create(Object.prototype);
      anotherCustomProto.customProp = 'test';
      const objWithAnotherCustomProto = Object.create(anotherCustomProto);
      expect(isPlainObject(objWithAnotherCustomProto)).toBe(false);
    });

    it('should return false for DOM elements', () => {
      if (typeof document !== 'undefined') {
        expect(isPlainObject(document.createElement('div'))).toBe(false);
        expect(isPlainObject(document.createElement('span'))).toBe(false);
        expect(isPlainObject(document)).toBe(false);
        expect(isPlainObject(document.createTextNode('text'))).toBe(false);
      }
    });

    it('should return false for global objects', () => {
      if (typeof window !== 'undefined') {
        expect(isPlainObject(window)).toBe(false);
      }
      if (typeof global !== 'undefined') {
        expect(isPlainObject(global)).toBe(false);
      }
    });
  });

  describe('edge cases', () => {
    it('should handle objects with getters and setters', () => {
      const objWithGetterSetter = {
        _value: 0,
        get value() {
          return this._value;
        },
        set value(val: number) {
          this._value = val;
        },
      };
      expect(isPlainObject(objWithGetterSetter)).toBe(true);
    });

    it('should handle objects with symbol properties', () => {
      const sym = Symbol('test');
      const objWithSymbol = { [sym]: 'symbol value', regular: 'regular value' };
      expect(isPlainObject(objWithSymbol)).toBe(true);
    });

    it('should handle frozen and sealed objects', () => {
      const frozen = Object.freeze({ a: 1 });
      expect(isPlainObject(frozen)).toBe(true);

      const sealed = Object.seal({ b: 2 });
      expect(isPlainObject(sealed)).toBe(true);

      const preventExtensions = Object.preventExtensions({ c: 3 });
      expect(isPlainObject(preventExtensions)).toBe(true);
    });

    it('should handle objects with non-enumerable properties', () => {
      const obj = {};
      Object.defineProperty(obj, 'hidden', {
        value: 'secret',
        enumerable: false,
        writable: true,
        configurable: true,
      });
      expect(isPlainObject(obj)).toBe(true);
    });

    it('should handle objects created with Object.assign', () => {
      const source1 = { a: 1 };
      const source2 = { b: 2 };
      const merged = Object.assign({}, source1, source2);
      expect(isPlainObject(merged)).toBe(true);
    });

    it('should handle objects created with spread operator', () => {
      const obj1 = { a: 1 };
      const obj2 = { b: 2 };
      const spread = { ...obj1, ...obj2, c: 3 };
      expect(isPlainObject(spread)).toBe(true);
    });

    it('should handle empty objects created in different ways', () => {
      expect(isPlainObject({})).toBe(true);
      expect(isPlainObject(new Object())).toBe(true);
      expect(isPlainObject(Object.create(Object.prototype))).toBe(true);
      expect(isPlainObject(Object.create(null))).toBe(true);
      expect(isPlainObject(Object.assign({}))).toBe(true);
    });

    it('should handle objects with toString and valueOf overrides', () => {
      const objWithOverrides = {
        value: 42,
        toString() {
          return 'custom toString';
        },
        valueOf() {
          return this.value;
        },
      };
      expect(isPlainObject(objWithOverrides)).toBe(true);
    });

    // it('should handle proxy objects', () => {
    //   const target = { a: 1 };
    //   const proxy = new Proxy(target, {});
    //   expect(isPlainObject(proxy)).toBe(true);

    //   const proxyWithHandler = new Proxy({}, {
    //     get(target, prop) {
    //       return prop === 'test' ? 'proxied' : target[prop];
    //     }
    //   });
    //   expect(isPlainObject(proxyWithHandler)).toBe(true);
    // });
  });

  describe('type consistency', () => {
    it('should maintain consistent behavior with lodash isPlainObject', () => {
      // Test cases that should match lodash behavior
      const testCases = [
        [{}, true],
        [{ a: 1 }, true],
        [Object.create(null), true],
        [new Object(), true],
        [[], false],
        [new Date(), false],
        [/regex/, false],
        [function () {}, false],
        [null, false],
        [undefined, false],
        ['string', false],
        [42, false],
        [true, false],
      ];

      testCases.forEach(([input, expected]) => {
        expect(isPlainObject(input)).toBe(expected);
      });
    });
  });
});
