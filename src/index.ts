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
export { map, default as mapDefault } from './array/map';
export { filter, default as filterDefault } from './array/filter';
export { uniq, default as uniqDefault } from './array/uniq';
export { chunk, default as chunkDefault } from './array/chunk';

// Object functions  
export { pick, default as pickDefault } from './object/pick';
export { omit, default as omitDefault } from './object/omit';

// Function utilities
export { debounce, default as debounceDefault } from './function/debounce';

// Language utilities
export { isEqual, default as isEqualDefault } from './lang/isEqual';
export { cloneDeep, default as cloneDeepDefault } from './lang/cloneDeep';

// Chain API
export { chain, default as chainDefault } from './chain/chain';

// Types
export type * from './types';

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
  
  // Chain
  chain,
};

export default prodash;