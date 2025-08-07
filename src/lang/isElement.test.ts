import isElement from './isElement';

describe('isElement', () => {
  describe('should return true for DOM elements', () => {
    it('should return true for element nodes', () => {
      if (typeof document !== 'undefined') {
        const div = document.createElement('div');
        expect(isElement(div)).toBe(true);

        const span = document.createElement('span');
        expect(isElement(span)).toBe(true);

        const p = document.createElement('p');
        expect(isElement(p)).toBe(true);

        const button = document.createElement('button');
        expect(isElement(button)).toBe(true);

        const img = document.createElement('img');
        expect(isElement(img)).toBe(true);
      }
    });

    it('should return true for mock DOM elements', () => {
      const mockElement = { nodeType: 1 };
      expect(isElement(mockElement)).toBe(true);

      const mockDiv = { nodeType: 1, tagName: 'DIV' };
      expect(isElement(mockDiv)).toBe(true);

      const mockWithProps = {
        nodeType: 1,
        tagName: 'SPAN',
        id: 'test',
        className: 'test-class',
      };
      expect(isElement(mockWithProps)).toBe(true);
    });
  });

  describe('should return false for non-DOM elements', () => {
    it('should return false for primitives', () => {
      expect(isElement(null)).toBe(false);
      expect(isElement(undefined)).toBe(false);
      expect(isElement(true)).toBe(false);
      expect(isElement(false)).toBe(false);
      expect(isElement(0)).toBe(false);
      expect(isElement(1)).toBe(false);
      expect(isElement(-1)).toBe(false);
      expect(isElement(NaN)).toBe(false);
      expect(isElement(Infinity)).toBe(false);
      expect(isElement('')).toBe(false);
      expect(isElement('string')).toBe(false);
      expect(isElement('1')).toBe(false);
    });

    it('should return false for arrays', () => {
      expect(isElement([])).toBe(false);
      expect(isElement([1, 2, 3])).toBe(false);
      expect(isElement(['a', 'b', 'c'])).toBe(false);
      expect(isElement(new Array(5))).toBe(false);
    });

    it('should return false for plain objects', () => {
      expect(isElement({})).toBe(false);
      expect(isElement({ a: 1 })).toBe(false);
      expect(isElement({ nodeType: 'invalid' })).toBe(false);
      expect(isElement({ nodeType: '1' })).toBe(false);
      expect(isElement({ nodeType: true })).toBe(false);
      expect(isElement({ nodeType: null })).toBe(false);
      expect(isElement({ nodeType: undefined })).toBe(false);
    });

    it('should return false for functions', () => {
      expect(isElement(function () {})).toBe(false);
      expect(isElement(() => {})).toBe(false);
      expect(isElement(class MyClass {})).toBe(false);
      expect(isElement(async function () {})).toBe(false);
      expect(isElement(function* generator() {})).toBe(false);
    });

    it('should return false for other built-in objects', () => {
      expect(isElement(new Date())).toBe(false);
      expect(isElement(/regex/)).toBe(false);
      expect(isElement(new RegExp('pattern'))).toBe(false);
      expect(isElement(new Error('error'))).toBe(false);
      expect(isElement(new Map())).toBe(false);
      expect(isElement(new Set())).toBe(false);
      expect(isElement(new WeakMap())).toBe(false);
      expect(isElement(new WeakSet())).toBe(false);
      expect(isElement(Promise.resolve())).toBe(false);
      expect(isElement(Symbol('sym'))).toBe(false);
    });

    it('should return false for wrong nodeType values', () => {
      expect(isElement({ nodeType: 0 })).toBe(false);
      expect(isElement({ nodeType: 2 })).toBe(false);
      expect(isElement({ nodeType: 3 })).toBe(false);
      expect(isElement({ nodeType: 4 })).toBe(false);
      expect(isElement({ nodeType: 5 })).toBe(false);
      expect(isElement({ nodeType: 6 })).toBe(false);
      expect(isElement({ nodeType: 7 })).toBe(false);
      expect(isElement({ nodeType: 8 })).toBe(false);
      expect(isElement({ nodeType: 9 })).toBe(false);
      expect(isElement({ nodeType: 10 })).toBe(false);
      expect(isElement({ nodeType: 11 })).toBe(false);
      expect(isElement({ nodeType: 12 })).toBe(false);
    });

    it('should return false for document nodes', () => {
      if (typeof document !== 'undefined') {
        expect(isElement(document)).toBe(false);
        expect(isElement(document.createTextNode('text'))).toBe(false);
        expect(isElement(document.createComment('comment'))).toBe(false);
        expect(isElement(document.createDocumentFragment())).toBe(false);
      }
    });

    it('should return false for mock non-element nodes', () => {
      expect(isElement({ nodeType: 3 })).toBe(false); // TEXT_NODE
      expect(isElement({ nodeType: 8 })).toBe(false); // COMMENT_NODE
      expect(isElement({ nodeType: 9 })).toBe(false); // DOCUMENT_NODE
      expect(isElement({ nodeType: 11 })).toBe(false); // DOCUMENT_FRAGMENT_NODE
    });
  });

  describe('edge cases', () => {
    it('should handle objects with numeric string nodeType', () => {
      expect(isElement({ nodeType: '1' })).toBe(false);
      expect(isElement({ nodeType: ' 1 ' })).toBe(false);
    });

    it('should handle objects with getter for nodeType', () => {
      const objWithGetter = {
        get nodeType() {
          return 1;
        },
      };
      expect(isElement(objWithGetter)).toBe(true);

      const objWithErrorGetter = {
        get nodeType() {
          throw new Error('getter error');
        },
      };
      expect(() => isElement(objWithErrorGetter)).toThrow('getter error');
    });

    it('should handle objects with modified prototype', () => {
      const obj = Object.create(null);
      obj.nodeType = 1;
      expect(isElement(obj)).toBe(true);

      const objWithoutNodeType = Object.create(null);
      expect(isElement(objWithoutNodeType)).toBe(false);
    });

    // it('should handle proxy objects', () => {
    //   const target = { nodeType: 1 };
    //   const proxy = new Proxy(target, {});
    //   expect(isElement(proxy)).toBe(true);

    //   const proxyWithHandler = new Proxy(
    //     {},
    //     {
    //       get(target, prop) {
    //         if (prop === 'nodeType') return 1;
    //         return target[prop];
    //       },
    //     }
    //   );
    //   expect(isElement(proxyWithHandler)).toBe(true);
    // });

    it('should handle frozen and sealed objects', () => {
      const frozen = Object.freeze({ nodeType: 1 });
      expect(isElement(frozen)).toBe(true);

      const sealed = Object.seal({ nodeType: 1 });
      expect(isElement(sealed)).toBe(true);
    });
  });
});
