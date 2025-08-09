export { VERSION } from './lang/_setup';
/**
 * prodash - A modern, tree-shakable JavaScript utility library
 *
 * @example
 * ```typescript
 * // Named imports (recommended for tree-shaking)
 * import { map, filter, debounce } from 'prodash';
 *
 * // Individual imports (best for tree-shaking)
 * import map from 'prodash/map';
 * import filter from 'prodash/filter';
 *
 * // Chain API
 * import { chain } from 'prodash';
 * chain([1, 2, 3]).map(x => x * 2).filter(x => x > 2).value();
 * ```
 */

// Array functions
export { map, default as mapDefault } from './array/map.js';
export { filter, default as filterDefault } from './array/filter.js';
export { uniq, default as uniqDefault } from './array/uniq.js';
export { chunk, default as chunkDefault } from './array/chunk.js';

// Object functions
export { pick, default as pickDefault } from './object/pick.js';
export { omit, default as omitDefault } from './object/omit.js';

// Function utilities
export { debounce, default as debounceDefault } from './function/debounce.js';

// Language utilities
export { isEqual, default as isEqualDefault } from './lang/isEqual.js';
export { cloneDeep, default as cloneDeepDefault } from './lang/cloneDeep.js';
export { isPlainObject, default as isPlainObjectDefault } from './lang/isPlainObject.js';
export { isElement, default as isElementDefault } from './lang/isElement.js';
// Chain API
// export { chain, default as chainDefault } from './chain/chain.js';

// Types
export type * from './types/index.js';

// Import functions for the default export
import { map } from './array/map.js';
import { filter } from './array/filter.js';
import { uniq } from './array/uniq.js';
import { chunk } from './array/chunk.js';
import { pick } from './object/pick.js';
import { omit } from './object/omit.js';
import { debounce } from './function/debounce.js';
import { isEqual } from './lang/isEqual.js';
import { cloneDeep } from './lang/cloneDeep.js';
import { isPlainObject } from './lang/isPlainObject.js';
import { isElement } from './lang/isElement.js';
// import { chain } from './chain/chain.js';

// Checker Type
import isArray from './lang/isArray.js';
import isObject from './lang/isObject.js';

// Default export for convenience (not recommended for tree-shaking)
const prodash = {
  // Array
  map,
  filter,
  uniq,
  chunk,

  // Object
  pick,
  omit,

  // Function
  debounce,

  // Lang
  isEqual,
  cloneDeep,
  isPlainObject,
  isArray,
  isObject,
  isElement,
  // Chain
  // chain,
};

export default prodash;
