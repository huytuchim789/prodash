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
